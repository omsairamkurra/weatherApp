import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const getWeatherData = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`/weather/${city}`);
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Weather App</h1>
      <input type="text" placeholder="Enter city name" onChange={handleInputChange} />
      <button onClick={getWeatherData} disabled={!city || loading}>
        Get Weather
      </button>

      {loading && <p>Loading...</p>}

      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
