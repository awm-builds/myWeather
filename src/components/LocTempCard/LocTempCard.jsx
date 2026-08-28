export default function LocTempPage({ weather, coords, msg }) {
  return (
    <div id="weather_wrapper">
      <div className="todayTitle">Today</div>
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
            <span className="conditions">{weather?.conditions}<br /><img alt={`${weather?.conditions || 'weather'} icon`} src={`https://openweathermap.org/img/wn/${weather?.icon}@2x.png`}/></span>
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