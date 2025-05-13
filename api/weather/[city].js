import axios from 'axios';

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export default async function handler(req, res) {
  const {
    query: { city },
    method,
  } = req;

  if (method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        units: 'metric',
        appid: API_KEY,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json({
        error: error.response.data.message || 'Failed to fetch weather data',
      });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
