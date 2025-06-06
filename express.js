const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const AFTERSHIP_API_KEY = process.env.AFTERSHIP_API_KEY;

app.post('/track', async (req, res) => {
  const { tracking_number } = req.body;

  try {
    const response = await axios.get(`https://api.aftership.com/v4/trackings/${tracking_number}`, {
      headers: {
        'aftership-api-key': AFTERSHIP_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.response?.data || error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
app.use(express.static('track'));