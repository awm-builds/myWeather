import { useState, useEffect } from 'react';

import * as locService from '../../utilities/loc-service';
import * as weatherAPI from '../../utilities/weather-api';
import * as forecastAPI from '../../utilities/forecast-api';

export default function DayOneTemp({ forecast }) {
  
  // Remove duplicate state and effects since we're getting forecast from props
  // const [coords,setCoords] = useState(null);
  // const [msg, setMsg] = useState('');
  // const [forecast, setForecast] = useState(null);

  // useEffect(() => {
  //   async function getForecast() {
  //     const forecast = await forecastAPI.getForecast3Day(coords);
  //     setForecast(forecast);
  //     console.log(forecast);
  //   }
  //   if (coords) getForecast();
  // }, [coords])

  // useEffect(() => {
  //   async function getCoords() {
  //     try {
  //       const coords = await locService.getLocation();
  //       setCoords(coords);
  //     } catch {
  //       setMsg('No location has been given.');
  //     }
  //   }
  //   getCoords();
  // },[]);

    let weekday = [
    'Nope',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  function dayOneDay(dayNum) {
    if (dayNum > 0 && dayNum < 7) {
      dayNum = dayNum + 1;
      return dayNum;
    } else if (dayNum === 7) {
      dayNum = 1;
      return dayNum;
    }
  }

  let day = dayOneDay(new Date().getDay())

  return (
      <>
      <div id="weather_wrapperSM">
        <div className="weekday3Title">{weekday[day]}</div>
          <div className="weatherCardSM">
          <div className="currentTempSM">
            <span className="tempLabelSM">Temperature</span>
            <span className="tempSM">{forecast?.dOneTemp}&#8457;</span>
            <span className="minMaxSM container">
            <div class="row justify-content-center">
              Low:&nbsp;&nbsp;{forecast?.dOneMinT}&#8457;
            </div>
            <div class="row justify-content-center">
              High:&nbsp;&nbsp;{forecast?.dOneMaxT}&#8457;
            </div>
            </span>
            <span className="locationSM"></span>
            </div>
            <div className="currentWeatherSM">
            <span className="conditionsSM">{forecast?.dOneCond}<br /><img class="condIcon" src={`https://openweathermap.org/img/wn/${forecast?.dOneIcon}@2x.png`}/></span>
          <div className="infoSM container">
            <div class="row justify-content-center">
                <span>Humidity:&nbsp;&nbsp;{forecast?.dOneHumd}%</span>  
            </div>
            <div class="row justify-content-center">
              <span>Feels like:&nbsp;&nbsp;{forecast?.dOneFeel}&#8457;</span>
            </div>
          </div>
            </div>
          </div>
      </div>
      </>
  );
}