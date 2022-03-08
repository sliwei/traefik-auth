import React from 'react'
import style from './index.module.less'
import { LoadingOutlined } from '@ant-design/icons'

export interface GlobalLoadingType {}

const GlobalLoading: React.FC<GlobalLoadingType> = () => {
  return (
    <>
      <div className={style.loading}>
        <LoadingOutlined />
        <p>加载中...</p>
      </div>
    </>
  )
}

export default GlobalLoading
