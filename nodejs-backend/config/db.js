const PROD = process.env.SERVER_HOST.trim() === 'PROD'

const config = {
    host: PROD ? process.env.DATABASE_HOST.trim() : 'localhost',
    user: PROD ? process.env.DATABASE_USER.trim() : 'root',
    password: PROD ? process.env.DATABASE_PASSWORD.trim() : 'root',
    database: PROD ? process.env.DATABASE_NAME.trim() : 'iot_plantation',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
}

module.exports = config