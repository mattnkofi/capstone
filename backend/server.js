const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: 'protected_db'
});

// Adaptive Feature: Get system status based on recent stress
app.get('/api/adaptive/status/:userId', (req, res) => {
  const sql = "SELECT stress_value FROM stress_logs WHERE user_id = ? ORDER BY detected_at DESC LIMIT 3";
  db.query(sql, [req.params.userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    const avg = results.length ? results.reduce((a, b) => a + b.stress_value, 0) / results.length : 0;
    res.json({ adaptiveMode: avg > 70 });
  });
});

app.post('/api/wellness/stress', (req, res) => {
  const { userId, value, tip } = req.body;
  const isAdaptive = value > 70;
  const sql = "INSERT INTO stress_logs (user_id, stress_value, regulation_tip_shown, adaptive_mode_triggered) VALUES (?, ?, ?, ?)";
  db.query(sql, [userId, value, tip, isAdaptive], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Sync successful", adaptiveActive: isAdaptive });
  });
});

app.get('/api/learner/path/:userId', (req, res) => {
  const sql = "SELECT * FROM modules ORDER BY id ASC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/api/adaptive/toggle', (req, res) => {
  const { userId, enabled } = req.body;
  // This updates the user's focus preference in MySQL
  const sql = "UPDATE user_analytics SET current_difficulty_level = ? WHERE user_id = ?";
  const mode = enabled ? 'Focus' : 'Standard';
  db.query(sql, [mode, userId], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, mode: mode });
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));