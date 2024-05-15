import { useEffect } from 'react';

const BASEURL = 'https://api.openweathermap.org/data/3.0/';

export default function LocTemp() {
    /* const [currTemp, setCurrTemp] = useState(); */

    let lat = 17.6;
    let lon = 55.9;
    const API_KEY = '69783222903c34d31614d443203ff766';

    useEffect(() => {
        fetch('http://api.dictionaryapi.dev/api/v2/entries/en/hello')
            /* `${BASEURL}onecall?lat=${lat}&lon=${lon}&exclude={minutely,hoursly,daily,alerts}&units={imperial}&appid=${API_KEY}` */
            .then(response => response.json())
            .then(json => console.log(json));
        console.log('page loaded');
     }, []);
    return '999';    
}