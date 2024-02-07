import axios from "axios"
import {SERVER_PATH} from "../configs/serverConfig"
import qs from "qs"
import toast from "react-hot-toast"

export const apiHandler = async (apiObject) => {
    let body = {}
    if (apiObject.formUrlEncoded) {
        body = qs.stringify(apiObject.body)
    }

    let result = null

    await axios[apiObject.method](`${SERVER_PATH.SERVER_URL}${SERVER_PATH.VERSION}/${apiObject.endpoint}`, body)
        .then(response => {
            // handle success
            result = {
                status: response.status, data: response.data.data, message: response.data.message
            }
        })
        .catch(error => {
            // handle error
            let message = "Something went wrong"
            if (error?.request?.response) message = JSON.parse(error.request.response)?.message

            result = {
                status: error.request.status, message
            }

            toast.error(message)
        })
        .finally(() => {
            // always executed
        })

    return result
}