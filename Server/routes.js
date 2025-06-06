const express = require('express');
const router = express.Router();
const upload = require('./services/fileStorage');
const { uploadFile, getFiles } = require('./controllers/fileController'); 
const { validateFile } = require('./controllers/validationController');
const { processFile } = require('./controllers/processingController');
const cohereLimiter = require('./services/cohereRateLimiter');
const { 
  getAllReceipts, 
  getReceiptById 
} = require('./controllers/receiptController');

// POST /upload - Upload receipt
router.post('/upload', (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    uploadFile(req, res);
  });
});

router.get('/files', getFiles);  

// POST /validate - Validate PDF
router.post('/validate', validateFile);

// POST /process - Process receipt
router.post('/process', cohereLimiter, processFile);

// GET /receipts - List receipts
router.get('/receipts', getAllReceipts);

// GET /receipts/:id - Get receipt by ID
router.get('/receipts/:id', getReceiptById);

module.exports = router;