import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import LocTemp from '../../components/LocTemp/LocTemp';

export default function MyWeather({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
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
    </main>
  );
}