import React, { useState } from 'react'
import { Row, Col, Form, Divider, Input, Space, Button, Select, Radio } from 'antd'
import { SEX } from '../../../constants/main'

const AnimalInfo = ({ form }) => {
  return (
    <div>
      <h3>Animal Info</h3>
      <div className='divider' />
      <Row gutter={[10, 10]}>
        <Col xl={8}>
          <Form.Item label='Animal name' name='animal_name'>
            <Input placeholder='Animal name' />
          </Form.Item>
        </Col>

        <Col xl={8}>
          <Form.Item label='Sex' name='animal_sex'>
            <Select
              placeholder="Sex"
              style={{ width: "100%" }}
              options={
                SEX.map((item, index) => {
                  return {
                    value: item.value,
                    label: item.label,
                  }
                })
              }
            />
          </Form.Item>
        </Col>

        <Col xl={8}>
          <Form.Item label='Age' name='age'>
            <Input type='number' placeholder='Age' />
          </Form.Item>
        </Col>
      </Row>

    </div>
  )
}

export default AnimalInfo