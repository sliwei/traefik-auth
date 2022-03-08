import React, { useEffect, useMemo } from 'react'
import NProgress from 'nprogress'
import '@/assets/css/nprogress.global.css'
import Err403 from '@/pages/common/403'
import { useHistory } from 'react-router-dom'
import { connect } from 'dva'

const DO_NOT_CHECK: string[] = [
  '/403',
  '/404',
  '/500',
  '/login',
  '/record',
  '/',
  '/stu'
]

export interface GuardType {
  component: any
  path: string
}

/**
 * 路由守卫
 * @param props
 * @returns {*}
 * 参考：https://juejin.im/post/5c31aede6fb9a04a0d570107
 */
// eslint-disable-next-line react/display-name
const Index: React.FC<GuardType> = ({ component, path, location }: any) => {
  // const history = useHistory()
  // const { component, path } = props
  // const AsyncPage = loadable(
  //   (load: { component: any }) => import(`../${load.component}`),
  // )
  // console.log('路由守卫:>>', path)
  // const history = useHistory()

  useEffect(() => {
    NProgress.start()
    const timer = setTimeout(() => NProgress.done(), 200)
    return () => {
      NProgress.done()
      clearTimeout(timer)
    }
  }, [])

  const check = useMemo(() => {
    let su = true
    // 检查权限
    // if (!DO_NOT_CHECK.includes(path)) {
    //   if (!(localStorage.teacherInfo || teacherInfo.state)) {
    //     // message.error('登录失效，请重新登录~')
    //     history.push('/login')
    //     su = false
    //   }
    // }
    //
    // if (path === '/classroom') {
    //   if (
    //     !(
    //       Object.keys(timeTable.classInfo.data).length ||
    //       getLocalInfo('classInfo').state
    //     )
    //   ) {
    //     history.push('/')
    //   }
    // }
    console.log(path, su, location)
    return su
  }, [path])

  return (
    <div className={'class-layout-core'}>{check ? component : <Err403 />}</div>
  )
}

export default connect()(Index)
