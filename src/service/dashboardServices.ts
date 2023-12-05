import ApiService from "./apiHandler";

export async function getDashBoardStatus(data) {
    const apiObject : any = {}
    apiObject.method = 'POST'
    apiObject.authentication = true
    apiObject.endpoint = 'v1/report/customer/dashboard'
    apiObject.body = data
    //apiObject.state = "login"
    return await ApiService.ApiCall(apiObject)
}
