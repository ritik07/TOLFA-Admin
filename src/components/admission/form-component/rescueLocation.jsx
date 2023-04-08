import React, { useState } from 'react'
import { Row, Col, Form, Divider, Input, Space, Button, Select, Radio } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import RescuerDetail from './rescuerDetail';


const RescueLocation = ({ form }) => {
  const [stateList, setStateList] = useState(['ajmer', 'pushkar']);
  const [areaList, setAreaList] = useState([
    { name: 'sastri circle', state: "ajmer", }, { name: 'adarsh nagar', state: 'ajmer' },
    { name: 'pushkar ghat', state: 'pushkar' }, { name: 'main chok', state: 'pushkar' }])
  const [rescueTeam, setRescueTeam] = useState([
    { name: 'Ramesh kumar', id: 122, }, { name: 'Dhanraj', id: 443 },
  ])

  const [rescuedByTolfa, setRescuedByTolfa] = useState(undefined)

  const [newState, setNewState] = useState(undefined)
  const [selectedState, setSelectedState] = useState(undefined)

  const onNameState = (e) => {
    setNewState(e.target.value.toLowerCase())
  }

  const addState = () => {
    let temp = [...stateList]

    temp.push(newState)
    setStateList(temp)

    setNewState(undefined)
  }

  const onChangeRescuedBy = (value) => {
    console.log("value", value);
    setRescuedByTolfa(value)
  }

  const addArea = () => {
    let temp = [...areaList]

    temp.push({ name: newState, state: selectedState })
    setAreaList(temp)

    setNewState(undefined)
  }

  const onChangeState = (e) => {
    form.setFieldsValue({ area: undefined })
    console.log("state", e);
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
              onChange={(e) => onChangeState(e)}
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider
                    style={{
                      margin: '8px 0',
                    }}
                  />
                  <Space
                    style={{
                      padding: '0 8px 4px',
                    }}
                  >
                    <Input
                      placeholder="Please enter item"
                      value={newState}
                      onChange={onNameState}
                    />
                    <Button type="text" icon={<PlusOutlined />} onClick={addState}>
                      Add state
                    </Button>
                  </Space>
                </>)}
              options={stateList.map((item) => ({
                label: item,
                value: item,
              }))}
            />
          </Form.Item>
        </Col>



        <Col xl={12}>
          <Form.Item label="Area" name='area'>
            <Select
              disabled={!selectedState}
              placeholder="Name of area"
              style={{ width: "100%" }}
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider
                    style={{
                      margin: '8px 0',
                    }}
                  />
                  <Space
                    style={{
                      padding: '0 8px 4px',
                    }}
                  >
                    <Input
                      placeholder="Please enter item"
                      value={newState}
                      onChange={onNameState}
                    />
                    <Button type="text" icon={<PlusOutlined />} onClick={addArea}>
                      Add area
                    </Button>
                  </Space>
                </>)}
              options={
                areaList.filter((x) => x.state === selectedState).map((item) => ({
                  label: item.name,
                  value: item.name,
                }))}
            />
          </Form.Item>
        </Col>

        <Col xl={12}>
          <Form.Item label="Tolfa Area" name='tolfa_area'>
            <Select
              placeholder="Name of TOLFA area"
              style={{ width: "100%" }}
              // dropdownRender={(menu) => (
              //   <>
              //     {menu}
              //     <Divider
              //       style={{
              //         margin: '8px 0',
              //       }}
              //     />
              //     <Space
              //       style={{
              //         padding: '0 8px 4px',
              //       }}
              //     >
              //       <Input
              //         placeholder="Please enter TOLFA area"
              //         value={newState}
              //         onChange={onNameState}
              //       />
              //       <Button type="text" icon={<PlusOutlined />} onClick={addArea}>
              //         Add area
              //       </Button>
              //     </Space>
              //   </>)}
              options={
                [{ label: '40 kennels', value: '40_kennels' }, { label: '60 kennels', value: '60_kennels' }]}
            />
          </Form.Item>
        </Col>

        <Col xl={12}>
          <Form.Item label="TOLFA BLOCK Number" name='tolfa_block_number'>
            <Select
              placeholder="TOLFA BLOCK Number"
              style={{ width: "100%" }}
              // dropdownRender={(menu) => (
              //   <>
              //     {menu}
              //     <Divider
              //       style={{
              //         margin: '8px 0',
              //       }}
              //     />
              //     <Space
              //       style={{
              //         padding: '0 8px 4px',
              //       }}
              //     >
              //       <Input
              //         placeholder="Please enter TOLFA area"
              //         value={newState}
              //         onChange={onNameState}
              //       />
              //       <Button type="text" icon={<PlusOutlined />} onClick={addArea}>
              //         Add area
              //       </Button>
              //     </Space>
              //   </>)}
              options={
                [{ label: 'A1', value: 'a1' }, { label: 'A2', value: 'a2' }]}
            />
          </Form.Item>
        </Col>

        <Col xl={12}>
          <Form.Item label="Rescued by TOLFA team?" name="rescued_by_tolfa">
            <Radio.Group onChange={(e) => onChangeRescuedBy(e.target.value)}>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>

        {rescuedByTolfa ?
          <Col xl={12}>
            <Form.Item label="Rescue Team" name='rescue_team'>
              <Select
                mode='multiple'
                placeholder="Select rescue team"
                style={{ width: "100%" }}
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider
                      style={{
                        margin: '8px 0',
                      }}
                    />
                    <Space
                      style={{
                        padding: '0 8px 4px',
                      }}
                    >
                      <Input
                        placeholder="Please enter item"
                        value={newState}
                        onChange={onNameState}
                      />
                      <Button type="text" icon={<PlusOutlined />} onClick={addArea}>
                        Add staff member
                      </Button>
                    </Space>
                  </>)}
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