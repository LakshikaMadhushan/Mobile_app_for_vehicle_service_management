import ApiService from "./apiHandler";

export async function serviceGetFilterByUserId(data : any) {
    const apiObject : any = {}
    apiObject.method = 'POST'
     apiObject.authentication = true
    // apiObject.isBasicAuth = true
    apiObject.endpoint = 'v1/service/filter'
    apiObject.body = data
    //apiObject.state = "login"
    return await ApiService.ApiCall(apiObject)
}
