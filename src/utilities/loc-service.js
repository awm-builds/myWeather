export function getLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((results) => {
            const {latitude: lat, longitude: lon} = results.coords;
            resolve({lat, lon});
        }, () => {
            reject();
        });
    });
}