import React, { useState } from 'react'
import { Row, Col, Form, Input, Select } from 'antd'

const BasicInfo = () => {
  const [rescueNo, setRescueNo] = useState('LAR0001')

  return (
    <div>
      <h3>Rescue Info</h3>
      <div className='divider' />
      <Row gutter={[10, 10]}>
        <Col xl={12}>
          <Form.Item label="Type of rescue" name='type_of_rescue'>
            <Select
              placeholder="Type of rescue"
              style={{ width: "100%" }}
              options={[
                {
                  value: '1',
                  label: 'Small Animal',
                },
                {
                  value: '2',
                  label: 'Large Animal',
                }
              ]}
            />
          </Form.Item>
        </Col>

        <Col xl={12}>
          <Form.Item label="Species" name='species'>
            <Select
              placeholder="Species"
              style={{ width: "100%" }}
              options={[
                {
                  value: '1',
                  label: 'Dog',
                },
                {
                  value: '2',
                  label: 'Puppy',
                },
                {
                  value: '3',
                  label: 'Cat',
                },
                {
                  value: '4',
                  label: 'Kitten',
                },
              ]}
            />
          </Form.Item>
        </Col>

        <Col xl={12}>
          <Form.Item label="Rescue Number" name="rescue_number">
            <Input placeholder='Rescue Number' value={rescueNo} disabled />
          </Form.Item>
        </Col>

        <Col xl={12}>
          <Form.Item label="Status" name="status">
            <Select
              placeholder="Status"
              style={{ width: "100%" }}
              options={[
                {
                  value: '1',
                  label: 'Admitted',
                },
                {
                  value: '2',
                  label: 'Admitted - Under Treatment',
                },
                {
                  value: '3',
                  label: 'Released',
                },
                {
                  value: '4',
                  label: 'Died',
                },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>

    </div>
  )
}

export default BasicInfo