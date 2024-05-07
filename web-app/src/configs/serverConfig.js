const PROD = window.location.host === 'https://iot-based-plantation-system-2evs.onrender.com'
console.log(window.location.host, PROD)
const SERVER_URL = PROD ? 'https://iot-based-plantation-system-nodejs.onrender.com' : 'http://localhost:4000'
const VERSION = "/api/v1"

export const SERVER_PATH = {
    SERVER_URL, VERSION
}
