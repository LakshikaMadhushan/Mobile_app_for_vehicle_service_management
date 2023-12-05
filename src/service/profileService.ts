import ApiService from "./apiHandler";

export async function getProfile(customerId) {
    const apiObject : any = {}
    apiObject.method = 'GET'
    //  apiObject.authentication = false
    // apiObject.isBasicAuth = true
    apiObject.endpoint = `v1/customer/${customerId}`
    //apiObject.state = "login"
    return await ApiService.ApiCall(apiObject)
}

export async function updateProfile(data) {
    const apiObject : any = {}
    apiObject.method = 'PUT'
    //  apiObject.authentication = false
    // apiObject.isBasicAuth = true
    apiObject.endpoint = 'v1/customer'
    //apiObject.state = "login"
    apiObject.body = data
    return await ApiService.ApiCall(apiObject)
}


