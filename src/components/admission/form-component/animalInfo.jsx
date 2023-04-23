import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Divider, Input, Space, Button, Select, Radio } from 'antd'
import { SEX } from '../../../constants/main'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import TextArea from 'antd/es/input/TextArea';

const AnimalInfo = ({ form }) => {
  const [mainColor, setMainColor] = useState('#ffo')

  const [breed, setBreed] = useState([
    {
      label: 'Street',
      value: 'street',
    },
    {
      label: 'Desi',
      value: 'desi',
    },
    {
      label: 'Labrador Retriever',
      value: 'labra_retriever',
    },
    {
      label: 'Golden retriever',
      value: 'golden_retriever',
    }
  ])
  const [newBreed, setNewBreed] = useState(undefined)

  const handleNewBreed = (value) => {
    setNewBreed(value)
  }

  const handleAddBreed = () => {
    let temp = [...breed]

    temp.push({ label: newBreed, value: newBreed })
    setBreed(temp)

    setNewBreed(undefined)
  }

  const colorCompoment = () => {
    return [
      {
        label: <div className='cs-dis-flex cs-jc-sb'>
          <div className='cs-dis-flex cs-vt-center'>
            Black
          </div>

          <div className='color-box' style={{ backgroundColor: "#000" }}>
          </div>
        </div>,
        value: "black"
      },
      {
        label: <div className='cs-dis-flex cs-jc-sb'>
          <div className='cs-dis-flex cs-vt-center'>
            Black/Tan
          </div>
          <div className='cs-dis-flex'>
            <div className='color-box' style={{ backgroundColor: "#000" }}>
            </div>
            <div className='color-box' style={{ backgroundColor: "#988558" }}>
            </div>
          </div>
        </div>,
        value: "Black/Tan"
      },
      {
        label: <div className='cs-dis-flex cs-jc-sb'>
          <div className='cs-dis-flex cs-vt-center'>
            Black/White
          </div>
          <div className='cs-dis-flex'>
            <div className='color-box' style={{ backgroundColor: "#000" }}>
            </div>
            <div className='color-box' style={{ backgroundColor: "#fff" }}>
            </div>
          </div>
        </div>,
        value: "Black/White"
      },
    ]
  }

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

      <Row gutter={[10, 10]}>
        <Col xl={8}>
          <Form.Item label='Main color' name='main_color'>
            <Select
              placeholder="Please select main color"
              style={{
                width: '100%',
              }}
              options={colorCompoment()}
            />
          </Form.Item>
        </Col>

        <Col xl={8}>
          <Form.Item label='2nd color' name='second_color'>
            <Select
              placeholder="Please select 2nd color" x
              style={{
                width: '100%',
              }}
              options={colorCompoment()}
            />
          </Form.Item>
        </Col>

        <Col xl={8}>
          <Form.Item label='3rd color' name='third_color'>
            <Select
              placeholder="Please select 3rd color"
              style={{
                width: '100%',
              }}
              options={colorCompoment()}
            />
          </Form.Item>
        </Col>

        {/* <Col xl={6} className='cs-dis-flex cs-vt-center'>
          <div>
            <Button type='primary'>
              Add/Edit Color
            </Button>
          </div>
        </Col> */}
      </Row>

      <Row gutter={[10, 10]}>

        <Col xl={8}>
          <Form.Item label='ID Features' name='id_features'>
            <Select
              placeholder="Please enter to add multiple ID features"
              mode="tags"
              style={{
                width: '100%',
              }}
              tokenSeparators={[',']}
            />
          </Form.Item>
        </Col>

        <Col xl={8}>
          <Form.Item name="Breed" label="breed">
            <Select
              placeholder="Name of breed"
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
                      placeholder="Please select breed"
                      value={newBreed}
                      onChange={(e) => handleNewBreed(e.target.value)}
                    />
                    <Button type="text" icon={<PlusOutlined />} onClick={handleAddBreed}>
                      Add breed
                    </Button>
                  </Space>
                </>)}
              options={breed.map((item) => ({
                label: item.label,
                value: item.value,
              }))}
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  )
}

export default AnimalInfo