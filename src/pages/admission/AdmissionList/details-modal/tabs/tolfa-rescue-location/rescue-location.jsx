import React from 'react'
import TolfaLocation from './components/tolfa-location'
import { Divider } from 'antd'

const TolfaRescueLocation = ({ rowData }) => {
  return (
    <div>

      <TolfaLocation tolfaLocationProps={rowData} />
      
      <Divider className='cs-theme-divider' />
    </div>
  )
}

export default TolfaRescueLocation