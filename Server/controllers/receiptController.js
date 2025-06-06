const { db } = require('../db');

const getAllReceipts = async (req, res) => {
  try {
    // Basic pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const receipts = await db('receipt')
      .select('*')
      .limit(limit)
      .offset(offset)
      .orderBy('purchased_at', 'desc');

    // Get items for each receipt
    for (const receipt of receipts) {
      receipt.items = await db('receipt_items')
        .where('receipt_id', receipt.id);
    }

    const total = await db('receipt').count('id as count').first();

    res.json({
      page,
      limit,
      total: total.count,
      receipts
    });


    
  } catch (error) {
    console.error('Error retrieving receipts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getReceiptById = async (req, res) => {
  const { id } = req.params;
  
  if (!id) {
    return res.status(400).json({ error: 'Missing receipt ID' });
  }

  try {
    const receipt = await db('receipt')
      .where('id', id)
      .first();

    if (!receipt) {
      return res.status(404).json({ error: 'Receipt not found' });
    }

    // Get items
    receipt.items = await db('receipt_items')
      .where('receipt_id', id);


    // Get associated file record
    const fileRecord = await db('receipt_file')
      .where('file_path', receipt.file_path)
      .first();

    res.json({
      receipt,
      file_details: fileRecord
    });
  } catch (error) {
    console.error('Error retrieving receipt:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllReceipts,
  getReceiptById
};