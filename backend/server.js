const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'protected_db',
  waitForConnections: true,
  connectionLimit: 10
}).promise();

// --- UPLOAD CONFIGURATION ---
const uploadDir = path.join(__dirname, 'uploads/resources');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// --- AUTH MIDDLEWARE ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const checkRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) return res.status(403).json({ error: "Access Denied" });
  next();
};

// --- RESOURCE ROUTES ---
app.get('/api/resources', async (req, res) => {
  try {
    const [resources] = await db.query("SELECT * FROM resources ORDER BY id DESC");
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch resources" });
  }
});

app.post('/api/resources/upload-with-options', authenticateToken, checkRole(['admin', 'facilitator']), upload.single('file'), async (req, res) => {
  try {
    const { title, category, resource_type, has_quiz, quiz_id } = req.body;
    const content_url = req.file ? `http://localhost:3000/uploads/resources/${req.file.filename}` : null;

    // Convert strings from FormData to MySQL compatible types
    const quizBool = (has_quiz === 'true' || has_quiz === true) ? 1 : 0;
    const finalQuizId = (quiz_id && quiz_id !== 'null') ? parseInt(quiz_id) : null;

    const sql = "INSERT INTO resources (title, category, resource_type, content_url, has_quiz, quiz_id) VALUES (?, ?, ?, ?, ?, ?)";
    await db.query(sql, [title, category, resource_type, content_url, quizBool, finalQuizId]);
    
    res.json({ message: "Resource uploaded successfully!" });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: "Check if columns content_url, has_quiz, and quiz_id exist in your DB." });
  }
});

// --- AUTH ROUTES ---
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  if (users.length === 0) return res.status(404).json({ error: "User not found" });
  const user = users[0];
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
  res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
});

app.listen(3000, () => console.log('🚀 ProtectEd Server Active on port 3000'));