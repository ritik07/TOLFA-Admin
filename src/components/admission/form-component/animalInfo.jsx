import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Divider, Input, Space, Button, Select, Radio, Typography, Image } from 'antd'
import { SEX } from '../../../constants/main'
import { PlusOutlined } from '@ant-design/icons';
import { AGE } from '../../../constants/conifg';

const AnimalInfo = ({ form, breedData }) => {
  const [imagePreview, setImagePreview] = useState(null);


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("file", file);
        form.setFieldsValue({ animal_image: file })
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
        value: 1
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
        value: 2
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
        value: 3
      },
    ]
  }

  return (
    <div>
      <h3>Animal Info</h3>
      <div className='divider' />
      <Row gutter={[10, 10]}>
        <Col xl={8}>
          <Form.Item
            // required
            // rules={[{ required: true, message: 'This field is required!' }]}
            label='Animal name' name='animal_name'>
            <Input placeholder='Animal name' />
          </Form.Item>
        </Col>

        <Col xl={8}>
          <Form.Item
            required
            rules={[{ required: true, message: 'This field is required!' }]}
            label='Sex' name='animal_sex'>
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
          <Form.Item
            required
            rules={[{ required: true, message: 'This field is required!' }]}
            label='Age' name='age'>
            <Select
              placeholder="Please select main color"
              style={{
                width: '100%',
              }}
              options={AGE}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[10, 10]}>
        <Col xl={8}>
          <Form.Item
            required
            rules={[{ required: true, message: 'This field is required!' }]}
            label='Main color' name='main_color_id'>
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
          <Form.Item
            // required
            // rules={[{ required: true, message: 'This field is required!' }]}
            label='2nd color' name='second_color_id'>
            <Select
              placeholder="Please select 2nd color"
              style={{
                width: '100%',
              }}
              options={colorCompoment()}
            />
          </Form.Item>
        </Col>

        <Col xl={8}>
          <Form.Item
            // required
            // rules={[{ required: true, message: 'This field is required!' }]}
            label='3rd color' name='thirdcolor_id'>
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
          <Form.Item
            // required
            // rules={[{ required: true, message: 'This field is required!' }]}
            label='ID Features' name='id_features'>
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
          <Form.Item
            required
            rules={[{ required: true, message: 'This field is required!' }]}
            name="breed_id" label="breed">
            <Select
              placeholder="Name of breed"
              style={{ width: "100%" }}
              options={breedData.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[10, 10]}>
        <Col xs={6}>
          <div>
            <Form.Item
              // required
              // rules={[{ required: true, message: 'This field is required!' }]}
              name="animal_image">
              <Typography.Title level={5}>
                Upload image:
              </Typography.Title>
              <input type="file" onChange={handleImageChange} />
            </Form.Item>
          </div>
        </Col>

        <Col xs={4}>
          {imagePreview && (
            <Image className="cs-img" src={imagePreview} alt="Uploaded image" />
          )}
        </Col>
      </Row>
    </div>
  )
}

export default AnimalInfo