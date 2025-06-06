const fs = require('fs');

const validatePDF = (filePath) => {
  try {

    if (!fs.existsSync(filePath)) {
      return { valid: false, reason: 'File not found' };
    }


    const fd = fs.openSync(filePath, 'r');
    const buffer = Buffer.alloc(4);
    fs.readSync(fd, buffer, 0, 4, 0);
    fs.closeSync(fd);


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