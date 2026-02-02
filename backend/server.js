const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
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

// --- ROLE MIDDLEWARE ---
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

const checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access Denied: Insufficient Permissions" });
    }
    next();
  };
};

// --- AUTH ROUTES ---
app.post('/api/auth/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const token = jwt.sign({ email }, process.env.JWT_SECRET);
  try {
    const sql = "INSERT INTO users (username, email, password, role, is_verified) VALUES (?, ?, ?, ?, 0)";
    await db.query(sql, [username, email, hashedPassword, role || 'learner']);
    res.json({ message: "Registered! Check email for verification." });
  } catch (err) { res.status(500).json({ error: "Registration failed." }); }
});

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

// --- ROLE-BASED ACCESS ENDPOINTS ---

// 1. LEARNER ACCESS (5+ Features)
app.get('/api/learner/dashboard', authenticateToken, checkRole(['learner']), (req, res) => res.json({ msg: "Learner Dashboard Access" }));
app.get('/api/learner/modules', authenticateToken, checkRole(['learner']), (req, res) => res.json({ msg: "Accessing Modules" }));
app.get('/api/learner/quizzes', authenticateToken, checkRole(['learner']), (req, res) => res.json({ msg: "Taking Quizzes" }));
app.get('/api/learner/rewards', authenticateToken, checkRole(['learner']), (req, res) => res.json({ msg: "Viewing Rewards" }));
app.get('/api/learner/stress-meter', authenticateToken, checkRole(['learner']), (req, res) => res.json({ msg: "Accessing Stress Meter" }));

// 2. FACILITATOR ACCESS (5+ Features)
app.get('/api/facilitator/analytics', authenticateToken, checkRole(['facilitator']), (req, res) => res.json({ msg: "Viewing Class Analytics" }));
app.get('/api/facilitator/students', authenticateToken, checkRole(['facilitator']), (req, res) => res.json({ msg: "Managing Student List" }));
app.post('/api/facilitator/assign', authenticateToken, checkRole(['facilitator']), (req, res) => res.json({ msg: "Assigning Modules" }));
app.get('/api/facilitator/reports', authenticateToken, checkRole(['facilitator']), (req, res) => res.json({ msg: "Generating Progress Reports" }));
app.post('/api/facilitator/feedback', authenticateToken, checkRole(['facilitator']), (req, res) => res.json({ msg: "Sending Feedback to Learners" }));

// 3. ADMIN ACCESS (5+ Features)
app.get('/api/admin/users', authenticateToken, checkRole(['admin']), (req, res) => res.json({ msg: "Managing System Users" }));
app.post('/api/admin/content', authenticateToken, checkRole(['admin']), (req, res) => res.json({ msg: "Adding System Content" }));
app.get('/api/admin/alerts', authenticateToken, checkRole(['admin']), (req, res) => res.json({ msg: "Reviewing AI Alerts" }));
app.delete('/api/admin/remove', authenticateToken, checkRole(['admin']), (req, res) => res.json({ msg: "Deleting Records" }));
app.put('/api/admin/settings', authenticateToken, checkRole(['admin']), (req, res) => res.json({ msg: "Updating System Settings" }));

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Role-Based Server on port ${PORT}`));