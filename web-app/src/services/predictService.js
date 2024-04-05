import {apiHandler} from "./apiHandler"

export const getPrediction = async () => {
    const apiObject = {}
    apiObject.method = 'get'
    apiObject.endpoint = 'prediction'
    return await apiHandler(apiObject)
}