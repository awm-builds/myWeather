import { useState, useEffect } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import * as locService from '../../utilities/loc-service';
import * as weatherAPI from '../../utilities/weather-api';

export default function LocTempPage() {
  
  const [coords,setCoords] = useState(null);
  const [msg, setMsg] = useState('');
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function getWeather() {
      const weather = await weatherAPI.getWeatherForLoc(coords);
      setWeather(weather);
      console.log(weather);
    }
    if (coords) getWeather();
  }, [coords])

  useEffect(() => {
    async function getCoords() {
      try {
        const coords = await locService.getLocation();
        setCoords(coords);
      } catch {
        setMsg('No location has been given.');
      }
    }
    getCoords();
  },[]);

  return (
        <div id="weather_wrapper">
          <div className="weatherCard">
          <div className="currentTemp">
            <span className="tempLabel">Temperature</span>
            <span className="temp">{weather?.temp}&#8457;</span>
            <br />
            <span className="minMax">
            Low:&nbsp;&nbsp;{weather?.tempMin}&#8457;
              <br />
            High:&nbsp;&nbsp;{weather?.tempMax}&#8457;
            </span>
              <span className="location"></span>
            </div>
            <div className="currentWeather">
            <span className="conditions">{weather?.conditions}<br /><img src={`https://openweathermap.org/img/wn/${weather?.icon}@2x.png`}/></span>
            <div className="info">
              <span>Humidity:&nbsp;&nbsp;{weather?.humidity}%</span>
              <br />
              <span>Feels like:&nbsp;&nbsp;{weather?.feelsLike}&#8457;</span>
              </div>
            </div>
          </div>
      </div>
  );
}