require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { initializeDB } = require('./db');
const routes = require('./routes');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Create uploads directory if missing
const fs = require('fs');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log(`Created upload directory: ${uploadsDir}`);
}

// 2. Middleware setup (ORDER IS CRITICAL)
app.use(cors()); // Enable CORS first
app.use(express.json()); // Replace bodyParser
app.use(express.urlencoded({ extended: true })); // Replace bodyParser
app.use('/uploads', express.static(uploadsDir)); // Serve static files

// 3. Request logger for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// 4. API Routes
app.use('/api', routes);

// 5. Root route handler
app.get('/', (req, res) => {
  res.send('Receipt Processor API is running');
});

// 6. Error handlers (must come after routes)
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  } else if (err.message === 'Only PDF files are allowed') {
    return res.status(403).json({ error: err.message });
  }
  next(err);
});

// In server.js
app.use((err, req, res, next) => {
  console.error('Global Error:', err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// 7. Initialize and start server
initializeDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Upload directory: ${uploadsDir}`);
      console.log(`Try: curl http://localhost:${PORT}/api/upload`);
    });
  })
  .catch(err => {
    console.error('Server failed to start:', err);
    process.exit(1);
  });

