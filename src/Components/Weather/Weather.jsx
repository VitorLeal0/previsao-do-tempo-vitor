import { useState } from 'react';
import MapGoogle from '../MapGoogle/MapGoogle';
import "./Weather.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTemperatureHigh,
  faThermometerHalf,
  faCloud,
  faTint,
  faWind,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';

export default function Weather() {
  const [searchedCity, setSearchedCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [geo, setGeo] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);

  const getCitySeached = require('../../api/getCitySeached');
  const getWeatherForecast = require('../../api/getWeatherForecast');
  const  getMyCity = require ('../../api/getMyCity');

  async function getWeatherForecastByCity(searchEvent) {
    try {
      searchEvent.preventDefault();
      setLoading(true);
      setCity(searchedCity);
      const coordinates = await getCitySeached(searchedCity);
      setGeo(coordinates);
      const data = await getWeatherForecast(coordinates.lat, coordinates.lon);
      setWeather(data);
    } catch (error) {
      console.error('Erro ao obter previsão do tempo por cidade:', error.message);
    } finally {
      setLoading(false);
    }
  }


  async function getWeatherForecastByMyCity(myLocalEvent) {
    try {
      myLocalEvent.preventDefault();
      setLoading(true);
      const myCityData = await getMyCity()
      setGeo(myCityData);
      const data = await getWeatherForecast(myCityData.lat, myCityData.lon);
      setWeather(data);
      setCity(myCityData.city)
    } catch (error) {
      console.error('Erro ao obter previsão do tempo por cidade:', error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form action='' onSubmit={getWeatherForecastByCity}>
        <input
          type='text'
          placeholder='Digite o nome da Cidade (Ex: Florianópolis)'
          value={searchedCity}
          onChange={searchEvent => setSearchedCity(searchEvent.target.value)}
        />
        <div className='buttons'>
        <button type='submit' disabled={loading}>
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            'Pesquisar Cidade'
          )}
        </button>
          <button onClick={myLocalEvent => getWeatherForecastByMyCity(myLocalEvent)} type='submit' disabled={loading}>
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            'Previsao para Meu Local'
          )}</button>
        </div>
      </form>
      {city && weather && geo && (
        <>
          <h1 className='city'>{geo.city}</h1>
          <h3 className='state'>{geo.state} - {geo.country}</h3>
          <div className='container_map_weather'>
            <div className='container_map'><MapGoogle searchedCity={city}/></div>
            <div className='container_weather'> 
              <h2 className='container_weather_actual'>Tempo Atual</h2>
              <ul className='container_weather_actual_points'>
                <li>
                  <FontAwesomeIcon icon={faTemperatureHigh} /> Temperatura:{' '}
                  {weather.main.temp}ºC
                </li>
                <li>
                  <FontAwesomeIcon icon={faThermometerHalf} /> Sensação
                  térmica: {weather.main.feels_like}ºC
                </li>
                <li>
                  <FontAwesomeIcon icon={faCloud} /> Clima:{' '}
                  {weather.weather[0].description
                    .slice(0, 1)
                    .toUpperCase() +
                    weather.weather[0].description.slice(
                      1,
                      weather.weather[0].description.length
                    )}
                </li>
                <li>
                  <FontAwesomeIcon icon={faTint} /> Humidade:{' '}
                  {weather.main.humidity}%
                </li>
                <li>
                  <FontAwesomeIcon icon={faWind} /> Velocidade do vento:{' '}
                  {weather.wind.speed}m/s
                </li>
              </ul>
            </div >
          </div> 
        </>
      )}
    </>
  );
}
