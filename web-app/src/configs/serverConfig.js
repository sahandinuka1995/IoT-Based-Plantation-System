const PROD = process.env.SERVER_TYPE === 'PROD'

const SERVER_URL = PROD ? process.env.SERVER_HOST : 'http://localhost:4000'
const VERSION = "/api/v1"

export const SERVER_PATH = {
    SERVER_URL, VERSION
}
