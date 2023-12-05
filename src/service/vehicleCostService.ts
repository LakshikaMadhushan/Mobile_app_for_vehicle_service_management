import ApiService from "./apiHandler";

export async function getItem() {
    const apiObject : any = {}
    apiObject.method = 'GET'
    //  apiObject.authentication = false
    // apiObject.isBasicAuth = true
    apiObject.endpoint = 'v1/items'
    //apiObject.state = "login"
    return await ApiService.ApiCall(apiObject)
}

export async function MechanicServiceGetAll() {
    const apiObject : any = {}
    apiObject.method = 'GET'
    //  apiObject.authentication = false
    // apiObject.isBasicAuth = true
    apiObject.endpoint = 'v1/mechanic-service'
    //apiObject.state = "login"
    return await ApiService.ApiCall(apiObject)
}
