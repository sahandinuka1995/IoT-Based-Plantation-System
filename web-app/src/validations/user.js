import {userFormError} from '../consts/error'
import toast from "react-hot-toast"

export const userFormValidation = (data, selectedRow) => {
    const error = {...userFormError}

    for (const key in data) {
        if (key !== 'role' && data[key]?.trim() === "") {
            if (key === 'password' || key === 'confirmPassword') {
                if (selectedRow === null) {
                    error[key] = true
                } else {
                    if (data.password?.trim() !== "" && data.confirmPassword?.trim() === "") {
                        error.confirmPassword = true
                        toast.error('Password does not match')
                    }
                }
            } else {
                error[key] = true
            }
        } else if (key === 'role' && data[key] === null) {
            error[key] = true
        } else if (key === 'confirmPassword') {
            if (data.password !== data.confirmPassword) {
                error.confirmPassword = true
                toast.error('Password does not match')
            }
        }
    }

    return error
}