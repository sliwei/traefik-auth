import { Model, Effect } from 'dva'
// import { Reducer } from 'redux'

import { login, userinfo, logout } from '@/apis/common'

interface CommonModel extends Model {
  namespace: string
  state: any
  effects: {
    login: Effect
    userinfo: Effect
    logout: Effect
  }
  reducers: {}
}

export default <CommonModel>{
  namespace: 'common',
  state: {},
  effects: {
    *login({ payload }, { call }) {
      try {
        return yield call(login, payload)
      } catch (e) {
        return e
      }
    },
    *userinfo({ payload }, { call }) {
      try {
        return yield call(userinfo, payload)
      } catch (e) {
        return e
      }
    },
    *logout({ payload }, { call }) {
      try {
        return yield call(logout, payload)
      } catch (e) {
        return e
      }
    }
  },
  reducers: {}
}
