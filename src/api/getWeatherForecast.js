const GEO_API_KEY= process.env.REACT_APP_GEO_API_KEY

async function getWeatherForecast(lat, lon) {
  try {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${GEO_API_KEY}&units=metric&lang=pt_br`;
    const response = await fetch(weatherUrl);
    const dataForecast = await response.json();
    return dataForecast
  } catch (error) {
    console.error('Erro ao obter dados de previsão do tempo:', error.message);
  }
}

module.exports = getWeatherForecast;
