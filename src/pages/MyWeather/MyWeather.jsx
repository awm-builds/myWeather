import { useState, useEffect } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import LocTemp from '../../components/LocTemp/LocTemp';
import * as locService from '../../utilities/loc-service';

export default function MyWeather({ setUser }) {
  const [coords,setCoords] = useState(null);
  const [msg,setMsg] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);

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
            <span className="temp">{<LocTemp/>}</span>
              <span className="location">Boston</span>
            </div>
            <div className="currentWeather">
              <span className="conditions">Condition<br/>Icon</span>
              <div className="info">
                Weather Desc.
              </div>
            </div>
          </div>
      </div>
      <h3>&nbsp;{msg}</h3>
      <p>{JSON.stringify(coords)}</p>
    </main>
  );
}