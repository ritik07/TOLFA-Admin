import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Divider, Input, Space, Button, Select, Radio } from 'antd'
import { SEX } from '../../../constants/main'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

const AnimalInfo = ({ form }) => {
  const [mainColor, setMainColor] = useState('#ffo')
  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const [displayColorPicker2nd, setDisplayColorPicker2nd] = useState(false)
  const [displayColorPicker3rd, setDisplayColorPicker3rd] = useState(false)

  const [color, setColor] = useState('#000')
  const [color2nd, setColor2nd] = useState('#888')
  const [color3rd, setColor3rd] = useState('#5555')
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


  const styles = reactCSS({
    'default': {
      color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: `${color}`,
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    },
  });

  const styles2nd = reactCSS({
    'default': {
      color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: `${color2nd}`,
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    },
  });

  const styles3rd = reactCSS({
    'default': {
      color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: `${color3rd}`,
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    },
  });

  const handleClick = (value) => {
    if (value === 'main') {
      setDisplayColorPicker(!displayColorPicker)
    } else if (value === '2nd') {
      setDisplayColorPicker2nd(!displayColorPicker2nd)
    } else {
      setDisplayColorPicker3rd(!displayColorPicker3rd)
    }
  };

  const handleClose = (value) => {
    if (value === 'main') {
      setDisplayColorPicker(false)
    } else if (value === '2nd') {
      setDisplayColorPicker2nd(!displayColorPicker2nd)
    } else {
      setDisplayColorPicker3rd(!displayColorPicker3rd)
    }
  };

  const handleChange = (color, value) => {
    let hexColor = color.hex
    if (value === 'main') {
      setColor(hexColor)
    } else if (value === '2nd') {
      setColor2nd(hexColor)
    } else {
      setColor3rd(hexColor)
    }
  };

  const handleNewBreed = (value) => {
    setNewBreed(value)
  }

  const handleAddBreed = () => {
    let temp = [...breed]

    temp.push({ label: newBreed, value: newBreed })
    setBreed(temp)

    setNewBreed(undefined)
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
          <Row gutter={[10, 10]}>
            <Col xl={8}>
              <Form.Item label='Main color' name='main_color'>
                <div style={styles.swatch} onClick={() => handleClick('main')}>
                  <div style={styles.color} />
                </div>
                {displayColorPicker ? <div style={styles.popover}>
                  <div style={styles.cover} onClick={() => handleClose('main')} />
                  <SketchPicker color={color} onChange={(e) => handleChange(e, 'main')} />
                </div> : null}
              </Form.Item>
            </Col>

            <Col xl={8}>
              <Form.Item label='2nd color' name='2nd_color'>
                <div style={styles2nd.swatch} onClick={() => handleClick('2nd')}>
                  <div style={styles2nd.color} />
                </div>
                {displayColorPicker2nd ? <div style={styles2nd.popover}>
                  <div style={styles2nd.cover} onClick={() => handleClose('2nd')} />
                  <SketchPicker color={color2nd} onChange={(e) => handleChange(e, '2nd')} />
                </div> : null}
              </Form.Item>
            </Col>

            <Col xl={8}>
              <Form.Item label='3rd color' name='3rd_color'>
                <div style={styles3rd.swatch} onClick={() => handleClick('3rd')}>
                  <div style={styles3rd.color} />
                </div>
                {displayColorPicker3rd ? <div style={styles3rd.popover}>
                  <div style={styles3rd.cover} onClick={() => handleClose('3rd')} />
                  <SketchPicker color={color3rd} onChange={(e) => handleChange(e, '3rd')} />
                </div> : null}
              </Form.Item>
            </Col>
          </Row>
        </Col>

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