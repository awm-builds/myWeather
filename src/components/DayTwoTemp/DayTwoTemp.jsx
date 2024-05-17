import { useState, useEffect } from 'react';
import * as locService from '../../utilities/loc-service';
import * as weatherAPI from '../../utilities/weather-api';

export default function DayTwoTemp() {

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
        <div id="weather_wrapperSM">
          <div className="weatherCardSM">
            <div className="currentTempSM">
              <span className="tempLabelSM">Temperature</span>
              <span className="tempSM">{weather?.temp}&#8457;</span>
              <span className="minMaxSM container">
                <div class="row justify-content-center">
                  Low:&nbsp;&nbsp;{weather?.tempMin}&#8457;
                </div>
                <div class="row justify-content-center">
                  High:&nbsp;&nbsp;{weather?.tempMax}&#8457;
                </div>
              </span>
            </div>
            <div className="currentWeatherSM">
              <div class="conditionsSM">{weather?.conditions}
                <img class="condIcon" src={`https://openweathermap.org/img/wn/${weather?.icon}@2x.png`} /></div>
                  <div className="infoSM container">
                    <div class="row justify-content-center">
                      <span>Humidity:&nbsp;&nbsp;{weather?.humidity}%</span>  
                    </div>
                    <div class="row justify-content-center">
                      <span>Feels like:&nbsp;&nbsp;{weather?.feelsLike}&#8457;</span>
                    </div>
              </div>
            </div>
          </div>
        </div>
  );
}