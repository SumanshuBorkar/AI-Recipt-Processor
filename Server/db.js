const knex = require('knex');
const path = require('path');

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'receipts.db')
  },
  useNullAsDefault: true
});


const initializeDB = async () => {
  try {
    // Create receipt_file table
    await db.schema.hasTable('receipt_file').then(async (exists) => {
      if (!exists) {
        await db.schema.createTable('receipt_file', (table) => {
          table.increments('id').primary();
          table.string('file_name').notNullable();
          table.string('file_path').notNullable();
          table.boolean('is_valid').defaultTo(false);
          table.string('invalid_reason');
          table.boolean('is_processed').defaultTo(false);
          table.timestamp('created_at').defaultTo(db.fn.now());
          table.timestamp('updated_at').defaultTo(db.fn.now());
        });
      }
    });

    await db.schema.hasTable('receipt').then(async (exists) => {
      if (!exists) {
        await db.schema.createTable('receipt', (table) => {
          table.increments('id').primary();
          table.datetime('purchased_at');
          table.string('merchant_name');
          table.decimal('total_amount', 10, 2);
          table.string('file_path').notNullable();
          table.timestamp('created_at').defaultTo(db.fn.now());
          table.timestamp('updated_at').defaultTo(db.fn.now());
        });
      }
    });


    await db.schema.hasTable('receipt_items').then(async (exists) => {
      if (!exists) {
        await db.schema.createTable('receipt_items', (table) => {
          table.increments('id').primary();
          table.integer('receipt_id').unsigned().references('id').inTable('receipt');
          table.integer('quantity').defaultTo(1);
          table.string('description').notNullable();
          table.decimal('price', 10, 2).notNullable();
          table.timestamp('created_at').defaultTo(db.fn.now());
        });
      }
    });

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
  }
};

module.exports = { db, initializeDB };