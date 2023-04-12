import React, { useState } from 'react'
import { Button, Card, Input, Row, Col, Select, DatePicker, Table } from 'antd'
import Search from 'antd/es/transfer/search'
import AddAdmission from '../components/admission/addAdmission';
import { admissionColumn, admissionDataSource } from '../columns/admission.column';
import { SEX } from '../constants/main'

const Admission = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOnAddAdmission = () => {
    setIsModalOpen(true)
  }

  return (
    <div>
      <div className='cs-dis-flex cs-jc-end cs-m-10'>
        <Button className='cs-theme-button' onClick={handleOnAddAdmission}>
          Add new admission
        </Button>
      </div>
      <Card className='cs-theme-card'>
        <Row gutter={[10, 10]}>
          <Col xl={5}>
            <Search placeholder='Search by rescuse no.' />
          </Col>

          <Col xl={3}>
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
          </Col>

          <Col xl={3}>
            <Select
              placeholder="Condition"
              style={{ width: "100%" }}
              options={[
                {
                  value: '1',
                  label: 'Good',
                },
                {
                  value: '2',
                  label: 'Poor',
                },
                {
                  value: '3',
                  label: 'Collapsed',
                },
                {
                  value: '4',
                  label: 'Serious',
                },

              ]}
            />
          </Col>

          <Col xl={3}>
            <Select
              placeholder="ABC Status"
              style={{ width: "100%" }}
              options={[
                // {
                //   value: 'jack',
                //   label: 'Jack',
                // },
                // {
                //   value: 'lucy',
                //   label: 'Lucy',
                // },
                // {
                //   value: 'Yiminghe',
                //   label: 'yiminghe',
                // },
                // {
                //   value: 'disabled',
                //   label: 'Disabled',
                //   disabled: true,
                // },
              ]}
            />
          </Col>


          <Col xl={3}>
            <Select
              placeholder="Type"
              style={{ width: "100%" }}
              options={[
                // {
                //   value: 'jack',
                //   label: 'Jack',
                // },
                // {
                //   value: 'lucy',
                //   label: 'Lucy',
                // },
                // {
                //   value: 'Yiminghe',
                //   label: 'yiminghe',
                // },
                // {
                //   value: 'disabled',
                //   label: 'Disabled',
                //   disabled: true,
                // },
              ]}
            />
          </Col>

          <Col xl={3}>
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
          </Col>


          <Col xl={3}>
            <Select
              placeholder="Breed"
              style={{ width: "100%" }}
              options={[
                // {
                //   value: 'jack',
                //   label: 'Jack',
                // },
                // {
                //   value: 'lucy',
                //   label: 'Lucy',
                // },
                // {
                //   value: 'Yiminghe',
                //   label: 'yiminghe',
                // },
                // {
                //   value: 'disabled',
                //   label: 'Disabled',
                //   disabled: true,
                // },
              ]}
            />
          </Col>

          <Col xl={3}>
            <DatePicker placeholder='Start date' />
          </Col>

          <Col xl={3}>
            <DatePicker placeholder='End date' />
          </Col>

          <Col>
            <Button className='cs-theme-button'>
              Search
            </Button>
          </Col>
        </Row>
      </Card>

      <div className='cs-tm-20'>
        <Table dataSource={admissionDataSource} columns={admissionColumn()} scroll={{ x: 1300, y: 'calc(100vh - 430px)' }} />
      </div>

      {isModalOpen ?
        <AddAdmission isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        : null}
    </div>
  )
}

export default Admission