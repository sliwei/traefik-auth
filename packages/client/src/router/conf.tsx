import React from 'react'
import {
  DashboardOutlined,
  ConsoleSqlOutlined,
  UngroupOutlined,
  SettingOutlined,
  PicLeftOutlined,
  ExclamationCircleFilled
} from '@ant-design/icons'

import Login from '@/pages/common/login'
import Account from '@/pages/common/account'
import Common403 from '@/pages/common/403'
import Common404 from '@/pages/common/404'
import Common500 from '@/pages/common/500'

export const complexMenu = [
  // {
  //   path: '/',
  //   name: '监控看板',
  //   icon: <DashboardOutlined />,
  //   component: <Dashboard />
  // },
  // {
  //   path: '/data-log',
  //   name: '数据查询',
  //   icon: <ConsoleSqlOutlined />,
  //   component: <Logs />
  // },
  // {
  //   path: '/devops',
  //   name: 'DevOps',
  //   icon: <UngroupOutlined />,
  //   component: <DevOps />
  // }
]

/**
 * 路由配置
 */
export default [
  {
    path: '/login',
    // component: 'pages/common/login',
    component: <Login />
  },
  {
    path: '/',
    // component: 'pages/common/login',
    component: <Account />
  },
  {
    path: '/403',
    // component: 'pages/common/403',
    component: <Common403 />
  },
  {
    path: '/404',
    // component: 'pages/common/404',
    component: <Common404 />
  },
  {
    path: '/500',
    // component: 'pages/common/500',
    component: <Common500 />
  },
  // {
  //   path: '/',
  //   component: 'Layout',
  //   children: complexMenu
  // }
]
