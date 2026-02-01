const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
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
  queueLimit: 0,
  multipleStatements: true // Critical for complex quiz saving
});

// --- RESOURCE & UPLOAD ROUTES ---

app.get('/api/resources', (req, res) => {
  db.query("SELECT * FROM resources ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Branched upload route to handle quiz redirection
app.post('/api/resources/upload-with-options', upload.single('file'), (req, res) => {
  const { title, category, uploadType } = req.body;
  
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const fileUrl = `http://localhost:3000/uploads/${req.file.filename}`;
  const hasQuiz = uploadType === 'quiz' ? 1 : 0;

  const sql = "INSERT INTO resources (title, content_url, category, has_quiz, resource_type) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [title, fileUrl, category || 'General', hasQuiz, 'document'], (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ 
      message: "Resource saved", 
      resourceId: result.insertId, 
      redirectToQuiz: hasQuiz === 1 
    });
  });
});

// --- QUIZ & GAME MANAGEMENT ROUTES ---

// Saves the full gamified quiz structure
app.post('/api/quiz/save-gamified', (req, res) => {
  const { resourceId, gameType, scenarios } = req.body;
  
  // 1. Create the game entry linked to the resource
  const gameSql = "INSERT INTO vawc_games (resource_id, game_type) VALUES (?, ?)";
  db.query(gameSql, [resourceId, gameType], (err, gameResult) => {
    if (err) return res.status(500).json(err);
    const gameId = gameResult.insertId;

    // 2. Iterate and insert each scenario and its choices
    scenarios.forEach(s => {
      const scenarioSql = "INSERT INTO game_scenarios (game_id, context_text) VALUES (?, ?)";
      db.query(scenarioSql, [gameId, s.context], (err, sceneResult) => {
        if (err) return console.error("Scenario Insert Error:", err);
        const sceneId = sceneResult.insertId;

        s.choices.forEach(c => {
          const choiceSql = "INSERT INTO scenario_choices (scenario_id, choice_text, behavior_label) VALUES (?, ?, ?)";
          db.query(choiceSql, [sceneId, c.text, c.behavior]);
        });
      });
    });
    res.json({ message: "Game successfully synced to learning path!", gameId });
  });
});

// Logs player performance and AI behavioral logs
app.post('/api/quiz/log-gameplay', (req, res) => {
  const { userId, gameId, points, behaviorLog } = req.body;
  const sql = "INSERT INTO user_game_results (user_id, game_id, points_earned, behavior_log) VALUES (?, ?, ?, ?)";
  db.query(sql, [userId || 1, gameId, points, JSON.stringify(behaviorLog)], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Points and behavioral data logged" });
  });
});

// Fetches a specific quiz for the game interface
app.get('/api/quiz/fetch/:resourceId', (req, res) => {
  const sql = `
    SELECT g.id as gameId, g.game_type, s.id as scenarioId, s.context_text, 
           c.id as choiceId, c.choice_text, c.behavior_label
    FROM vawc_games g
    JOIN game_scenarios s ON g.id = s.game_id
    JOIN scenario_choices c ON s.id = c.scenario_id
    WHERE g.resource_id = ?`;

  db.query(sql, [req.params.resourceId], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ error: "Game not found" });

    // Format results into a nested structure for the frontend
    const formatted = {
      gameId: results[0].gameId,
      game_type: results[0].game_type,
      scenarios: [...new Set(results.map(r => r.scenarioId))].map(sId => {
        const row = results.find(r => r.scenarioId === sId);
        return {
          context: row.context_text,
          choices: results.filter(r => r.scenarioId === sId).map(c => ({
            text: c.choice_text,
            behavior: c.behavior_label
          }))
        };
      })
    };
    res.json(formatted);
  });
});

// --- LEARNER PROGRESS ROUTES ---

app.get('/api/learner/path/:userId', (req, res) => {
  const sql = `
    SELECT 
      m.id, 
      m.title, 
      m.category, 
      p.status, 
      r.has_quiz, 
      r.id as resourceId
    FROM modules m 
    LEFT JOIN user_progress p ON m.id = p.module_id AND p.user_id = ? 
    LEFT JOIN resources r ON m.title = r.title
    ORDER BY m.id ASC`;

  db.query(sql, [req.params.userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Backend Live on port ${PORT}`));