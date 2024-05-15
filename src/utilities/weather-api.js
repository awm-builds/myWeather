import sendRequest from "./send-request";

const BASE_URL='/api/weather';

export function getWeatherForLoc(loc) {
    
    return sendRequest(`${BASE_URL}/lat/${loc.lat}/lon/${loc.lon}`)
}