export default function LocTempPage({ weather, coords, msg }) {
  // Determine message style based on content
  const getMessageStyle = (message) => {
    if (message.includes('Failed') || message.includes('failed') || message.includes('error') || message.includes('Error')) {
      return { color: 'red', padding: '10px', backgroundColor: '#ffe6e6', borderRadius: '5px' };
    } else if (message.includes('GPS') || message.includes('approximate') || message.includes('default')) {
      return { color: '#0066cc', padding: '10px', backgroundColor: '#e6f3ff', borderRadius: '5px' };
    }
    return { color: '#333', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' };
  };

  return (
    <div id="weather_wrapper">
      <div className="todayTitle">Today</div>
      {msg && <div className="status-message" style={getMessageStyle(msg)}>{msg}</div>}
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