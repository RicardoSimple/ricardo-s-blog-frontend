import axios from 'axios'
import { getRefreshToken, getToken } from './userInfo'
import { Message } from 'element-ui'
import { clearAll } from './storage'

const TokenKey = "Authorization"
const RefreshTokenKey = "Authorization-refresh"
// create an axios instance
const service = axios.create({
    baseURL: '/api',
    timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent
        console.log("config:")
        console.log(config)
        // check access
        if (config.access) {
            if (getToken() != null && getToken() != "") {
                config.headers[TokenKey] = getToken()
            } else {
                // redirect 未登录
            }
        }
        // check refreshAccess only for refreshToken
        if (config.refreshAccess) {
            if (getRefreshToken() != null && getRefreshToken() != "") {
                config.headers[RefreshTokenKey] = getRefreshToken()
            }
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data
        // store.commit('SET_LOADING',false);

        // if the custom code is not 20000, it is judged as an error.
        if (res.code !== 200) {
            // alert
            Message.error(res.message)
            return Promise.reject(new Error(res.message || 'Error'))
        } else if (res.code == 312) {
            Message.error(res.message)
            clearAll();
            return Promise.reject(new Error(res.message || 'Error'))
        }
        else {
            return res
        }
    },
    error => {
        // alert
        console.log('err' + error) // for debug
        Message.error(res.message)
        return Promise.reject(error)
    }
)

export default service
