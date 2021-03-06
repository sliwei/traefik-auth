import axios from 'axios'
import { message } from 'antd'
import history from '../router/history'

const instance = axios.create({
  //创建axios实例，在这里可以设置请求的默认配置
  timeout: 10000 // 设置超时时间30s
})
// 文档中的统一设置post请求头。下面会说到post请求的几种'Content-Type'
instance.defaults.headers.post['Content-Type'] = 'application/json'

let httpCode = {
  //这里我简单列出一些常见的http状态码信息，可以自己去调整配置
  400: '请求参数错误',
  401: '权限不足, 请重新登录',
  403: '服务器拒绝本次访问',
  404: '请求资源未找到',
  500: '内部服务器错误',
  501: '服务器不支持该请求中使用的方法',
  502: '网关错误',
  504: '网关超时'
}

const ignoreTokenUrl: string[] = [
]

const retErrorRes: string[] = [
]

/** 添加请求拦截器 **/
instance.interceptors.request.use(
  (config) => {
    const { url = '' } = config
    // if (!ignoreTokenUrl.includes(url.split('?')[0])) {
    config.headers['Authorization'] = localStorage.getItem('token') || ''
    // }
    // hide = message.loading({content: 'Loading...', duration: 0});
    // 在这里：可以根据业务需求可以在发送请求之前做些什么:例如我这个是导出文件的接口，因为返回的是二进制流，所以需要设置请求响应类型为blob，就可以在此处设置。
    // if (config.url.includes('pur/contract/export')) {
    //   config.headers['responseType'] = 'blob'
    // }
    // 我这里是文件上传，发送的是二进制流，所以需要设置请求头的'Content-Type'
    // if (config.url.includes('pur/contract/upload')) {
    //   config.headers['Content-Type'] = 'multipart/form-data'
    // }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

/** 添加响应拦截器  **/
// @ts-ignore
instance.interceptors.response.use(
  (response) => {
    // hide()
    const config: any = response.config
    // console.log(response)
    if (
      response.data.code === 200 ||
      response.data.status === 200 ||
      retErrorRes.includes(config.url.split('?')[0])
    ) {
      // 响应结果里的statusText: ok是我与后台的约定，大家可以根据实际情况去做对应的判断
      return Promise.resolve(response.data)
    } else if (
      response.data.code === 401 ||
      response.data.code === 403 ||
      response.data.status === 401 ||
      response.data.status === 403
    ) {
      console.log('响应超时', history)

      //针对框架跳转到登录页面
      const msg = response?.data?.msg || '响应超时'
      // message.error(msg)
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      history.replace('/login')
      // window.location.href = '/login'
      return Promise.reject(msg)
    } else {
      const msg = response?.data?.msg || response?.data?.message
      msg && message.error(msg)
      return Promise.reject(response?.data)
    }
  },
  (error) => {
    console.log(error)
    // hide()
    if (error.response) {
      // 根据请求失败的http状态码去给用户相应的提示
      if (error.response?.status === 401 || error.response?.status === 403) {
        // token或者登录失效情况下跳转到登录页面，根据实际情况，在这里可以根据不同的响应错误结果，做对应的事。这里我以401判断为例
        //针对框架跳转到登录页面
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        history.replace('/login')
        // window.location.href = '/#/login'
      } else {
        message.error(error.response.data.message)
      }
      return Promise.reject(error)
    } else {
      let tips =
        error.response?.status in httpCode
          ? // @ts-ignore
            httpCode[error.response?.status]
          : error.response?.data?.message
      message.error(tips || '请求超时, 请刷新重试')
      return Promise.resolve({
        data: null,
        msg: tips || '请求超时, 请刷新重试',
        status: 1
      })
    }
  }
)

/* 统一封装get请求 */
export const get = (url: any, params?: any, config?: any) => {
  return new Promise((resolve, reject) => {
    instance({
      method: 'get',
      url,
      params,
      ...config
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/* 统一封装post请求  */
export const post = (url: any, data?: any, config?: any) => {
  return new Promise((resolve, reject) => {
    instance({
      method: 'post',
      url,
      data,
      ...config
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default instance
