const { db } = require('../db');

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileData = {
      file_name: req.file.originalname,
      file_path: req.file.path,
      is_valid: false,
      is_processed: false
    };

    // Insert into database
    const [fileId] = await db('receipt_file').insert(fileData);
    
    const createdFile = await db('receipt_file')
      .where('id', fileId)
      .first();

    res.status(201).json({
      message: 'File uploaded successfully',
      file: createdFile
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getFiles = async (req, res) => {
  try {
    const files = await db('receipt_file').select('*');
    res.json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = { 
  uploadFile,
  getFiles
};