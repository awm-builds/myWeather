module.exports = {
    getForecast,
};

const API_KEY = process.env.API_KEY;


async function getForecast(req, res) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${req.params.lat}&lon=${req.params.lon}&appid=${API_KEY}&units=imperial`;
    const data = await fetch(url).then(res => res.json());
    const forecast = {
 
        dOneCond: data.list[0].weather.icon,
        dOneTemp: Math.trunc(data.list[0].main.temp),
        dOneIcon: data.list[0].weather[0].icon,
        dOneHumd: data.list[0].main.humidity,
        dOneDate: new Date(data.list[0].dt * 1000),
        dOneFeel: Math.trunc(data.list[0].main.feels_like),
        dOneMinT: Math.trunc(data.list[0].main.temp_min),
        dOneMaxT: Math.trunc(data.list[0].main.temp_max),

        dTwoCond: data.list[1].weather.icon,
        dTwoTemp: Math.trunc(data.list[1].main.temp),
        dTwoIcon: data.list[1].weather[0].icon,
        dTwoHumd: data.list[1].main.humidity,
        dTwoDate: new Date(data.list[1].dt * 1000),
        dTwoFeel: Math.trunc(data.list[1].main.feels_like),
        dTwoMinT: Math.trunc(data.list[1].main.temp_min),
        dTwoMaxT: Math.trunc(data.list[1].main.temp_max),
        
        dThreeCond: data.list[2].weather.icon,
        dThreeTemp: Math.trunc(data.list[2].main.temp),
        dThreeIcon: data.list[2].weather[0].icon,
        dThreeHumd: data.list[2].main.humidity,
        dThreeDate: new Date(data.list[2].dt * 1000),
        dThreeFeel: Math.trunc(data.list[2].main.feels_like),
        dThreeMinT: Math.trunc(data.list[2].main.temp_min),
        dThreeMaxT: Math.trunc(data.list[2].main.temp_max),        

    };
    res.json(forecast);
}