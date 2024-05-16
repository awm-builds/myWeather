import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import MyWeather from '../MyWeather/MyWeather';
import ProfilePage from '../ProfilePage/ProfilePage';
import LocTempPage from '../LocTempPage/LocTempPage';
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
              <Route path="/LocTempPage" element={<LocTempPage />} />
            </Routes>
    </main>
  );
}
