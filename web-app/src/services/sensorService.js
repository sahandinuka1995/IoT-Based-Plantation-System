import {apiHandler} from "./apiHandler"

export const getSensorData = async () => {
    const apiObject = {}
    apiObject.url = 'https://api.thingspeak.com/channels/2483610/feeds.json?results=10'
    apiObject.method = 'get'
    apiObject.loader = false
    return await apiHandler(apiObject)
}