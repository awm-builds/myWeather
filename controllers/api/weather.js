module.exports = {
    getForLoc,
};

const API_KEY = process.env.API_KEY;


async function getForLoc(req, res) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${req.params.lat}&lon=${req.params.lon}&appid=${API_KEY}&units=imperial`;
        console.log('Making request to:', url); // Debug log
        
        const response = await fetch(url);
        
        if (!response.ok) {
            console.error('OpenWeather API error:', response.status, response.statusText);
            return res.status(response.status).json({ error: 'Failed to fetch weather data' });
        }
        
        const data = await response.json();
        console.log('OpenWeather API response:', data); // Debug log
        
        // Check if the response has the expected structure
        if (!data.weather || !data.weather[0] || !data.main) {
            console.error('Invalid API response structure:', data);
            return res.status(500).json({ error: 'Invalid weather data received' });
        }
        
        const weather = {
            conditions: data.weather[0].main,
            temp: Math.trunc(data.main.temp),
            icon: data.weather[0].icon,
            humidity: data.main.humidity,
            dateTime: new Date(data.dt * 1000),
            feelsLike: Math.trunc(data.main.feels_like),
            tempMin: Math.trunc(data.main.temp_min),
            tempMax: Math.trunc(data.main.temp_max),
        };
        
        res.json(weather);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Internal server error while fetching weather data' });
    }
}