const PROD = process.env.SERVER_TYPE === 'PROD'
console.log(PROD, process.env.SERVER_TYPE)
const SERVER_URL = PROD ? process.env.SERVER_HOST : 'http://localhost:4000'
const VERSION = "/api/v1"
console.log(SERVER_URL)
export const SERVER_PATH = {
    SERVER_URL, VERSION
}
