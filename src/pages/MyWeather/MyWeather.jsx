import { useState, useEffect } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import * as locService from '../../utilities/loc-service';
import * as weatherAPI from '../../utilities/weather-api';
import LocTempPage from "../LocTempPage/LocTempPage";

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
      <LocTempPage/>
      <h3>&nbsp;{msg}</h3>

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