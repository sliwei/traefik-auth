import { request } from '@/utils'

export interface LoginType {
  mobile: string
  password?: string
}

/**
 * 登录
 * @param data
 */
export async function login(data: LoginType) {
  return request('/server/api/login', {
    method: 'POST',
    data
  })
}

/**
 * userinfo
 * @param data
 */
export async function userinfo() {
  return request('/server/api/userinfo', {
    method: 'get'
  })
}

/**
 * logout
 * @param data
 */
export async function logout() {
  return request('/server/api/logout', {
    method: 'post'
  })
}
