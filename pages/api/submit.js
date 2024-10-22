import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Enable verbose mode for debugging
sqlite3.verbose();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { entity, address } = req.body;

    try {
      // Open database connection using sqlite's open method
      const db = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database,
      });

      // Create tables if they don't exist
      await db.exec(`
        CREATE TABLE IF NOT EXISTS entity (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT UNIQUE NOT NULL,
          email TEXT NOT NULL,
          phone TEXT NOT NULL,
          created_at INTEGER DEFAULT (strftime('%s','now'))
        );

        CREATE TABLE IF NOT EXISTS addresses (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          attn TEXT,
          address_line1 TEXT NOT NULL,
          address_line2 TEXT,
          country TEXT NOT NULL,
          zip5 TEXT NOT NULL,
          zip4 TEXT,
          city_town TEXT NOT NULL,
          state TEXT NOT NULL,
          entity_id INTEGER NOT NULL,
          created_at INTEGER DEFAULT (strftime('%s','now')),

          FOREIGN KEY (entity_id) REFERENCES entity(id)
        );
      `);

      // Insert into entity table
      const entityResult = await db.run(
        `INSERT INTO entity (name, email, phone) VALUES (?, ?, ?)`,
        [entity.name, entity.email, entity.phone]
      );

      const entityId = entityResult.lastID;
      console.log('Inserted entityId:', entityId);

      // Insert into addresses table with entity_id
      await db.run(
        `INSERT INTO addresses (
          attn,
          address_line1,
          address_line2,
          country,
          zip5,
          zip4,
          city_town,
          state,
          entity_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          address.attn || null,
          address.address_line1,
          address.address_line2 || null,
          address.country,
          address.zip5,
          address.zip4 || null,
          address.city_town,
          address.state,
          entityId,
        ]
      );

      // Close the database
      await db.close();

      res.status(200).json({ message: 'Success' });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Database operation failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
