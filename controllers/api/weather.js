module.exports = {
    getForLoc,
};

const API_KEY = process.env.API_KEY;


async function getForLoc(req, res) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${req.params.lat}&lon=${req.params.lon}&appid=${API_KEY}&units=imperial`;
    const data = await fetch(url).then(res => res.json());
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
}