const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directory exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Use .promise() to allow async/await syntax
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'protected_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true 
}).promise(); // Critical: Using promise wrapper

// --- RESOURCE & UPLOAD ROUTES ---

app.get('/api/resources', async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM resources ORDER BY id DESC");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/resources/upload-with-options', upload.single('file'), async (req, res) => {
  const { title, category, uploadType } = req.body;
  
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const fileUrl = `http://localhost:3000/uploads/${req.file.filename}`;
  const hasQuiz = uploadType === 'quiz' ? 1 : 0;

  try {
    const sql = "INSERT INTO resources (title, content_url, category, has_quiz, resource_type) VALUES (?, ?, ?, ?, ?)";
    const [result] = await db.query(sql, [title, fileUrl, category || 'General', hasQuiz, 'document']);
    
    res.json({ 
      message: "Resource saved", 
      resourceId: result.insertId, 
      redirectToQuiz: hasQuiz === 1 
    });
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// --- QUIZ & GAME MANAGEMENT ROUTES ---

// FIXED: Using async/await to ensure all scenarios/choices save before responding
app.post('/api/quiz/save-gamified', async (req, res) => {
  const { resourceId, gameType, scenarios } = req.body;
  
  try {
    // 1. Create the game entry
    const gameSql = "INSERT INTO vawc_games (resource_id, game_type) VALUES (?, ?)";
    const [gameResult] = await db.query(gameSql, [resourceId, gameType]);
    const gameId = gameResult.insertId;

    // 2. Insert Scenarios and Choices sequentially or via Promise.all
    for (const s of scenarios) {
      const scenarioSql = "INSERT INTO game_scenarios (game_id, context_text) VALUES (?, ?)";
      const [sceneResult] = await db.query(scenarioSql, [gameId, s.context]);
      const sceneId = sceneResult.insertId;

      // Insert all choices for this specific scenario
      const choicePromises = s.choices.map(c => {
        const choiceSql = "INSERT INTO scenario_choices (scenario_id, choice_text, behavior_label) VALUES (?, ?, ?)";
        return db.query(choiceSql, [sceneId, c.text, c.behavior]);
      });
      
      await Promise.all(choicePromises);
    }

    res.json({ message: "Game successfully synced to learning path!", gameId });
  } catch (err) {
    console.error("Quiz Save Error:", err);
    res.status(500).json({ error: "Failed to save quiz structure" });
  }
});

app.post('/api/quiz/log-gameplay', async (req, res) => {
  const { userId, gameId, points, behaviorLog } = req.body;
  try {
    const sql = "INSERT INTO user_game_results (user_id, game_id, points_earned, behavior_log) VALUES (?, ?, ?, ?)";
    await db.query(sql, [userId || 1, gameId, points, JSON.stringify(behaviorLog)]);
    res.json({ message: "Points and behavioral data logged" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/quiz/fetch/:resourceId', async (req, res) => {
  const sql = `
    SELECT g.id as gameId, g.game_type, s.id as scenarioId, s.context_text, 
           c.id as choiceId, c.choice_text, c.behavior_label
    FROM vawc_games g
    JOIN game_scenarios s ON g.id = s.game_id
    JOIN scenario_choices c ON s.id = c.scenario_id
    WHERE g.resource_id = ?`;

  try {
    const [results] = await db.query(sql, [req.params.resourceId]);
    
    if (results.length === 0) return res.status(404).json({ error: "Game not found" });

    // Format results into nested structure
    const scenarioMap = new Map();

    results.forEach(r => {
      if (!scenarioMap.has(r.scenarioId)) {
        scenarioMap.set(r.scenarioId, {
          context: r.context_text,
          choices: []
        });
      }
      scenarioMap.get(r.scenarioId).choices.push({
        text: r.choice_text,
        behavior: r.behavior_label
      });
    });

    const formatted = {
      gameId: results[0].gameId,
      game_type: results[0].game_type,
      scenarios: Array.from(scenarioMap.values())
    };
    
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- LEARNER PROGRESS ROUTES ---

app.get('/api/learner/path/:userId', async (req, res) => {
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

  try {
    const [results] = await db.query(sql, [req.params.userId]);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Backend Live on port ${PORT}`));