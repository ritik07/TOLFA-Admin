import React from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import "./floatingBack.css"

const FloatingBack = () => {
  const navigate = useNavigate()
  const handleBackBtn = () => {
    navigate(-1)
  }
  return (
    <div className='cs-back-button cs-center' onClick={handleBackBtn}>
      <ArrowLeftOutlined />
    </div>
  )
}

export default FloatingBack