export function getLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            console.error('📍 Geolocation is not supported by this browser');
            reject(new Error('Geolocation not supported'));
            return;
        }

        console.log('📍 Requesting geolocation...');
        
        const options = {
            enableHighAccuracy: false, // Better compatibility with various devices
            timeout: 10000, // 10 seconds timeout
            maximumAge: 300000 // 5 minutes cache
        };

        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log('📍 Geolocation success:', position);
                const {latitude: lat, longitude: lon} = position.coords;
                console.log('📍 Extracted coordinates:', {lat, lon});
                resolve({lat, lon});
            }, 
            (error) => {
                console.error('📍 Geolocation error:', error);
                console.error('📍 Error code:', error.code);
                console.error('📍 Error message:', error.message);
                
                // Provide a more specific error message
                let errorMessage = 'GPS location failed';
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Location permission denied';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'GPS signal unavailable';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'Location request timed out';
                        break;
                    default:
                        errorMessage = 'Location error occurred';
                        break;
                }
                reject(new Error(errorMessage));
            },
            options
        );
    });
}

// Get location using IP-based geolocation as alternative
export async function getLocationByIP() {
    try {
        console.log('📍 Trying IP-based location...');
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        if (data.latitude && data.longitude) {
            console.log('📍 IP location found:', data);
            return {
                lat: data.latitude,
                lon: data.longitude,
                city: data.city,
                region: data.region,
                country: data.country_name
            };
        } else {
            throw new Error('IP location service unavailable');
        }
    } catch (error) {
        console.error('📍 IP location failed:', error);
        throw new Error('IP-based location failed');
    }
}

// Default location (New York City) as fallback
export function getDefaultLocation() {
    console.log('📍 Using default location (NYC)');
    return { lat: 40.7128, lon: -74.0060 };
}