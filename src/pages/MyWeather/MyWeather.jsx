import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';

export default function MyWeather({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <main>
      <h1>myWeather</h1>
        <div id="weather_wrapper">
          <div class="weatherCard">
            <div class="currentTemp">
              <span class="temp">65&deg;</span>
              <span class="location">Boston</span>
            </div>
            <div class="currentWeather">
              <span class="conditions">Condition<br/>Icon</span>
              <div class="info">
                Weather Desc.
              </div>
            </div>
          </div>
        </div>
    </main>
  );
}