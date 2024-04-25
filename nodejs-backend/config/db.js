const config = {
    host: process.env.DATABASE_HOST.trim(),
    user: process.env.DATABASE_USER.trim(),
    password: process.env.DATABASE_PASSWORD.trim(),
    database: process.env.DATABASE_NAME.trim(),
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
}

module.exports = config