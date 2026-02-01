const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer'); // New: File upload middleware
const path = require('path');     // New: Path utility
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this folder exists in your backend root
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'protected_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// --- RESOURCE & UPLOAD ROUTES ---

// Updated: Fetch resources including their local file paths
app.get('/api/resources', (req, res) => {
  db.query("SELECT * FROM resources ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/api/resources/upload', upload.single('file'), (req, res) => {
  const { title, resource_type, target_age_group, category } = req.body;
  const fileUrl = `http://localhost:3000/uploads/${req.file.filename}`;
  
  const sql = "INSERT INTO resources (title, resource_type, target_age_group, content_url, category) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [title, resource_type, target_age_group, fileUrl, category || 'General'], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "File uploaded successfully", id: result.insertId });
  });
});

// Existing Learner Routes...
app.get('/api/learner/path/:userId', (req, res) => {
  const sql = `
    SELECT m.id, m.title, m.category, m.difficulty_level, p.status 
    FROM modules m 
    LEFT JOIN user_progress p ON m.id = p.module_id AND p.user_id = ? 
    ORDER BY m.id ASC`;
  db.query(sql, [req.params.userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Backend connected to ${process.env.DB_NAME} on port ${PORT}`));