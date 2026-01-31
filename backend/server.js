const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Database Connection Configuration
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '', // Replace with your MySQL password
  database: 'protected_db'
});

// --- API ROUTES ---

// 1. Log Stress Level (Addresses Panel Feedback)
app.post('/api/wellness/stress', (req, res) => {
  const { userId, value, tip } = req.body;
  const sql = "INSERT INTO stress_logs (user_id, stress_value, regulation_tip_shown) VALUES (?, ?, ?)";
  db.query(sql, [userId, value, tip], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Stress logged successfully for AI tracking" });
  });
});

// 2. Fetch Learning Path for Gamified Map
app.get('/api/learner/path/:userId', (req, res) => {
  const sql = `
    SELECT m.id, m.title, m.category, p.status, p.score
    FROM modules m
    LEFT JOIN user_progress p ON m.id = p.module_id AND p.user_id = ?
    ORDER BY m.id ASC`;
  db.query(sql, [req.params.userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// 3. Get AI Risk Alerts (Facilitator View)
app.get('/api/facilitator/alerts', (req, res) => {
  const sql = `
    SELECT a.*, u.username 
    FROM risk_alerts a 
    JOIN users u ON a.user_id = u.id 
    WHERE a.facilitator_reviewed = FALSE 
    ORDER BY a.detected_at DESC`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 ProtectEd Backend running on port ${PORT}`));