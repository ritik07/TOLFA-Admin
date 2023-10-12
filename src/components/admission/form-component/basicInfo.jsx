import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Input, Select } from 'antd'

const BasicInfo = ({ rescueTypeData, speciesType, statusType, rescueNumber, form }) => {
  const [rescueType, setRescueType] = useState(false)
  const [filterSpeciesType, setFilterSpeciesType] = useState([])


  useEffect(() => {
    form.setFieldsValue({ rescue_number: rescueNumber + 1 })
  }, [])

  useEffect(() => {
    if (rescueType) {
      setFilterSpeciesType(speciesType.filter((x) => x.rescue_type_id == rescueType))
      form.setFieldsValue({ species_id: undefined })
    }
  }, [rescueType])
  
  return (
    <div>
      <h3>Rescue Info</h3>
      <div className='divider' />
      <Row gutter={[10, 10]}>
        <Col xl={12}>
          <Form.Item label="Type of rescue" name='rescue_type_id'>
            <Select
              placeholder="Type of rescue"
              style={{ width: "100%" }}
              onChange={(value) => { setRescueType(value) }}
            >
              {rescueTypeData.map((item, index) => {
                return <Select.Option key={item.id} value={item.value}>{item.name}</Select.Option>
              })}
            </Select>
          </Form.Item>
        </Col>

        <Col xl={12}>
          <Form.Item label="Species" name='species_id'>
            <Select
              disabled={!rescueType}
              placeholder="Species"
              style={{ width: "100%" }}
            >
              {filterSpeciesType.map((item, index) => {
                return <Select.Option key={item.id} value={item.value}>{item.name}</Select.Option>
              })}
            </Select>

          </Form.Item>
        </Col>

        <Col xl={12}>
          <Form.Item label="Rescue Number" name="rescue_number">
            <Input placeholder='Rescue Number' disabled />
          </Form.Item>
        </Col>

        <Col xl={12}>
          <Form.Item label="Status" name="status_id">
            <Select
              placeholder="Status"
              style={{ width: "100%" }}
            >
              {statusType.map((item, index) => {
                return <Select.Option key={item.id} value={item.value}>{item.name}</Select.Option>
              })}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </div>
  )
}

export default BasicInfo