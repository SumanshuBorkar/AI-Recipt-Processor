const fs = require('fs');

const validatePDF = (filePath) => {
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return { valid: false, reason: 'File not found' };
    }

    // Check if file is a PDF by reading magic number
    const fd = fs.openSync(filePath, 'r');
    const buffer = Buffer.alloc(4);
    fs.readSync(fd, buffer, 0, 4, 0);
    fs.closeSync(fd);

    // PDF magic number: %PDF
    if (buffer.toString() !== '%PDF') {
      return { valid: false, reason: 'Invalid PDF header' };
    }

    return { valid: true };
  } catch (error) {
    return { 
      valid: false, 
      reason: `Validation error: ${error.message}` 
    };
  }
};

module.exports = { validatePDF };