import { useState} from 'react'
import MapGoogle from '../MapGoogle/MapGoogle';
import "./Weather.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTemperatureHigh,
  faThermometerHalf,
  faCloud,
  faTint,
  faWind,
} from '@fortawesome/free-solid-svg-icons';

export default function Weather() {
  const [searchedCity, setSearchedCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [geo,setGeo] = useState(null)
  const [city, setCity] = useState('')

  const getCityCoordinates = require('../../api/getCityCoordinates');
  const getWeatherForecast = require('../../api/getWeatherForecast');

  async function getWeatherForecastByCity(searchedCity) {
    try {
      const coordinates = await getCityCoordinates(searchedCity);
      setGeo(coordinates)
      const data = await getWeatherForecast(coordinates.lat, coordinates.lon);
      setWeather(data)
    } catch (error) {
      console.error('Erro ao obter previsão do tempo por cidade:', error.message);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    await getWeatherForecastByCity(searchedCity)
    setCity(searchedCity)
  }

  return (
    <>
      <form action='' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Digite o nome da Cidade (Ex: Florianópolis)'
          value={searchedCity}
          onChange={event => setSearchedCity(event.target.value)}
        />
        <button type='submit'>Pesquisar Cidade</button>
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
  )
}