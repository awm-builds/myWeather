export default function LocTempPage({ weather, coords, msg }) {

  return (
    <div id="weather_wrapper">
      <div className="todayTitle">Today</div>
      {msg && <div className="error-message" style={{color: 'red', padding: '10px'}}>{msg}</div>}
      {!weather && !msg && <div className="loading" style={{padding: '10px'}}>Loading weather data...</div>}
      {weather && (
          <div className="weatherCard">
          <div className="currentTemp">
            <span className="tempLabel">Temperature</span>
            <span className="temp">{weather?.temp}&#8457;</span>
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
      )}
      </div>
  );
}