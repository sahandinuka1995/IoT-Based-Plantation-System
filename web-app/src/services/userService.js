import {apiHandler} from "./apiHandler"

export const getAllUsers = async (data) => {
    const apiObject = {}
    apiObject.method = 'get'
    apiObject.endpoint = 'user/get-all'
    return await apiHandler(apiObject)
}

export const addNewUser = async (data) => {
    const apiObject = {}
    apiObject.method = 'post'
    apiObject.endpoint = 'user/create'
    apiObject.body = data
    apiObject.successToast = true
    return await apiHandler(apiObject)
}

export const updateUser = async (data, id) => {
    const apiObject = {}
    apiObject.method = 'put'
    apiObject.endpoint = `user/update/${id}`
    apiObject.body = data
    apiObject.successToast = true
    return await apiHandler(apiObject)
}

export const deleteUser = async (id) => {
    const apiObject = {}
    apiObject.method = 'delete'
    apiObject.endpoint = `user/delete/${id}`
    return await apiHandler(apiObject)
}