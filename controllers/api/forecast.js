module.exports = {
    getForecast,
};

const API_KEY = process.env.API_KEY;


async function getForecast(req, res) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${req.params.lat}&lon=${req.params.lon}&appid=${API_KEY}&units=imperial`;
    const data = await fetch(url).then(res => res.json());
    const forecast = {
        
        conditions: data.weather[0].main,
        temp: Math.trunc(data.main.temp),
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        dateTime: new Date(data.dt * 1000),
        feelsLike: Math.trunc(data.main.feels_like),
        tempMin: Math.trunc(data.main.temp_min),
        tempMax: Math.trunc(data.main.temp_max),

        dOneCond: data.list[0].weather.icon,
        dOneTemp: data.list[0].main.temp,
        dOneIcon: data.list[0].weather.icon,
        dOneHumd: data.list[0].main.humidity,
        dOneDate: new Date(data.list[0].dt * 1000),
        dOneFeel: data.list[0].main.feels_like,
        dOneMinT: data.list[0].main.temp_min,
        dOneMaxT: data.list[0].main.temp_max,

        dTwoCond: data.list[1].weather.icon,
        dTwoTemp: data.list[1].main.temp,
        dTwoIcon: data.list[1].weather.icon,
        dTwoHumd: data.list[1].main.humidity,
        dTwoDate: new Date(data.list[1].dt * 1000),
        dTwoFeel: data.list[1].main.feels_like,
        dTwoMinT: data.list[1].main.temp_min,
        dTwoMaxT: data.list[1].main.temp_max,
        
        dThreeCond: data.list[2].weather.icon,
        dThreeTemp: data.list[2].main.temp,
        dThreeIcon: data.list[2].weather.icon,
        dThreeHumd: data.list[2].main.humidity,
        dThreeDate: new Date(data.list[2].dt * 1000),
        dThreeFeel: data.list[2].main.feels_like,
        dThreeMinT: data.list[2].main.temp_min,
        dThreeMaxT: data.list[2].main.temp_max,        

    };
    res.json(forecast);
}