const config = {
    host: process.env.DATABASE_HOST.trim(),
    user: process.env.DATABASE_USER.trim(),
    password: process.env.DATABASE_PASSWORD.trim(),
    database: process.env.DATABASE_NAME.trim(),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
}

module.exports = config