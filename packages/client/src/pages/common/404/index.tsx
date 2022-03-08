import React, { useState } from 'react'
import svg_404 from '@/assets/images/404.svg'
import { Space } from 'antd'

export interface IndexType {}

const Index: React.FC<IndexType> = ({}) => {
  return (
    <>
      <div className="error-box">
        <Space direction="vertical">
          <img src={svg_404} alt="svg_404" />
          <span>页面找不到了~</span>
        </Space>
      </div>
    </>
  )
}

export default Index
