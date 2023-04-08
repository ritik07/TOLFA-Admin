import { Col, Form, Input, InputNumber, Row } from 'antd'
import React from 'react'

const rescuerDetail = ({ form }) => {
  return (
    <div>
      <h3>Rescuer Details</h3>
      <div className='divider' />

      <Row gutter={[10, 10]}>
        <Col span={8}>
          <Form.Item name="name" label="Name">
            <Input placeholder='Name of rescuer' />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item name="contact_no" label="Contact no">
            <InputNumber className='cs-w-100' placeholder='Contact no' />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item name="alt_contact_no" label="Alternative contact no">
            <InputNumber className='cs-w-100' placeholder='Alternative contact no' />
          </Form.Item>
        </Col>
      </Row>

    </div>
  )
}

export default rescuerDetail