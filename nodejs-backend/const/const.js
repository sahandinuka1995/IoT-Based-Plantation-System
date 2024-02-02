const BASE_PATH = '/api/v1'
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
const USER_ROLES = ['ADMIN', 'USER']

module.exports = {
    BASE_PATH,
    STATUS_200,
    STATUS_500,
    STATUS_400,
    USER_ROLES
}