module.exports = {
    getForLoc,
};

const https = require('https');

const API_KEY = process.env.OPENWEATHER_API_KEY || process.env.API_KEY;

function getJson(url) {
    if (typeof fetch === 'function') {
        return fetch(url).then(async (response) => {
            const data = await response.json().catch(() => null);
            return { ok: response.ok, status: response.status, statusText: response.statusText, data };
        });
    }

    // Node < 18 fallback when global fetch is unavailable.
    return new Promise((resolve, reject) => {
        https
            .get(url, (res) => {
                let body = '';
                res.on('data', (chunk) => {
                    body += chunk;
                });
                res.on('end', () => {
                    let data = null;
                    try {
                        data = JSON.parse(body);
                    } catch (err) {
                        data = null;
                    }

                    resolve({
                        ok: res.statusCode >= 200 && res.statusCode < 300,
                        status: res.statusCode,
                        statusText: res.statusMessage,
                        data,
                    });
                });
            })
            .on('error', reject);
    });
}


async function getForLoc(req, res) {
    try {
        if (!API_KEY) {
            return res.status(500).json({ error: 'Missing OpenWeather API key. Set OPENWEATHER_API_KEY.' });
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${req.params.lat}&lon=${req.params.lon}&appid=${API_KEY}&units=imperial`;
        console.log('Making request to OpenWeather weather endpoint');
        
        const response = await getJson(url);
        
        if (!response.ok) {
            console.error('OpenWeather API error:', response.status, response.statusText);
            return res.status(response.status).json({ error: 'Failed to fetch weather data' });
        }
        
        const data = response.data;
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