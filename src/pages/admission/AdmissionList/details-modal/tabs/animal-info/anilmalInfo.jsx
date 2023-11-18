import { Col, Divider, Image, Row, Space, Tag, Typography } from 'antd'
import React from 'react'
import { BASE_URL_ASSET } from '../../../../../../constants/server'
import moment from 'moment'
import { ANIMAL_COLOR } from '../../details-modal.constant'
import Profile from './components/profile'
import RescueLocationDetail from './components/rescue-location-detail'
import RescueInfo from './components/rescue-info'

const AnilmalInfo = ({ rowData }) => {

  return (
    <div>
      <Profile profileProps={rowData} />

      <Divider className='cs-theme-divider' />

      <RescueLocationDetail rescueLocationProps={rowData} />

      <Divider className='cs-theme-divider' />

      <RescueInfo rescueInfoProps={rowData} />

      <Divider className='cs-theme-divider' />

    </div >
  )
}

export default AnilmalInfo