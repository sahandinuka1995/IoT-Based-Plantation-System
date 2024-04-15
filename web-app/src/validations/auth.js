import {loginError} from '../consts/error'

export const loginValidation = (data) => {
    const error = {...loginError}

    for (const key in data) {
        if (data[key]?.trim() === "") {
            error[key] = true
        }
    }

    return error
}