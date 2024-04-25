const BASE_PATH = '/api/v1'

// http status
const STATUS_500 = {
    message: "Something went wrong",
    data: null
}

const STATUS_400 = (message) => {
    return {
        message,
        data: null
    }
}

const STATUS_200 = (data) => {
    return {
        message: 'Operation Successfully',
        data
    }
}

// user roles
const USER_ROLES = ['ADMIN', 'USER']

// environmental types
const ENV_TYPES = {
    NITROGEN: 'NITROGEN',
    PHOSPHORUS: 'PHOSPHORUS',
    POTASSIUM: 'POTASSIUM',
    HUMIDITY: 'HUMIDITY',
    RAINFALL: 'RAINFALL',
    TEMPERATURE: 'TEMPERATURE',
    PH: 'PH'
}

module.exports = {
    BASE_PATH,
    STATUS_200,
    STATUS_500,
    STATUS_400,
    USER_ROLES,
    ENV_TYPES
}