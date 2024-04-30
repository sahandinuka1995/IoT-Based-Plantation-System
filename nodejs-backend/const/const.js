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
    ampara: {
        name: 'ampara',
        id: 1251459,
        humidity: 60,
        n: 40,
        p: 60,
        k: 20
    },
    panadura: {
        name: 'panadura',
        id: 1231410,
        humidity: 90,
        n: 20,
        p: 20,
        k: 25
    },
    kalubowila: {
        name: 'kalubowila',
        id: 1242067,
        humidity: 50,
        n: 30,
        p: 50,
        k: 20
    },
    matugama: {
        name: 'matugama',
        id: 1235806,
        humidity: 50,
        n: 5,
        p: 30,
        k: 30
    },
    horana: {
        name: 'horana-south',
        id: 1243867,
        humidity: 90,
        n: 100,
        p: 30,
        k: 20
    },
    ratnapura: {
        name: 'idangoda',
        id: 1243648,
        humidity: 60,
        n: 30,
        p: 60,
        k: 20
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