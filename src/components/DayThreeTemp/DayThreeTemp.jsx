import { useState, useEffect } from 'react';

import * as locService from '../../utilities/loc-service';
import * as weatherAPI from '../../utilities/weather-api';
import * as forecastAPI from '../../utilities/forecast-api';

export default function DayThreeTemp({ forecast }) {
  
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

  function dayThreeDay(dayNum) {
    if (dayNum > 0 && dayNum < 5) {
      dayNum = dayNum + 3;
      return dayNum;
    } else if (dayNum === 5) {
      dayNum = 1;
      return dayNum;
    } else if (dayNum === 6) {
      dayNum = 2;
      return dayNum;
    } else if (dayNum === 7) {
      dayNum = 3;
      return dayNum;
    }
  }

  let day = dayThreeDay(new Date().getDay())

  console.log('For Array: ' + day);
  
    return (
      <div id="weather_wrapperSM">
        <div className="weekday3Title">{weekday[day]}</div>
        <div className="weatherCardSM">
          <div className="currentTempSM">
            <span className="tempLabelSM">Temperature</span>
            <span className="tempSM">{forecast?.dThreeTemp}&#8457;</span>
            <span className="minMaxSM container">
              <div className="row justify-content-center">
                Low:&nbsp;&nbsp;{forecast?.dThreeMinT}&#8457;
              </div>
              <div className="row justify-content-center">
                High:&nbsp;&nbsp;{forecast?.dThreeMaxT}&#8457;
              </div>
            </span>
            <span className="locationSM"></span>
          </div>
          <div className="currentWeatherSM">
            <span className="conditionsSM">{forecast?.dThreeCond}<br /><img className="condIcon" src={`https://openweathermap.org/img/wn/${forecast?.dThreeIcon}@2x.png`} /></span>
            <div className="infoSM container">
              <div className="row justify-content-center">
                <span>Humidity:&nbsp;&nbsp;{forecast?.dThreeHumd}%</span>
              </div>
              <div className="row justify-content-center">
                <span>Feels like:&nbsp;&nbsp;{forecast?.dThreeFeel}&#8457;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }