const { db } = require('../db');
const { validatePDF } = require('../services/pdfValidator');

const validateFile = async (req, res) => {
  const { fileId } = req.body;
  
  if (!fileId) {
    return res.status(400).json({ error: 'Missing fileId parameter' });
  }

  try {
    const fileRecord = await db('receipt_file')
      .where('id', fileId)
      .first();

    if (!fileRecord) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Validate the PDF
    const validationResult = validatePDF(fileRecord.file_path);

    // Update database record
    await db('receipt_file')
      .where('id', fileId)
      .update({
        is_valid: validationResult.valid,
        invalid_reason: validationResult.reason || null,
        updated_at: db.fn.now()
      });

    const updatedRecord = await db('receipt_file')
      .where('id', fileId)
      .first();

    res.json({
      message: validationResult.valid ? 'File is valid PDF' : 'Invalid PDF file',
      file: updatedRecord
    });
  } catch (error) {
    console.error('Validation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { validateFile };