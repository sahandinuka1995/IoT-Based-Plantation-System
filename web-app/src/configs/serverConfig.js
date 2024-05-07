const PROD = window.location.host === 'iot-based-plantation-system-2evs.onrender.com'

const SERVER_URL = PROD ? 'https://iot-based-plantation-system-nodejs.onrender.com' : 'http://localhost:4000'
const VERSION = "/api/v1"

export const SERVER_PATH = {
    SERVER_URL, VERSION
}
