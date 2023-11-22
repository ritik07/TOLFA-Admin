import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Divider, Input, Space, Button, Select, Radio } from 'antd'
import { useQuery } from 'react-query';
import RescuerDetail from './rescuerDetail';
import { fetchTolfaStaffListData } from '../../../services/master_service';
import { defaultCaching } from '../../../constants/conifg'
import { handleLogout } from '../../../global/function.global';

const RescueLocation = ({ form, stateData, city, cityArea, tolfaArea, tolfaBlockNumber, }) => {
  const AUTH_TOKEN = localStorage.getItem('auth_token');

  const [rescueTeam, setRescueTeam] = useState([
    { name: 'Ramesh kumar', id: 122, }, { name: 'Dhanraj', id: 443 },
  ])

  /**
   * @watch
   */
  let watchStateId = Form.useWatch('state_id', form);
  let watchCityId = Form.useWatch('city_id', form);
  let watchTolfaAreaId = Form.useWatch('tolfa_area_id', form);
  let watchRescuedByTolfa = Form.useWatch('rescue_by_tolfa', form);
  /**
   * @common_function
   */

  const handleQueryError = (error) => {
    if (error.response?.data?.code === 401) {
      handleLogout();
    }
  };

  /**
   * @state
   */
  const [rescuedByTolfa, setRescuedByTolfa] = useState(undefined)

  /**
   * @api_calls
   */

  // Define a query for rescue type data
  const { data: staffListData, isLoading: staffListLoading, isError: staffListError } = useQuery(
    'staffListData',
    () => fetchTolfaStaffListData(AUTH_TOKEN),
    {
      ...defaultCaching,
      onError: handleQueryError,
      enabled: watchRescuedByTolfa ? watchRescuedByTolfa : false
    }
  );

  /**
   * @effects
   */
  useEffect(() => {
    form.setFieldsValue({ city_id: undefined, area_id: undefined })
  }, [watchStateId])

  useEffect(() => {
    form.setFieldsValue({ area_id: undefined })
  }, [watchCityId])

  useEffect(() => {
    form.setFieldsValue({ tolfa_block_id: undefined })
  }, [watchTolfaAreaId])

  /** 
  * @functions
  */
  const onChangeRescuedBy = (value) => {
    setRescuedByTolfa(value)
  }

  return (
    <div>
      <h3>Rescue Location</h3>
      <div className='divider' />
      <Row gutter={[10, 10]}>
        <Col xl={12}>
          <Form.Item
            required
            rules={[{ required: true, message: 'This field is required!' }]}
            name="state_id" label="State">
            <Select
              placeholder="Name of state"
              style={{ width: "100%" }}>
              {stateData.map((item, index) => {
                return <Select.Option key={item.id} value={item.value}>{item.name}</Select.Option>
              })}
            </Select>
          </Form.Item>
        </Col>

        <Col xl={12}>
          <Form.Item
            required
            rules={[{ required: true, message: 'This field is required!' }]}
            name="city_id" label="City">
            <Select
              disabled={!form.getFieldValue('state_id')}
              placeholder="Name of city"
              style={{ width: "100%" }}>
              {city.filter((x) => x.state_id === +form.getFieldValue('state_id')).map((item, index) => {
                return <Select.Option key={item.id} value={item.value}>{item.name}</Select.Option>
              })}
            </Select>
          </Form.Item>
        </Col>

        <Col xl={12}>
          <Form.Item
            required
            rules={[{ required: true, message: 'This field is required!' }]}
            label="Area" name='area_id'>
            <Select
              disabled={!form.getFieldValue('city_id')}
              placeholder="Name of area"
              style={{ width: "100%" }}>
              {cityArea.filter((x) => x.city_id === +form.getFieldValue('city_id')).map((item, index) => {
                return <Select.Option key={item.id} value={item.value}>{item.name}</Select.Option>
              })}
            </Select>
          </Form.Item>
        </Col>

        <Col xl={12}>
          <Form.Item
            required
            rules={[{ required: true, message: 'This field is required!' }]}
            label="Rescue address" name='rescue_address'>
            <Input.TextArea placeholder='Rescue address' />
          </Form.Item>
        </Col>

        <Col xl={12}>
          <Form.Item
            required
            rules={[{ required: true, message: 'This field is required!' }]}
            label="Tolfa Area" name='tolfa_area_id'>
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
          <Form.Item
            required
            rules={[{ required: true, message: 'This field is required!' }]}
            label="TOLFA BLOCK Number" name='tolfa_block_id'>
            <Select
              disabled={!form.getFieldValue('tolfa_area_id')}
              placeholder="TOLFA BLOCK Number"
              style={{ width: "100%" }}>
              {tolfaBlockNumber.filter((x) => x.tolfa_area_id === +form.getFieldValue('tolfa_area_id')).map((item, index) => {
                return <Select.Option key={item.id} value={item.value}>{item.name}</Select.Option>
              })}
            </Select>
          </Form.Item>
        </Col>

        <Col xl={12}>
          <Form.Item
            required
            rules={[{ required: true, message: 'This field is required!' }]}
            label="Rescued by TOLFA team?" name="rescue_by_tolfa">
            <Radio.Group>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>

        <Col xl={12}>
        </Col>

        {watchRescuedByTolfa ?
          <Col xl={12}>
            <Form.Item
              required
              rules={[{ required: true, message: 'This field is required!' }]}
              label="Rescue Team" name='rescue_team'>
              <Select
                mode='multiple'
                placeholder="Select rescue team"
                style={{ width: "100%" }}
                options={
                  staffListData?.data.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))}
              />
            </Form.Item>
          </Col>
          : null}
      </Row>

      {!watchRescuedByTolfa ?
        <RescuerDetail form={form} />
        : null}
    </div>
  )
}

export default RescueLocation