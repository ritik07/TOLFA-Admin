import { Col, Row, Typography } from 'antd'
import React from 'react'

const RescueLocationDetail = ({ rescueLocationProps }) => {

  const { state_name, city_name, area_name, rescue_address,
    condition_value, animal_status_name, status_updated_at } = rescueLocationProps

  return (
    <div>
      <Row gutter={[10, 10]}>
        <Col xs={24}>
          <Typography.Title level={2}>
            Rescue from
          </Typography.Title>
        </Col>

        <Col>
          <Typography.Title level={4}>
            State Name:
          </Typography.Title>
        </Col>
        <Col>
          <Typography.Title type='secondary' level={4}>
            {state_name}
          </Typography.Title>
        </Col>

        <Col>
          <Typography.Title level={4}>
            City Name:
          </Typography.Title>
        </Col>
        <Col>
          <Typography.Title type='secondary' level={4}>
            {city_name}
          </Typography.Title>
        </Col>

        <Col>
          <Typography.Title level={4}>
            Area Name:
          </Typography.Title>
        </Col>
        <Col>
          <Typography.Title type='secondary' level={4}>
            {area_name}
          </Typography.Title>
        </Col>
      </Row>

      <Row gutter={[10, 10]}>
        <Col>
          <Typography.Title level={4}>
            Rescue Address:
          </Typography.Title>
        </Col>
        <Col>
          <Typography.Title type='secondary' level={4}>
            {rescue_address}
          </Typography.Title>
        </Col>
      </Row>
    </div>
  )
}

export default RescueLocationDetail