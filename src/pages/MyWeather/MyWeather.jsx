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
        setMsg('Getting your GPS location...');
        const coords = await locService.getLocation();
        console.log('📍 GPS location coords received:', coords);
        setCoords(coords);
        setMsg('Using your current GPS location');
      } catch (error) {
        console.error('📍 GPS location error:', error);
        console.log('📍 Trying IP-based location...');
        setMsg('GPS unavailable, trying IP-based location...');
        
        try {
          const ipCoords = await locService.getLocationByIP();
          console.log('📍 IP location coords received:', ipCoords);
          setCoords({ lat: ipCoords.lat, lon: ipCoords.lon });
          setMsg(`Using approximate location: ${ipCoords.city}, ${ipCoords.region}`);
        } catch (ipError) {
          console.error('📍 IP location also failed:', ipError);
          console.log('📍 Falling back to default location');
          
          // Use default location as final fallback
          const defaultCoords = locService.getDefaultLocation();
          setCoords(defaultCoords);
          setMsg('Using New York City as default location. Click "Use My Location" to try again.');
        }
      }
    }
    getCoords();
  },[]);

  const testWithNYC = () => {
    console.log('🧪 Testing with NYC coordinates');
    setCoords({ lat: 40.7128, lon: -74.0060 });
    setMsg('Testing with NYC coordinates');
  };

  const tryIPLocation = async () => {
    try {
      console.log('📍 Trying IP-based location...');
      setMsg('Getting location from IP address...');
      const ipCoords = await locService.getLocationByIP();
      console.log('📍 IP location received:', ipCoords);
      setCoords({ lat: ipCoords.lat, lon: ipCoords.lon });
      setMsg(`Using IP-based location: ${ipCoords.city}, ${ipCoords.region}`);
    } catch (error) {
      console.error('📍 IP location failed:', error);
      setMsg(`IP-based location failed: ${error.message}`);
    }
  };

  const useMyLocation = async () => {
    try {
      console.log('📍 Retrying GPS location...');
      setMsg('Getting your GPS location...');
      const coords = await locService.getLocation();
      console.log('📍 GPS location received:', coords);
      setCoords(coords);
      setMsg('Using your current GPS location');
    } catch (error) {
      console.error('📍 GPS location retry failed:', error);
      
      try {
        console.log('📍 Trying IP-based location as backup...');
        setMsg('GPS failed, trying IP-based location...');
        const ipCoords = await locService.getLocationByIP();
        console.log('📍 IP location received:', ipCoords);
        setCoords({ lat: ipCoords.lat, lon: ipCoords.lon });
        setMsg(`Using approximate location: ${ipCoords.city}, ${ipCoords.region}`);
      } catch (ipError) {
        console.error('📍 IP location also failed:', ipError);
        setMsg(`GPS location failed: ${error.message}. IP location also failed. Using NYC as default.`);
        // Keep current coordinates (probably NYC fallback)
      }
    }
  };

  return (
    <main>
      <div className="container">
        <div className="row">
          <div className="col">
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
              <button 
                onClick={useMyLocation}
                style={{
                  backgroundColor: '#28a745',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginRight: '10px'
                }}
              >
                📍 Use My Location
              </button>
              <button 
                onClick={tryIPLocation}
                style={{
                  backgroundColor: '#ffc107',
                  color: 'black',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginRight: '10px'
                }}
              >
                🌐 Try IP Location
              </button>
              <button 
                onClick={testWithNYC}
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                🧪 Test with NYC
              </button>
              {coords && (
                <div style={{ 
                  marginTop: '10px', 
                  fontSize: '14px', 
                  color: '#666',
                  background: '#f8f9fa',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  display: 'inline-block'
                }}>
                  📍 Current: {coords.lat.toFixed(4)}, {coords.lon.toFixed(4)}
                </div>
              )}
            </div>
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