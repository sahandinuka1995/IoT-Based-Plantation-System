import {apiHandler} from "./apiHandler"

export const getPrediction = async (location) => {
    const apiObject = {}
    apiObject.method = 'get'
    apiObject.endpoint = `prediction?location=${location?.value}`
    return await apiHandler(apiObject)
}