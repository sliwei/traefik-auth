import React, { useState } from 'react'
import style from './index.module.less'
import logo from '@/assets/images/logo.svg'
import history from '@/router/history'
import { connect } from 'dva'
import md5 from 'crypto-js/md5'
import { message } from 'antd'

export interface IndexType {
  dispatch: any
}

const Index: React.FC<IndexType> = ({ dispatch }) => {
  const [user, setUser] = useState({
    mobile: '',
    password: ''
  })

  const login = (e: { keyCode: number }) => {
    if (e.keyCode === 13) {
      if (!(user.mobile && user.password)) {
        message.warn('账号密码不能为空~')
        return false
      }
      dispatch({
        type: 'common/login',
        payload: {
          ...user,
          password: md5(user.password).toString().toUpperCase()
        }
      }).then((res: { code: number; data: { token: any } }) => {
        if (res.code === 200) {
          localStorage.token = res.data.token
          localStorage.user = JSON.stringify(res.data)
          history.push('/')
        }
      })
    }
  }

  const change = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setUser((v) => ({ ...v, [name]: e.target.value }))
  }

  return (
    <>
      <div className={style.container}>
        <div className={style.top} />
        <div className={style.bottom} />
        <div className={style.center}>
          <h2>
            <img width={40} src={logo} alt="" />
            &ensp;统一认证平台SSO
          </h2>
          <input
            onChange={(e) => change(e, 'mobile')}
            type="email"
            placeholder="账号"
          />
          <input
            onChange={(e) => change(e, 'password')}
            type="password"
            placeholder="密码"
            onKeyDown={login}
          />
          <h2>&nbsp;</h2>
        </div>
      </div>
    </>
  )
}

export default connect()(Index)
