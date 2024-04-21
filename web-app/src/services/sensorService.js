import {apiHandler} from "./apiHandler"

export const getSensorData = async () => {
    const apiObject = {}
    apiObject.url = 'https://api.thingspeak.com/channels/2483610/feeds.json?results=10'
    apiObject.method = 'get'
    apiObject.loader = false
    return await apiHandler(apiObject)
}

export const getRainfallData = async () => {
    const apiObject = {}
    apiObject.url = 'http://api.openweathermap.org/data/2.5/weather?q=panadura&appid=5909942c9e25c2272bc41cb3ee379b49'
    apiObject.method = 'get'
    apiObject.loader = false
    return await apiHandler(apiObject)
}