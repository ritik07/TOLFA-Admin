import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Divider, Input, Space, Button, Select, Radio } from 'antd'
import RescuerDetail from './rescuerDetail';

const RescueLocation = ({ form, stateData, city, cityArea, tolfaArea, tolfaBlockNumber }) => {
  const [areaList, setAreaList] = useState([
    { name: 'sastri circle', state: "ajmer", }, { name: 'adarsh nagar', state: 'ajmer' },
    { name: 'pushkar ghat', state: 'pushkar' }, { name: 'main chok', state: 'pushkar' }])
  const [rescueTeam, setRescueTeam] = useState([
    { name: 'Ramesh kumar', id: 122, }, { name: 'Dhanraj', id: 443 },
  ])

  useEffect(() => {

  }, [])

  const [rescuedByTolfa, setRescuedByTolfa] = useState(undefined)
  const [selectedState, setSelectedState] = useState(undefined)

  const onChangeRescuedBy = (value) => {
    setRescuedByTolfa(value)
  }

  const onChangeState = (e) => {
    form.setFieldsValue({ area: undefined })
    setSelectedState(e)
  }

  const onChangeCity = (e) => {
    form.setFieldsValue({ area: undefined })
    setSelectedState(e)
  }

  return (
    <div>
      <h3>Rescue Location</h3>
      <div className='divider' />
      <Row gutter={[10, 10]}>
        <Col xl={12}>
          <Form.Item name="state" label="State">
            <Select
              placeholder="Name of state"
              style={{ width: "100%" }}
              onChange={(e) => onChangeState(e)}>
              {stateData.map((item, index) => {
                return <Select.Option key={item.id} value={item.value}>{item.name}</Select.Option>
              })}
            </Select>
          </Form.Item>
        </Col>


        <Col xl={12}>
          <Form.Item name="city" label="City">
            <Select
              placeholder="Name of city"
              style={{ width: "100%" }}
              onChange={(e) => onChangeCity(e)}>
              {city.map((item, index) => {
                return <Select.Option key={item.id} value={item.value}>{item.name}</Select.Option>
              })}
            </Select>
          </Form.Item>
        </Col>

        <Col xl={12}>
          <Form.Item label="Area" name='area'>
            <Select
              // disabled={!selectedState}
              placeholder="Name of area"
              style={{ width: "100%" }}>
              {cityArea.map((item, index) => {
                return <Select.Option key={item.id} value={item.value}>{item.name}</Select.Option>
              })}
            </Select>
          </Form.Item>
        </Col>

        <Col xl={12}>
          <Form.Item label="Tolfa Area" name='tolfa_area'>
            <Select
              placeholder="Name of TOLFA area"
              style={{ width: "100%" }}
            >
              {tolfaArea.map((item, index) => {
                return <Select.Option key={item.id} value={item.value}>{item.name}</Select.Option>
              })}
            </Select>
          </Form.Item>
        </Col>

        <Col xl={12}>
          <Form.Item label="TOLFA BLOCK Number" name='tolfa_block_number'>
            <Select
              placeholder="TOLFA BLOCK Number"
              style={{ width: "100%" }}>
              {tolfaBlockNumber.map((item, index) => {
                return <Select.Option key={item.id} value={item.value}>{item.name}</Select.Option>
              })}
            </Select>
          </Form.Item>
        </Col>

        <Col xl={12}>
        </Col>

        <Col xl={12}>
          <Form.Item label="Rescued by TOLFA team?" name="rescued_by_tolfa">
            <Radio.Group onChange={(e) => onChangeRescuedBy(e.target.value)}>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>

        <Col xl={12}>
        </Col>

        {rescuedByTolfa ?
          <Col xl={12}>
            <Form.Item label="Rescue Team" name='rescue_team'>
              <Select
                mode='multiple'
                placeholder="Select rescue team"
                style={{ width: "100%" }}
                options={
                  rescueTeam.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))}
              />
            </Form.Item>
          </Col>
          : null}
      </Row>

      {rescuedByTolfa !== undefined && !rescuedByTolfa ?
        <RescuerDetail form={form} />
        : null}
    </div>
  )
}

export default RescueLocation