import React, {useEffect, useState} from 'react'
import style from './index.module.less'
import logo from '@/assets/images/logo.svg'
import history from '@/router/history'
import {connect} from "dva";
import {Button} from "antd";

export interface IndexType {
  dispatch: Function
  loading: boolean
}

const Index: React.FC<IndexType> = ({dispatch, loading}: IndexType) => {
  const [state, setState] = useState()

  useEffect(() => {
    getUserinfo()
  }, [])

  // 信息
  const getUserinfo = () => {
    dispatch({
      type: 'common/userinfo'
    }).then((res: any) => {
      setState(res.data)
    })
  }

  // 登出
  const logout = () => {
    dispatch({
      type: 'common/logout'
    }).then((res: any) => {
      if (res.code === 200) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        history.push('/login')
      }
    })
  }

  return (
    <>
      <div className={style.container}>
        <h2>
          <img width={40} src={logo} alt="" />
          &ensp;welcome~
        </h2>
        {loading ? 'loading ~ ': 'success ~'}
        {JSON.stringify(state)}
        <Button onClick={getUserinfo}>更新~</Button>
        <Button onClick={logout}>登出</Button>
      </div>
    </>
  )
}

export default connect(
  ({ loading }: { loading: { effects: Record<string, boolean> } }) => ({
    loading: loading.effects['common/userinfo']
  })
)(Index)
