const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/weather/:city', (req, res) => {
  try {
    const { city } = req.params;
    const apiKey = 'db341d6929bb730aedb29705471a0e94'; // Replace with your actual API key
    axios
      .get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        console.error(error); // Add this line to log the error
        if (error.response && error.response.status === 403) {
          res.status(403).json({ error: 'Invalid API key' });
        } else {
          res.status(500).json({ error: 'An error occurred' });
        }
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
