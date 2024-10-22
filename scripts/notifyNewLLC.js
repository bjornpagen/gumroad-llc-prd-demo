// scripts/notifyNewLLC.js

// This script checks for new LLC registrations since the last run and sends an email via Postmark.

import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import fetch from 'node-fetch';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, '../database.sqlite');
const LAST_PROCESSED_ID_FILE = path.join(__dirname, '../lastProcessedId.txt');
const POSTMARK_API_TOKEN = '98f3c849-eb10-4fd2-b6cc-362cdf7636ae';
const SENDER_EMAIL = 'contact@bjornpagen.com';
const RECIPIENT_EMAIL = 'contact@bjornpagen.com';

async function main() {
  // Open database connection
  const db = await open({
    filename: DB_PATH,
    driver: sqlite3.Database
  });

  try {
    // Read the last processed entity ID
    let lastProcessedId = 0;
    try {
      const content = await fs.readFile(LAST_PROCESSED_ID_FILE, 'utf8');
      lastProcessedId = Number(content);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
      // File doesn't exist, use default value of 0
    }

    // Query for new entities
    const newEntities = await db.all(
      'SELECT * FROM entity WHERE id > ? ORDER BY id ASC',
      lastProcessedId
    );

    if (newEntities.length > 0) {
      // Send email notification with new entities
      await sendEmailNotification(newEntities, db);

      // Update last processed ID
      const newLastProcessedId = newEntities[newEntities.length - 1].id;
      await fs.writeFile(LAST_PROCESSED_ID_FILE, newLastProcessedId.toString(), 'utf8');
    } else {
      console.log('No new LLC registrations found.');
    }
  } catch (error) {
    console.error('Error polling database:', error);
  } finally {
    await db.close();
  }
}

async function sendEmailNotification(entities, db) {
  let emailBody = '';

  for (const entity of entities) {
    // Get the associated address
    const address = await db.get(
      'SELECT * FROM addresses WHERE entity_id = ?',
      entity.id
    );

    // Format entity information
    emailBody += `Company Name: ${entity.name}\n`;
    emailBody += `State of LLC: ${entity.state || ''}\n`;
    emailBody += `Email: ${entity.email}\n`;
    emailBody += `Phone: ${entity.phone}\n`;
    emailBody += `Created At: ${new Date(entity.created_at * 1000).toLocaleString()}\n`;

    // Format address information
    if (address) {
      emailBody += `Attention: ${address.attn || ''}\n`;
      emailBody += `Address Line 1: ${address.address_line1}\n`;
      emailBody += `Address Line 2: ${address.address_line2 || ''}\n`;
      emailBody += `City/Town: ${address.city_town}\n`;
      emailBody += `State: ${address.state}\n`;
      emailBody += `ZIP Code: ${address.zip5}${address.zip4 ? '-' + address.zip4 : ''}\n`;
      emailBody += `Country: ${address.country}\n`;
    } else {
      emailBody += 'Address information not available.\n';
    }

    emailBody += '\n-----------------------------------\n\n';
  }

  const message = {
    From: SENDER_EMAIL,
    To: RECIPIENT_EMAIL,
    Subject: 'New LLC Registrations',
    TextBody: emailBody,
  };

  const response = await fetch('https://api.postmarkapp.com/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Postmark-Server-Token': POSTMARK_API_TOKEN,
    },
    body: JSON.stringify(message),
  });

  if (!response.ok) {
    console.error('Failed to send email:', await response.text());
  } else {
    console.log('Email sent successfully.');
  }
}

main().catch(console.error);
