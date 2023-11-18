import React, { useState } from 'react'
import { Button, Col, Divider, Row, Space, Typography, Timeline } from 'antd'
import TolfaLocationModal from './tolfa-location-modal/tolfa-location-modal'
import moment from 'moment'
import { fetchTolfaLocationHistoryLogsData } from '../../../../../../../services/master_service'
import TolfaLocationHistoryLogs from './tolfa-location-history-logs/tolfa-location-history-logs'

const TolfaLocation = ({ tolfaLocationProps }) => {
  const { tolfa_area_name, block_name, rescue_no, location_updated_at, } = tolfaLocationProps
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOnUpdate = () => {
    setIsModalOpen(true)
  }



  return (
    <div>
      <Row gutter={[12, 12]}>
        <Col xs={24}>
          <div className='cs-dis-flex cs-jc-sb'>
            <Typography.Title level={2}>
              Tolfa Area Details
            </Typography.Title>

            <div className='cs-dis-flex cs-vt-center'>
              <Button className='cs-theme-button' onClick={handleOnUpdate}>
                Update
              </Button>
            </div>
          </div>
        </Col>

        <Col>
          <Typography.Title level={4}>
            Tolfa Area Name:
          </Typography.Title>
        </Col>
        <Col>
          <Typography.Title type='secondary' level={4}>
            {tolfa_area_name}
          </Typography.Title>
        </Col>

        <Col>
          <Typography.Title level={4}>
            Block Name:
          </Typography.Title>
        </Col>
        <Col>
          <Typography.Title type='secondary' level={4}>
            {block_name}
          </Typography.Title>
        </Col>

        <Col>
          <Typography.Title level={4}>
            Updated At:
          </Typography.Title>
        </Col>
        <Col>
          <Typography.Title type='secondary' level={4}>
            {moment(location_updated_at).format('DD/MM/YYYY HH:mm')}
          </Typography.Title>
        </Col>
      </Row>

      <Divider className='cs-theme-divider' />

      <TolfaLocationHistoryLogs rescue_no={rescue_no} />

      <TolfaLocationModal
        rescue_no={rescue_no}
        isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  )
}

export default TolfaLocation