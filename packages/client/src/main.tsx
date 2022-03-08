import React from 'react'
import './index.css'
import App from './App'
import 'antd/dist/antd.less'
import '@/assets/css/global.css'
import dva from 'dva'
//@ts-ignore
let test = dva.default || dva
// @ts-ignore
import createLoading from 'dva-loading'
import store from '@/store'
import { createBrowserHistory as createHistory } from 'history'

// 创建应用
const app = test({
  history: createHistory()
})
app.use(createLoading())
// 注册 Model
store.forEach((v) => app.model(v))

// 注册视图
app.router(() => <App />)
// 启动应用
app.start('#root')
