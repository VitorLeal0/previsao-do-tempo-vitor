const GEO_API_KEY = '39634d5d304670572eefa091d5d64e9d'


async function getCitySeached(cidade) {
  try {
    const geolocationUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cidade}&limit=5&appid=${GEO_API_KEY}&lang=pt_br`;
    const response = await fetch(geolocationUrl);
    const data = await response.json();
    const cityName = (data) => {
      if (data && data.length > 0) {
        const city = data[0].local_names?.pt || data[0].name;
      return city
      }
      return "Cidade Desconhecida";
    }
    const city=cityName(data)
    const coordinates = {lat:data[0].lat, lon:data[0].lon,city,country:data[0].country,state:data[0].state};
    return coordinates;
  } catch (error) {
    console.error('Erro ao obter coordenadas da cidade:', error.message);
    throw error;
  }
}

module.exports = getCitySeached;
