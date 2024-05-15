import { useState, useEffect } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import LocTemp from '../../components/LocTemp/LocTemp';
import * as locService from '../../utilities/loc-service';
import * as weatherAPI from '../../utilities/weather-api';

export default function MyWeather({ setUser }) {
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
        setMsg('No go for location.');
      }
    }
    getCoords();
  },[]);

  return (
    <main>
      <h1>myWeather</h1>
        <div id="weather_wrapper">
          <div className="weatherCard">
            <div className="currentTemp">
            <span className="temp">{weather?.temp}&#8457;</span>
            <br />
            <span className="minMax">
            Low: {weather?.tempMin}&#8457;
              <br />
            High: {weather?.tempMax}&#8457;
            </span>
              <span className="location"></span>
            </div>
            <div className="currentWeather">
            <span className="conditions">{weather?.conditions}<br /><img src={`https://openweathermap.org/img/wn/${weather?.icon}@2x.png`}/></span>
            <div className="info">
              <span>Humidity: {weather?.humidity}</span>
              <br />
              <span>Feels like: {weather?.feelsLike}&#8457;</span>
              </div>
            </div>
          </div>
      </div>
      <h3>&nbsp;{msg}</h3>
      <p>{JSON.stringify(coords)}</p>
    </main>
  );
}

/*
    const weather = {
        conditions: data.weather.main,
        temp: data.main.temp,
        icon: data.weather.icon,
        humidity: data.main.humidity,
        dateTime: new Date(data.dt * 1000),
        tempMin: data.main.temp_min,
        tempMax: data.main.temp_max,
    };
*/