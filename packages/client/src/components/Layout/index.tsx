import React, { useState } from 'react'
import { Avatar, Badge, Menu, Dropdown, Tabs, Popover, List } from 'antd'
// @ts-ignore
import ProLayout from '@ant-design/pro-layout'
import { complexMenu } from '@/router/conf'
import {
  ReloadOutlined,
  UserOutlined,
  BellOutlined,
  SearchOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  LoginOutlined
} from '@ant-design/icons'
import { red } from '@ant-design/colors'
import style from './index.module.less'
import Logo from '@/assets/images/logo.svg'
import { Link, useLocation } from 'react-router-dom'
import history from '@/router/history'

const { TabPane } = Tabs

const space = {
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  margin: '0 12px',
  cursor: 'pointer'
}

const menu = (out: any) => (
  <Menu>
    <Menu.Item
      onClick={() => {
        window.location.reload()
      }}
      icon={<ReloadOutlined />}>
      重置引导
    </Menu.Item>
    <Menu.Item icon={<UserOutlined />}>个人中心</Menu.Item>
    <Menu.Item icon={<SettingOutlined />}>个人设置</Menu.Item>
    <Menu.Divider />
    <Menu.Item onClick={out} icon={<LoginOutlined />}>
      退出登录
    </Menu.Item>
  </Menu>
)
const data = [
  {
    title: '新订单1'
  },
  {
    title: '新订单2'
  },
  {
    title: '新订单3'
  },
  {
    title: '新订单4'
  }
]

// const content = (
//   <Descriptions size="small" column={2}>
//     <Descriptions.Item label="创建人">张三</Descriptions.Item>
//     <Descriptions.Item label="联系方式">
//       <a href="/">421421</a>
//     </Descriptions.Item>
//     <Descriptions.Item label="创建时间">2017-01-10</Descriptions.Item>
//     <Descriptions.Item label="更新时间">2017-10-10</Descriptions.Item>
//     <Descriptions.Item label="备注">
//       中国浙江省杭州市西湖区古翠路
//     </Descriptions.Item>
//   </Descriptions>
// )

const note = (
  <Tabs
    className="app_tabs"
    style={{ width: 300 }}
    defaultActiveKey="1"
    centered>
    <TabPane
      tab={
        <>
          通知(<span style={{ color: red.primary }}>4</span>)
        </>
      }
      key="1">
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://picsum.photos/200" />}
              title={<a href="https://ant.design">{item.title}</a>}
              description="这是一条消息这是一条消息这是一条消息这是一条消息这是一条消息"
            />
          </List.Item>
        )}
      />
    </TabPane>
    <TabPane
      tab={
        <>
          消息(<span style={{ color: red.primary }}>14</span>)
        </>
      }
      key="2">
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://picsum.photos/200" />}
              title={<a href="https://ant.design">{item.title}</a>}
              description="这是一条消息"
            />
          </List.Item>
        )}
      />
    </TabPane>
    <TabPane
      tab={
        <>
          代办(<span style={{ color: red.primary }}>14</span>)
        </>
      }
      key="3">
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://picsum.photos/200" />}
              title={<a href="https://ant.design">{item.title}</a>}
              description="这是一条消息"
            />
          </List.Item>
        )}
      />
    </TabPane>
  </Tabs>
)

export interface IndexType {}

const Index: React.FC<IndexType> = ({ children }) => {
  const location = useLocation()
  const [pathname, setPathname] = useState(location.pathname)
  const [user] = useState(JSON.parse(localStorage.user || '{}'))

  const out = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    history.push('/login')
  }

  // @ts-ignore
  return (
    <>
      <div
        style={{
          height: '100vh',
          overflow: 'auto'
        }}
        className={style.root}>
        <ProLayout
          logo={<img width={32} src={Logo} alt="" />}
          title="统一认证平台SSO"
          location={{
            pathname
          }}
          route={{
            routes: complexMenu
          }}
          // breadcrumbRender={(route: any) => {
          //   // console.log(route)
          //   // route
          //   // setBread([{}])
          //   if (JSON.stringify(route) !== JSON.stringify(bread)) {
          //     // setBread(route)
          //   }
          // }}
          menuDataRender={(e: any) => e}
          menuItemRender={(menuItemProps: any, defaultDom: any) => (
            <Link to={menuItemProps.path}>{defaultDom}</Link>
          )}
          onPageChange={() => {
            // console.log(e)
          }}
          menuProps={{
            onClick: (e: { key: React.SetStateAction<string> }) => {
              setPathname(e.key)
            }
          }}
          disableContentMargin
          // @ts-ignore
          settings={{
            theme: 'dark'
          }}
          navTheme="dark"
          layout="top"
          rightContentRender={() => (
            <div
              style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
              <div style={space}>
                <SearchOutlined style={{ fontSize: 20 }} />
              </div>
              <div style={space}>
                <QuestionCircleOutlined style={{ fontSize: 20 }} />
              </div>
              <Popover
                placement="bottomRight"
                arrowPointAtCenter
                trigger="click"
                content={() => note}>
                <div style={space}>
                  <Badge dot>
                    <BellOutlined style={{ fontSize: 20 }} />
                  </Badge>
                </div>
              </Popover>
              <Dropdown overlay={user.mobile ? menu(out) : <></>}>
                <div style={space} onClick={user.mobile ? () => {} : out}>
                  <Avatar size="small" src={user.head} />
                  <span style={{ marginLeft: 5, color: '#FFF' }}>
                    {user.name || '未登录'}
                  </span>
                </div>
              </Dropdown>
            </div>
          )}>
          {children}
        </ProLayout>
      </div>
    </>
  )
}

export default Index
