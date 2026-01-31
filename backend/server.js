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

// --- RESOURCE MANAGEMENT (CRUD) ---
app.get('/api/resources', (req, res) => {
  db.query("SELECT * FROM resources", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/api/admin/resources', (req, res) => {
  const { title, category, resource_type, content_url, target_age_group } = req.body;
  const sql = "INSERT INTO resources (title, category, resource_type, content_url, target_age_group) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [title, category, resource_type, content_url, target_age_group], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Resource added", id: result.insertId });
  });
});

app.delete('/api/admin/resources/:id', (req, res) => {
  db.query("DELETE FROM resources WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Resource deleted" });
  });
});

// --- QUIZ MANAGEMENT (CRUD) ---
app.get('/api/learner/quiz/:moduleId', (req, res) => {
  db.query("SELECT * FROM quizzes WHERE module_id = ?", [req.params.moduleId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/api/admin/quizzes', (req, res) => {
  const { module_id, question, option_a, option_b, option_c, option_d, correct_answer } = req.body;
  const sql = "INSERT INTO quizzes (module_id, question, option_a, option_b, option_c, option_d, correct_answer) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [module_id, question, option_a, option_b, option_c, option_d, correct_answer], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Question added", id: result.insertId });
  });
});

app.put('/api/admin/quizzes/:id', (req, res) => {
  const { question, option_a, option_b, option_c, option_d, correct_answer } = req.body;
  const sql = "UPDATE quizzes SET question=?, option_a=?, option_b=?, option_c=?, option_d=?, correct_answer=? WHERE id=?";
  db.query(sql, [question, option_a, option_b, option_c, option_d, correct_answer, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Question updated" });
  });
});

app.delete('/api/admin/quizzes/:id', (req, res) => {
  db.query("DELETE FROM quizzes WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Question deleted" });
  });
});

// --- EXISTING ROUTES (Stress, Path, Alerts) ---
app.post('/api/wellness/stress', (req, res) => {
  const { userId, value, tip } = req.body;
  db.query("INSERT INTO stress_logs (user_id, stress_value, regulation_tip_shown) VALUES (?, ?, ?)", [userId, value, tip], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Stress logged" });
  });
});

app.get('/api/learner/path/:userId', (req, res) => {
  const sql = "SELECT m.*, p.status FROM modules m LEFT JOIN user_progress p ON m.id = p.module_id AND p.user_id = ? ORDER BY m.id ASC";
  db.query(sql, [req.params.userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));