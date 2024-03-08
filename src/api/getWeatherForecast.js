const GEO_API_KEY = '39634d5d304670572eefa091d5d64e9d'

async function getWeatherForecast(lat, lon) {
  try {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${GEO_API_KEY}&units=metric&lang=pt_br`;
    const response = await fetch(weatherUrl);
    const dadosPrevisao = await response.json();
    return dadosPrevisao
  } catch (error) {
    console.error('Erro ao obter dados de previsão do tempo:', error.message);
  }
}

module.exports = getWeatherForecast;
