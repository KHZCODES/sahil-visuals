const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const csrf = require('csurf');
const morgan = require('morgan');
const logger = require('./config/logger');
const backupDatabase = require('./utils/backup');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "blob:"],
      mediaSrc: ["'self'", "data:", "blob:"],
    },
  },
}));

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Session configuration
app.use(session({
  store: new SQLiteStore({
    db: 'sessions.sqlite',
    dir: './db'
  }),
  secret: process.env.SESSION_SECRET || 'your-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// CSRF protection
app.use(csrf({ cookie: true }));

// Request logging
app.use(morgan('combined', { stream: logger.stream }));

// Database setup
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    logger.error('Error connecting to database:', err.message);
  } else {
    logger.info('Connected to the SQLite database.');
    // Create projects table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      image TEXT NOT NULL UNIQUE,
      description TEXT NOT NULL
    )`, (err) => {
      if (err) {
        logger.error('Error creating projects table:', err.message);
      } else {
        logger.info('Projects table ready.');
      }
    });
  }
});

// Schedule database backups (every 24 hours)
setInterval(() => {
  backupDatabase();
}, 24 * 60 * 60 * 1000);

// Middleware
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// File name sanitization
const sanitizeFileName = (fileName) => {
  return fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
};

// Configure multer for video uploads
const videoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/videos';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, sanitizeFileName(file.originalname));
  }
});

const uploadVideo = multer({
  storage: videoStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit
  }
});

// Configure multer for portfolio image uploads
const portfolioStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/portfolio';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + sanitizeFileName(file.originalname));
  }
});

const uploadPortfolioImage = multer({
  storage: portfolioStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit for images
  }
});

// Admin credentials (in production, use environment variables)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Login validation
const loginValidation = [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('password').trim().notEmpty().withMessage('Password is required')
];

// Login route with validation and password hashing
app.post('/api/login', loginValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    // Hash the provided password
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
    const isValid = await bcrypt.compare(password, hashedPassword);

    if (username === ADMIN_USERNAME && isValid) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all videos (requires authentication)
app.get('/api/videos', authenticateToken, (req, res) => {
  const videoDir = path.join(__dirname, 'uploads/videos');
  if (!fs.existsSync(videoDir)) {
    return res.json([]);
  }

  const videos = fs.readdirSync(videoDir)
    .filter(file => file.match(/\.(mp4|webm|mov)$/))
    .map(file => ({
      name: file,
      path: `/uploads/videos/${file}`,
      size: fs.statSync(path.join(videoDir, file)).size,
      lastModified: fs.statSync(path.join(videoDir, file)).mtime
    }));

  res.json(videos);
});

// Upload video (requires authentication)
app.post('/api/videos', authenticateToken, uploadVideo.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No video file uploaded' });
  }
  res.json({
    message: 'Video uploaded successfully',
    file: {
      name: req.file.originalname,
      path: `/uploads/videos/${req.file.originalname}`,
      size: req.file.size
    }
  });
});

// Delete video (requires authentication)
app.delete('/api/videos/:filename', authenticateToken, (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, 'uploads/videos', filename);

  if (!fs.existsSync(filepath)) {
    return res.status(404).json({ message: 'Video not found' });
  }

  fs.unlink(filepath, (err) => {
    if (err) {
      console.error('Error deleting video file:', err);
      return res.status(500).json({ message: 'Failed to delete video file' });
    }
    res.json({ message: 'Video deleted successfully' });
  });
});

// --- Portfolio API Endpoints (Requires authentication) ---

// Get all portfolio projects
app.get('/api/portfolio', authenticateToken, (req, res) => {
  db.all("SELECT * FROM projects", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      projects: rows
    });
  });
});

// Add new portfolio project
app.post('/api/portfolio', authenticateToken, uploadPortfolioImage.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image file uploaded' });
  }

  const { title, category, description } = req.body;
  const imagePath = `/uploads/portfolio/${req.file.filename}`;

  if (!title || !category || !description) {
    // Clean up uploaded file if validation fails
    fs.unlink(req.file.path, (unlinkErr) => {
      if (unlinkErr) console.error('Error cleaning up file:', unlinkErr);
    });
    return res.status(400).json({ message: 'Missing required fields: title, category, description' });
  }

  db.run(`INSERT INTO projects (title, category, image, description) VALUES (?, ?, ?, ?)`, [
    title,
    category,
    imagePath,
    description,
  ], function (err) {
    if (err) {
      console.error('Error inserting project into database:', err.message);
      // Clean up uploaded file if DB insertion fails
      fs.unlink(req.file.path, (unlinkErr) => {
        if (unlinkErr) console.error('Error cleaning up file after DB error:', unlinkErr);
      });
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({
      message: 'Project added successfully',
      project: { id: this.lastID, title, category, image: imagePath, description },
    });
  });
});

// Delete portfolio project
app.delete('/api/portfolio/:id', authenticateToken, (req, res) => {
  const projectId = req.params.id;

  // First, get the image path from the database
  db.get("SELECT image FROM projects WHERE id = ?", [projectId], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const imagePath = path.join(__dirname, row.image);

    // Delete the project from the database
    db.run("DELETE FROM projects WHERE id = ?", [projectId], function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Project not found in DB' });
      }

      // Then, delete the associated image file
      fs.unlink(imagePath, (unlinkErr) => {
        if (unlinkErr) console.error('Error deleting portfolio image file:', unlinkErr);
        // We respond success even if file deletion fails, as the DB record is gone.
        res.json({ message: 'Project deleted successfully' });
      });
    });
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Error:', err);
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({ message: 'Invalid CSRF token' });
  }
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Performing graceful shutdown...');
  backupDatabase();
  db.close((err) => {
    if (err) {
      logger.error('Error closing database connection:', err.message);
    }
    logger.info('Database connection closed.');
    process.exit(0);
  });
}); 