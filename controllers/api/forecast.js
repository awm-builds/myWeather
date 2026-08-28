module.exports = {
    getForecast,
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


async function getForecast(req, res) {
    try {
        if (!API_KEY) {
            return res.status(500).json({ error: 'Missing OpenWeather API key. Set OPENWEATHER_API_KEY.' });
        }

        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${req.params.lat}&lon=${req.params.lon}&appid=${API_KEY}&units=imperial`;
        console.log('Making request to OpenWeather forecast endpoint');
        
        const response = await getJson(url);
        
        if (!response.ok) {
            console.error('OpenWeather Forecast API error:', response.status, response.statusText);
            return res.status(response.status).json({ error: 'Failed to fetch forecast data' });
        }
        
        const data = response.data;
        console.log('OpenWeather Forecast API response:', data); // Debug log
        
        // Check if the response has the expected structure
        if (!data.list || data.list.length < 3) {
            console.error('Invalid forecast API response structure:', data);
            return res.status(500).json({ error: 'Invalid forecast data received' });
        }
        
        const forecast = {
 
        dOneCond: data.list[0].weather.icon,
        dOneTemp: Math.trunc(data.list[0].main.temp),
        dOneIcon: data.list[0].weather[0].icon,
        dOneHumd: data.list[0].main.humidity,
        dOneDate: data.list[0].dt,
        dOneFeel: Math.trunc(data.list[0].main.feels_like),
        dOneMinT: Math.trunc(data.list[0].main.temp_min),
        dOneMaxT: Math.trunc(data.list[0].main.temp_max),

        dTwoCond: data.list[1].weather.icon,
        dTwoTemp: Math.trunc(data.list[1].main.temp),
        dTwoIcon: data.list[1].weather[0].icon,
        dTwoHumd: data.list[1].main.humidity,
        dTwoDate: data.list[1].dt,
        dTwoFeel: Math.trunc(data.list[1].main.feels_like),
        dTwoMinT: Math.trunc(data.list[1].main.temp_min),
        dTwoMaxT: Math.trunc(data.list[1].main.temp_max),

        dThreeCond: data.list[2].weather.icon,
        dThreeTemp: Math.trunc(data.list[2].main.temp),
        dThreeIcon: data.list[2].weather[0].icon,
        dThreeHumd: data.list[2].main.humidity,
        dThreeDate: data.list[2].dt,
        dThreeFeel: Math.trunc(data.list[2].main.feels_like),
        dThreeMinT: Math.trunc(data.list[2].main.temp_min),
        dThreeMaxT: Math.trunc(data.list[2].main.temp_max),        

    };
    res.json(forecast);
    } catch (error) {
        console.error('Error fetching forecast data:', error);
        res.status(500).json({ error: 'Internal server error while fetching forecast data' });
    }
}