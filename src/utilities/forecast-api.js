import sendRequest from "./send-request";

const BASE_URL='/api/forecast';

export function getForecast3Day(loc) {
    
    return sendRequest(`${BASE_URL}/lat/${loc.lat}/lon/${loc.lon}`)
}