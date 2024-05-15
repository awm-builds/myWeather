module.exports = {
    getForLoc,
};

const API_KEY = process.env.API_KEY;


async function getForLoc(req, res) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${req.params.lat}&lon=${req.params.lon}&appid=${API_KEY}&units=imperial`;
    const data = await fetch(url).then(res => res.json());
    const weather = {
        conditions: data.weather[0].main,
        temp: data.main.temp,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        dateTime: new Date(data.dt * 1000),
        tempMin: data.main.temp_min,
        tempMax: data.main.temp_max,
    };
    res.json(weather);
}