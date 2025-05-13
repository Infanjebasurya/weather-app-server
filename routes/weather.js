const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

router.get('/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        units: 'metric',
        appid: API_KEY,
      },
    });
    res.json(response.data);
  } catch (error) {
    if (error.response) {
      
      
      res.status(error.response.status).json({
        error: error.response.data.message || 'Failed to fetch weather data'
      });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

module.exports = router;