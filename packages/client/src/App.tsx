import React, { useEffect, useLayoutEffect } from 'react'
import RootRouter from './router'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

function App() {
  useEffect(() => {
    const indexLoading: any = document.querySelector('.indexLoading')
    indexLoading.style.opacity = 0
    setTimeout(() => {
      indexLoading.style.display = 'none'
    }, 0)
  }, [])
  return (
    <ConfigProvider locale={zhCN}>
      <RootRouter />
    </ConfigProvider>
  )
}

export default App
