const {createUserError} = require("../const/error")

const userCreateValidation = (data) => {
    const error = {...createUserError}

    for (const key in data) {
        if (data[key] === "") {
            error[key] = true
            error.message = `${key} should not be empty`
            return error
        }
    }

    return error
}

module.exports = {
    userCreateValidation
}