const { db } = require('../db');
const OCRService = require('../services/ocr');

const processFile = async (req, res) => {
  const { fileId, forceFallback } = req.body;

  if (!fileId) {
    return res.status(400).json({ error: 'Missing fileId parameter' });
  }

  try {
    const fileRecord = await db('receipt_file').where('id', fileId).first();

    if (!fileRecord) {
      return res.status(404).json({ error: 'File not found' });
    }

    if (!fileRecord.is_valid) {
      return res.status(400).json({ error: 'File is not valid. Validate first.' });
    }

    if (fileRecord.is_processed) {
      return res.status(400).json({ error: 'File already processed' });
    }

    // Extract text from the file
    const text = await OCRService.extractText(fileRecord.file_path);

    // Parse receipt data with fallback option
    let receiptData;

    if (forceFallback) {
      receiptData = {
        merchant_name: OCRService.extractMerchant(text),
        total_amount: OCRService.extractTotal(text),
        purchased_at: OCRService.extractDate(text),
        items: OCRService.extractItems(text),
      };
    } else {
      receiptData = await OCRService.parseReceiptData(text);
    }

    // Save receipt to DB
    const [receiptId] = await db('receipt').insert({
      merchant_name: receiptData.merchant_name,
      total_amount: receiptData.total_amount,
      purchased_at: receiptData.purchased_at,
      file_path: fileRecord.file_path,
    });

    // Save items if they exist
    if (receiptData.items && receiptData.items.length > 0) {
      await db('receipt_items').insert(
        receiptData.items.map((item) => ({
          receipt_id: receiptId,
          quantity: item.quantity || 1,
          description: item.description.substring(0, 255),
          price: item.price,
        }))
      );
    }

    // Mark file as processed
    await db('receipt_file').where('id', fileId).update({
      is_processed: true,
      updated_at: db.fn.now(),
    });

    // Fetch full receipt with items
    const receiptWithItems = {
      ...(await db('receipt').where('id', receiptId).first()),
      items: await db('receipt_items').where('receipt_id', receiptId),
    };

    // Send response
    res.json({
      message: 'File processed successfully',
      receipt: receiptWithItems,
      extracted_text: text.substring(0, 500) + '...',
    });
  } catch (error) {
    console.error('Processing error:', error);
    res.status(500).json({
      error: 'Processing failed',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
};

module.exports = { processFile };
