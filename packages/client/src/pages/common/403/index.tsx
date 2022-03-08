import React, { useState } from 'react'
import svg_403 from '@/assets/images/403.svg'
import { Space } from 'antd'
import { Link } from 'react-router-dom'

export interface IndexType {}

const Index: React.FC<IndexType> = ({}) => {
  return (
    <>
      <div className="error-box">
        <Space direction="vertical">
          <img src={svg_403} alt="svg_403" />
          <span>
            你暂无访问权限~ <Link to="/login">重新登录</Link>
          </span>
        </Space>
      </div>
    </>
  )
}

export default Index
