import { Col, Form, Input, InputNumber, Row, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useState } from 'react'
import { ABC_STATUS, BODY_SCORE, CONDITION, INJURY, INJURY_LOCATION, OTHER_ADMISSION, PROBLEM, SICKNESS, SICKNESS_SYMPTOMS } from '../../../constants/conifg'

const AnimalStatus = ({ statusTypeData, form }) => {

  const [problemType, setProblemType] = useState(false)
  const [otherCondition, setOtherCondition] = useState(false)

  const handleProblem = (value) => {
    setProblemType(value)
    form.setFieldsValue({ problem_type: undefined, symptoms: undefined, injury_location: undefined })
  }

  const handleOtherCondition = (value) => {
    setOtherCondition(value)
    form.setFieldsValue({ alt_problem_type: undefined, alt_symptoms: undefined, alt_injury_location: undefined })
  }

  const computeProblemType = (value) => {
    if (value === 'symptoms') {
      if (problemType === 'sick') {
        return SICKNESS_SYMPTOMS
      } else if (problemType === 'injured') {
        return INJURY_LOCATION
      } else {
        return INJURY_LOCATION
      }
    } else if (value === 'problem_type') {
      if (otherCondition === 'sick') {
        return SICKNESS
      } else if (otherCondition === 'injured') {
        return INJURY
      } else {
        return OTHER_ADMISSION
      }
    }

  }

  const computeAltProblemType = (value) => {
    if (value === 'symptoms') {
      if (problemType === 'sick') {
        return SICKNESS_SYMPTOMS
      } else if (problemType === 'injured') {
        return INJURY_LOCATION
      } else {
        return INJURY_LOCATION
      }
    } else if (value === 'problem_type') {
      if (otherCondition === 'sick') {
        return SICKNESS
      } else if (otherCondition === 'injured') {
        return INJURY
      } else {
        return OTHER_ADMISSION
      }
    }

  }


  return (
    <div>
      <h3>Animal Status</h3>
      <div className='divider' />

      <Row gutter={[10, 10]}>
        <Col xl={8}>
          <Form.Item
            required
            rules={[{ required: true, message: 'This field is required!' }]}
            label='ABC Status' name='abc_status'>
            <Select
              placeholder="Please select main color"
              style={{
                width: '100%',
              }}
              options={ABC_STATUS}
            />
          </Form.Item>
        </Col>

        <Col xl={8}>
          <Form.Item
            // required
            // rules={[{ required: true, message: 'This field is required!' }]}
            label='Tattoo Number (Optional)' name='tattoo_number'>
            <Input
              placeholder="Please select main color"
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
        </Col>

        <Col xl={8}>
          <Form.Item
            required
            rules={[{ required: true, message: 'This field is required!' }]}
            label="Status" name="status_id">
            <Select
              placeholder="Status"
              style={{ width: "100%" }}
            >
              {statusTypeData.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[10, 10]}>
        <Col xl={8}>
          <Form.Item
            required
            rules={[{ required: true, message: 'This field is required!' }]}
            label='Condition' name='condition'>
            <Select
              placeholder="Please select condition"
              style={{
                width: '100%',
              }}
              options={CONDITION}
            />
          </Form.Item>
        </Col>

        <Col xl={8}>
          <Form.Item
            required
            rules={[{ required: true, message: 'This field is required!' }]}
            label='Body score' name='body_score'>
            <Select
              placeholder="Please select Body score"
              style={{
                width: '100%',
              }}
              options={BODY_SCORE}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[10, 10]}>
        <Col xl={8}>
          <Form.Item
            required
            rules={[{ required: true, message: 'This field is required!' }]}
            label='Caregiver name' name='caregiver_name'>
            <TextArea placeholder='Caregiver name' />
          </Form.Item>
        </Col>

        <Col xl={8}>
          <Form.Item
            // required
            // rules={[{ required: true, message: 'This field is required!' }]}
            label='Caregiver number' name='caregiver_number'>
            <TextArea placeholder='Caregiver number' />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[10, 10]}>
        <Col xl={8}>
          <Form.Item
            required
            rules={[{ required: true, message: 'This field is required!' }]}
            label='Problem' name='problem'>
            <Select
              onChange={(e) => handleProblem(e)}
              placeholder="Please select problem"
              style={{
                width: '100%',
              }}
              options={PROBLEM}
            />
          </Form.Item>
        </Col>

        {problemType ?
          <Col xl={8}>
            <Form.Item
              required
              rules={[{ required: true, message: 'This field is required!' }]}
              label='Problem type' name='problem_type'>
              <Select
                mode='multiple'
                placeholder="Please select problem type"
                style={{
                  width: '100%',
                }}
                options={computeProblemType('problem_type')}
              />
            </Form.Item>
          </Col>
          : null}

        {problemType ?
          <Col xl={8}>
            <Form.Item
              required
              rules={[{ required: true, message: 'This field is required!' }]}
              label={problemType !== 'sick' ? 'Injury location' : 'Symptoms'}
              name={problemType !== 'sick' ? 'injury_location' : 'symptoms'}>
              <Select
                mode='multiple'
                placeholder="Please select symptoms"
                style={{
                  width: '100%',
                }}
                options={computeProblemType('symptoms')}
              />
            </Form.Item>
          </Col>
          : null}
      </Row>

      <Row gutter={[10, 10]}>
        <Col xl={8}>
          <Form.Item
            // required
            // rules={[{ required: true, message: 'This field is required!' }]}
            label='Other condition' name='alt_problem'>
            <Select
              onChange={(e) => handleOtherCondition(e)}
              placeholder="Please select other condition"
              style={{
                width: '100%',
              }}
              options={PROBLEM}
            />
          </Form.Item>
        </Col>

        {otherCondition ?
          <Col xl={8}>
            <Form.Item
              required
              rules={[{ required: true, message: 'This field is required!' }]}
              label='Problem type' name='alt_problem_type'>
              <Select
                mode='multiple'
                placeholder="Please select problem type"
                style={{
                  width: '100%',
                }}
                options={computeProblemType('problem_type')}
              />
            </Form.Item>
          </Col>
          : null}

        {otherCondition ?
          <Col xl={8}>
            <Form.Item
              required
              rules={[{ required: true, message: 'This field is required!' }]}
              label={otherCondition !== 'sick' ? 'Injury location' : 'Symptoms'}
              name={otherCondition !== 'sick' ? 'alt_injury_location' : 'alt_symptoms'}>
              <Select
                mode='multiple'
                placeholder="Please select symptoms"
                style={{
                  width: '100%',
                }}
                options={otherCondition !== 'sick' ? INJURY_LOCATION : SICKNESS}
              />
            </Form.Item>
          </Col>
          : null}
      </Row>


      <Row gutter={[10, 10]}>
        <Col xl={24}>
          <Form.Item
            // required
            // rules={[{ required: true, message: 'This field is required!' }]}
            label="Cause of problem" name="cause_of_problem">
            <TextArea placeholder='Cause of problem' />
          </Form.Item>
        </Col>


        <Col xl={24}>
          <Form.Item
            // required
            // rules={[{ required: true, message: 'This field is required!' }]}
            label="Rassi No." name="rassi_no">
            <Input placeholder='Rassi no' />
          </Form.Item>
        </Col>
      </Row>

    </div>
  )
}

export default AnimalStatus