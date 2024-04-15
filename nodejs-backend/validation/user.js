const {createUserError} = require("../const/error")
const {USER_ROLES} = require("../const/const");

const userCreateValidation = (data, isValidatePassword) => {
    const error = {...createUserError}

    for (const key in data) {
        if (data[key] === "") {
            if (key === "password") {
                if (isValidatePassword) {
                    error[key] = true
                    error.message = `${key} should not be empty`
                } else {
                    error[key] = false
                }
            } else {
                error[key] = true
                error.message = `${key} should not be empty`
            }

            return error
        } else {
            if (key === 'role' && !USER_ROLES.includes(data[key])) {
                error.message = `invalid user role`
            }
        }
    }

    return error
}

module.exports = {
    userCreateValidation
}