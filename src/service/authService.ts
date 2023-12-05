
// @ts-ignore
import ApiService from './apiHandler'

export async function loginUser(userCredentials) {
    const apiObject : any = {}
    apiObject.method = 'POST'
    apiObject.authentication = false
   apiObject.isBasicAuth = true
   apiObject.urlEncoded = true
    apiObject.endpoint = 'oauth/token'
    apiObject.body = userCredentials
    //apiObject.state = "login"
    return await ApiService.ApiCall(apiObject)
}
export async function getItem() {
    const apiObject : any = {}
    apiObject.method = 'GET'
   //  apiObject.authentication = false
   // apiObject.isBasicAuth = true
    apiObject.endpoint = 'v1/items'
    //apiObject.state = "login"
    return await ApiService.ApiCall(apiObject)
}
