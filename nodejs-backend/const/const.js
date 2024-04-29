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

const RAINFALL_LOCATIONS = {
    galle: {
        name: 'galle',
        id: 1246294,
        humidity: 40
    },
    panadura: {
        name: 'panadura',
        id: 1231410,
        humidity: 60
    },
    colombo: {
        name: 'colombo',
        id: 1248991,
        humidity: 50
    },
    matugama: {
        name: 'matugama',
        id: 1235806,
        humidity: 70
    },
    horana: {
        name: 'horana-south',
        id: 1243867,
        humidity: 30
    },
    ratnapura: {
        name: 'idangoda',
        id: 1243648,
        humidity: 130
    }
}

module.exports = {
    BASE_PATH,
    STATUS_200,
    STATUS_500,
    STATUS_400,
    USER_ROLES,
    ENV_TYPES,
    RAINFALL_LOCATIONS
}