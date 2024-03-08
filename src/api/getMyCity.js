const MAP_KEY = "AIzaSyCPYqhsdXgumUpVJBwvNmLQvLQ2l9r9ofg";
// ${MAP_KEY}

async function getMyCity() {
  try {
    if (navigator.geolocation) {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const { latitude, longitude } = position.coords;

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${MAP_KEY}`
      );

      const data = await response.json();
      const results = data.results;

      if (results.length > 0) {
        const mycity = results[0].address_components.find(
          (component) =>
            component.types.includes('administrative_area_level_2') ||
            component.types.includes('locality')
        );
      
        const mystate = results[0].address_components.find(
          (component) => component.types.includes('administrative_area_level_1')
        );

        const mycountry = results[0].address_components.find(
          (component) => component.types.includes('country')
        );

        const locationInformation = {
          lat: latitude,
          lon: longitude,
          city: mycity ? mycity.long_name : null,
          state: mystate ? mystate.short_name : null,
          country: mycountry ? mycountry.short_name : null,
        };

        return locationInformation;
      } else {
        console.error('Não foi possível obter informações de geocodificação..');
        return null;
      }
    } else {
      console.error('Geolocalização não suportada pelo navegador..');
      return null;
    }
  } catch (error) {
    console.error('Erro ao obter informações de geocodificação..:', error);
    return null;
  }
}
module.exports = getMyCity