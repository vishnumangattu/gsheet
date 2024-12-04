import express from 'express';
import { google } from 'googleapis';
import bodyParser from 'body-parser';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';

// Fix for __dirname in ES Modules
const __filename = fileURLToPath();
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Load the service account key
const path = require('path');
const serviceAccountKey = require(path.join(__dirname, './causal-axle-443614-g3-6b7a7995af96.json'));
const SPREADSHEET_ID = "1qYyJ78kdYGBpqbYguUJTluNNEX2A2CybzhMBt82gZaM"; // Your Google Sheet ID

// Initialize Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials: serviceAccountKey,
  scopes: ['https://docs.google.com/spreadsheets'],
});
const sheets = google.sheets({ version: 'v4', auth });

// API endpoint to append data to Google Sheets
app.post('/add-to-sheet', async (req, res) => {
  const { field1, field2 } = req.body;
  console.log(req.body);
  console.log(SPREADSHEET_ID);
  

  if (!field1 || !field2) {
    return res.status(400).send('Both field1 and field2 are required.');
  }

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:B', // Adjust range as per your sheet's structure
      valueInputOption: 'RAW',
      requestBody: {
        values: [[field1, field2]],
      },
    });
    res.status(200).send('Data added successfully');
  } catch (error) {
    console.error('Error adding data to Google Sheets:', error.message);
    res.status(500).send('Failed to add data to Google Sheets');
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
