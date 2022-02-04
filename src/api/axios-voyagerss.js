import Vue from 'vue'
import axios from 'axios' 
import store from '@/store/index'
import router from "@/router";

const APIURL = process.env.VUE_APP_API
Vue.prototype.$APIURL = APIURL

// create an axios instance
const service = axios.create({
  baseURL: Vue.prototype.$APIURL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000, // 10초
  headers: {
    post: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json;charset=utf-8'
    }
  },
})

// request interceptor
service.interceptors.request.use(
  config => {
    let token = store.getters.token ? store.getters.token : window.sessionStorage.getItem('accessToken')
    let refreshToken = store.getters.refreshToken ? store.getters.refreshToken : window.sessionStorage.getItem('refreshToken')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      config.headers.refreshToken = `${refreshToken}`
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
  /*** If you want to get http information such as headers or status * Please return  response => response */
  response => {
    if (response.status !== 200) {
      Message({message: response.statusText || 'Error', type: 'error', duration: 5 * 1000})

      if (response.status === 405) {        // to re-login
        // MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        //   confirmButtonText: 'Re-Login',
        //   cancelButtonText: 'Cancel',
        //   type: 'warning'
        // }).then(() => {
          store.dispatch('user/resetToken')
            .then(() => {
              location.reload()
            })
        // })
      }
      return Promise.reject(new Error(response.statusText || 'Error'))
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)





const BadRequest = 400
const Unauthorized = 401
const Forbidden = 403
const NotFound = 404

export const request = (method, url, data) => {
  return service({
    method,
    url: url,
    data
  })
    .then(result => result)
    .catch(err => errLogic(err));
}
export const requestFile = (method, url, data) => {
  return service({
    method,
    url: url,
    data,
    processData: false,
    contentType: false
  })
    .then(result => result)
    .catch(err => errLogic(err));
}

function errLogic(err) {
  if (err.response != null && err.response.status === Unauthorized) {
    store.dispatch('logout')
      .then(() => {
        apiError.onUnauthorized(err)
      })
      .finally(() => {
        router.replace('/')
        router.go();
      })
  } else if (err.response.status == Forbidden) return apiError.onForbidden(err)
  else if (err.response.status == BadRequest) return apiError.onBadRequest(err)
  else if (err.response.status == NotFound) return apiError.onNotFound(err)
  return Promise.reject(err)
}

const apiError = {
  // onUnauthorized(error) {Message({message: `\n 인증되지 않았습니다. \n   ` + error.message, type: 'error', duration: 5 * 1000})},
  // onForbidden(error) {Message({message: `\n 권한이 없습니다. \n   ` + error.message, type: 'error', duration: 5 * 1000})},
  // onBadRequest(error) {Message({message: `\n 잘못된요청입니다. \n   ` + error.message, type: 'error', duration: 5 * 1000})},
  // onNotFound(error) {Message({message: `\n 잘못된 접근입니다. \n   ` + error.message, type: 'error', duration: 5 * 1000})}

  onUnauthorized(error) { console.log(`\n 인증되지 않았습니다. \n   `) },
  onForbidden(error) { console.log(`\n 권한이 없습니다. \n   `) },
  onBadRequest(error) { console.log(`\n 잘못된요청입니다. \n   `) },
  onNotFound(error) { console.log(`\n 잘못된 접근입니다. \n   `) },
}

export const methods = {
  post: (url, data) => {
    return service.post(url, data)
      .then(result => result)
      .catch(err =>  errLogic(err))
  },
  get: (url, params) => {
    return service.get(url, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset = utf-8'
      }, params: params
    })
      .then(result => result)
      .catch(err => errLogic(err));
  },
  put: (url, data) => {
    return service.put(url, data)
      .then(result => result)
      .catch(err => errLogic(err));
  }
}
export default service 

Vue.prototype.$request = request
Vue.prototype.$requestFile = requestFile
Vue.prototype.$post = methods.post
Vue.prototype.$get = methods.get
Vue.prototype.$put = methods.put
