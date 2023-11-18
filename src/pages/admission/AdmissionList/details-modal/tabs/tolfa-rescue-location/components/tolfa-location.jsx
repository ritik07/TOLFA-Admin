import { Col, Row, Typography } from 'antd'
import React from 'react'

const TolfaLocation = ({ tolfaLocationProps }) => {

  const { tolfa_area_name, block_name } = tolfaLocationProps

  return (
    <div>
      <Row gutter={[12, 12]}>
        <Col xs={24}>
          <Typography.Title level={2}>
            Tolfa Area Details
          </Typography.Title>
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
      </Row>
    </div>
  )
}

export default TolfaLocation