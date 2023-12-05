import AsyncStorage from '@react-native-async-storage/async-storage';
import config from "../const/storage"
import apiConfig from "../service/apiConfig"
import axios from 'axios';


export const ApiCall = async (apiObject) => {
    console.log(apiObject)
    let body = {}
    const method = apiObject.method?.toLowerCase() ?? 'get'
    const headers : any = {
        'Content-Type': apiObject.urlEncoded ? 'application/x-www-form-urlencoded' : apiObject.multipart ? 'multipart/form-data' : 'application/json'
    }
    if (method === 'post' || method === 'put' || method === 'patch') {
        body = apiObject.body ?? {}
    }
    if (apiObject.authentication) {

        const access_token = await AsyncStorage.getItem(config.accessTokenKeyName);
        if (access_token) {
            headers.Authorization = `Bearer ${access_token}`
        }
    }

    if (apiObject.isBasicAuth) {
        headers.Authorization = `Basic ${config.basicAuthString}`
    }

    let url = ''
    if (!apiObject.schoolTest) {
        //url = `${apiConfig.serverUrl}/${apiConfig.basePath}/${(apiObject.state !== "renewToken" && apiObject.state !== "login") ? apiConfig.version : ""}${apiObject.endpoint}`
        url = `${apiConfig.serverUrl}/${apiObject.endpoint}`
    } else {
        url = apiObject.endpoint
    }
    console.log(url)

 // let start api call
    let result

    await axios[method](url, (method !== 'get' && method !== 'delete') ? body : {headers}, {headers})
        .then(response => {
           // $(".loadingEffect").css("display", "none")
            result = response.data
            if (result.status !== 0) {
                console.log("ok")
                //if (apiObject.toast === undefined) toast.error(result.message, {icon: true, hideProgressBar: true})
            }
        })
        .catch(async error => {
            console.log(error)
            // hide loading animation when response data received
            //$(".loadingEffect").css("display", "none")

            // when error cant detect, show this error
            if (error?.response === undefined) {
                result = {success: false, msg: "Your connection was interrupted"}

            }

            if (error?.response?.status === 401) {
                // when token expired, show this error
                if (apiObject.state === "renewToken") {
                    result = {success: false, msg: "Your session has expired. Please sign in again ..."}
                    return
                }
                if (apiObject.state === "login") {
                    result = {
                        success: false,
                        msg: error?.response?.data?.msg ?? "Invalid login details please try again!"
                    }
                    return
                }

                // when user in inactive state
                if (error?.response?.data?.message && (error.response.data.message === 'User is not active')) {
                    result = {success: false, status: 1, message: "User is not active."}
                    return
                }
               // result = await renewTokenHandler(apiObject)
            } else if (error?.response?.data) {
                // common response message
                result = {
                    success: false,
                    msg: error.response.data.message
                }
            } else {
                result = {
                    success: false,
                    msg: "Your connection was interrupted!"
                }
            }
            if (!result?.success) {
              //  if (apiObject.toast === undefined) toast.error(result.msg, {icon: true, hideProgressBar: true})
            }
        })
    return result
}

export default {ApiCall}
