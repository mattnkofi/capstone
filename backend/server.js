const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer'); // Added for verification
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

// Email Transporter for Verification
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.get('/api/resources', async (req, res) => {
  try {
    const [resources] = await db.query("SELECT * FROM resources ORDER BY id DESC");
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch resources" });
  }
});

// --- AUTH ROUTES ---

// 1. Register with Email Verification
app.post('/api/auth/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length > 0) return res.status(400).json({ error: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    // Insert user as unverified (0)
    await db.query(
      "INSERT INTO users (username, email, password, role, is_verified) VALUES (?, ?, ?, ?, 0)",
      [username, email, hashedPassword, role || 'learner']
    );

    const url = `http://localhost:3000/api/auth/verify/${verificationToken}`;
    await transporter.sendMail({
      from: `"ProtectEd Admin" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your Account",
      html: `<h3>Welcome to ProtectEd!</h3><p>Click <a href="${url}">here</a> to verify your email.</p>`
    });

    res.json({ message: "Registration successful! Verification email sent." });
  } catch (err) {
    res.status(500).json({ error: "Failed to register" });
  }
});

// 2. Verification Handler
app.get('/api/auth/verify/:token', async (req, res) => {
  try {
    const { email } = jwt.verify(req.params.token, process.env.JWT_SECRET);
    await db.query("UPDATE users SET is_verified = 1 WHERE email = ?", [email]);
    res.send("<h1>Email Verified!</h1><p>You can now log in.</p>");
  } catch (err) {
    res.status(400).send("Invalid or expired token.");
  }
});

// 3. Login (Updated to check is_verified)
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0) return res.status(404).json({ error: "User not found" });
    
    const user = users[0];
    if (!user.is_verified) return res.status(403).json({ error: "Please verify your email first." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });
    
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

app.listen(3000, () => console.log('🚀 ProtectEd Server Active on port 3000'));