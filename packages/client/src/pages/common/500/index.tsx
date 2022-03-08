import React, { useState } from 'react'
import svg_500 from '@/assets/images/500.svg'
import { Space } from 'antd'

export interface IndexType {}

const Index: React.FC<IndexType> = ({}) => {
  return (
    <>
      <div className="error-box">
        <Space direction="vertical">
          <img src={svg_500} alt="svg_500" />
          <span>服务出错</span>
        </Space>
      </div>
    </>
  )
}

export default Index
