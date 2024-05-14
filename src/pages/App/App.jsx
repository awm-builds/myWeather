import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import MyWeather from '../MyWeather/MyWeather';
import ProfilePage from '../ProfilePage/ProfilePage';
import ThirdPage from '../ThirdPage/ThirdPage';
import NavBar from '../../components/NavBar/NavBar';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
            <NavBar user={user} setUser={setUser} />
              <Routes>
              {/* Route components in here */}
              <Route path="/" element={<MyWeather />} />
              <Route path="/ProfilePage" element={<ProfilePage />} />
              <Route path="/ThirdPage" element={<ThirdPage />} />
            </Routes>
    </main>
  );
}
