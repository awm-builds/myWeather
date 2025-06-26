import { useState, useEffect } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import * as locService from '../../utilities/loc-service';
import * as weatherAPI from '../../utilities/weather-api';
import * as forecastAPI from '../../utilities/forecast-api';
import LocTempPage from "../../components/LocTempCard/LocTempCard";
import DayOneTemp from "../../components/DayOneTemp/DayOneTemp";
import DayTwoTemp from "../../components/DayTwoTemp/DayTwoTemp";
import DayThreeTemp from "../../components/DayThreeTemp/DayThreeTemp";

export default function MyWeather({ setUser }) {
  const [coords,setCoords] = useState(null);
  const [msg, setMsg] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    async function getWeather() {
      try {
        console.log('🌤️ Fetching weather for coords:', coords);
        console.log('🌤️ Making API call to:', `/api/weather/lat/${coords.lat}/lon/${coords.lon}`);
        const weather = await weatherAPI.getWeatherForLoc(coords);
        console.log('🌤️ Weather data received:', weather);
        setWeather(weather);
        setMsg(''); // Clear any previous error messages
      } catch (error) {
        console.error('❌ Error fetching weather:', error);
        console.error('❌ Error message:', error.message);
        setMsg(`Failed to fetch weather data: ${error.message}`);
        setWeather(null);
      }
    }

    async function getForecast() {
      try {
        console.log('📅 Fetching forecast for coords:', coords);
        console.log('📅 Making forecast API call to:', `/api/forecast/lat/${coords.lat}/lon/${coords.lon}`);
        const forecast = await forecastAPI.getForecast3Day(coords);
        console.log('📅 Forecast data received:', forecast);
        setForecast(forecast);
      } catch (error) {
        console.error('❌ Error fetching forecast:', error);
        console.error('❌ Forecast error message:', error.message);
        // Don't overwrite weather error message
        if (!msg) {
          setMsg(`Failed to fetch forecast data: ${error.message}`);
        }
        setForecast(null);
      }
    }

    if (coords) {
      console.log('🌍 Coords available, fetching weather and forecast:', coords);
      getWeather();
      getForecast();
    } else {
      console.log('🌍 No coords available yet');
    }
  }, [coords])

  useEffect(() => {
    async function getCoords() {
      try {
        console.log('📍 Getting location coordinates...');
        const coords = await locService.getLocation();
        console.log('📍 Location coords received:', coords);
        setCoords(coords);
      } catch (error) {
        console.error('📍 Location error:', error);
        console.log('📍 Falling back to default location');
        
        // Use default location as fallback
        const defaultCoords = locService.getDefaultLocation();
        setCoords(defaultCoords);
        setMsg(`Using default location (NYC). Error: ${error.message}`);
      }
    }
    getCoords();
  },[]);

  const testWithNYC = () => {
    console.log('🧪 Testing with NYC coordinates');
    setCoords({ lat: 40.7128, lon: -74.0060 });
    setMsg('Testing with NYC coordinates');
  };

  return (
    <main>
      <div className="container">
        <div className="row">
          <div className="col">
            <button 
              onClick={testWithNYC}
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginBottom: '20px'
              }}
            >
              🧪 Test with NYC Weather
            </button>
            <LocTempPage weather={weather} coords={coords} msg={msg}/>
          </div>
        </div>
      </div>
      <div className="container threeDayWthr">
        <div className="row">
          <div className="col-sm">
              <DayOneTemp forecast={forecast}/>
          </div>
          <div className="col-sm">
              <DayTwoTemp forecast={forecast}/>
          </div>
          <div className="col-sm">
              <DayThreeTemp forecast={forecast}/>
          </div>
        </div>
      </div>
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