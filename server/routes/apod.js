const router = require('express').Router();
const axios = require('axios');

const NASA_APOD_KEY = process.env.NASA_APOD_KEY;

router.get('/', async (req, res) => {
  try {
    if (!NASA_APOD_KEY) {
      return res
        .status(500)
        .json({ message: 'NASA_APOD_KEY is not configured on the server' });
    }

    const { date } = req.query;
    const targetDate = date || new Date().toISOString().slice(0, 10);

    const { data } = await axios.get(
      'https://api.nasa.gov/planetary/apod',
      {
        params: {
          api_key: NASA_APOD_KEY,
          date: targetDate,
        },
      }
    );

    res.json(data);
  } catch (error) {
    console.error('APOD fetch failed:', error.message);
    res
      .status(502)
      .json({ message: 'Failed to fetch NASA APOD data. Please try again.' });
  }
});

module.exports = router;

