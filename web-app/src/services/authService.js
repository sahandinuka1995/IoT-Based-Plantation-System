import {apiHandler} from "./apiHandler"

export const login = async (data) => {
    const apiObject = {}
    apiObject.method = 'post'
    apiObject.endpoint = 'auth/login'
    apiObject.formUrlEncoded = true
    apiObject.body = data
    return await apiHandler(apiObject)
}