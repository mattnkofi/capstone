const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Database connection pool using your .env settings
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'protected_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// --- LEARNER ROUTES ---

// Fetch real learning path by joining modules and user_progress
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

// Log stress data directly to the stress_logs table
app.post('/api/wellness/stress', (req, res) => {
  const { userId, value, tip } = req.body;
  const sql = "INSERT INTO stress_logs (user_id, stress_value, regulation_tip_shown) VALUES (?, ?, ?)";
  db.query(sql, [userId, value, tip], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Stress logged successfully" });
  });
});

// Fetch resources from the resources table
app.get('/api/resources', (req, res) => {
  db.query("SELECT * FROM resources", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Backend connected to ${process.env.DB_NAME} on port ${PORT}`));