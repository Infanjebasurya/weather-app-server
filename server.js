require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weatherRouter = require('./routes/weather');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/weather', weatherRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});