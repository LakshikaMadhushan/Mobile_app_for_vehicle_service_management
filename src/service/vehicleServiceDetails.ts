import ApiService from "./apiHandler";

export async function serviceDetailsGetByServiceId(serviceId : any) {
    const apiObject : any = {}
    apiObject.method = 'POST'
    //  apiObject.authentication = false
    // apiObject.isBasicAuth = true
    apiObject.endpoint = 'v1/service-details/filter'
    apiObject.body = { serviceId : serviceId }
    //apiObject.state = "login"
    return await ApiService.ApiCall(apiObject)
}
