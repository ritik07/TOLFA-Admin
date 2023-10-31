import React, { useEffect } from 'react';
import { Row, Col, Form, Select } from 'antd';

const BasicInfo = ({ rescueTypeData, speciesTypeData, statusTypeData, form }) => {

  /**
   * @watch
   */
  let rescueTypeId = Form.useWatch('type_of_rescue_id', form);

  /**
   * @effect
   */
  useEffect(() => {
    form.setFieldsValue({ species_id: undefined })
  }, [rescueTypeId])

  return (
    <div>
      <h3>Rescue Info</h3>
      <div className='divider' />
      <Row gutter={[10, 10]}>
        <Col xl={12}>
          <Form.Item label="Type of rescue" name='type_of_rescue_id'>
            <Select
              placeholder="Type of rescue"
              style={{ width: "100%" }}
            >
              {rescueTypeData.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col xl={12}>
          <Form.Item label="Species" name='species_id'>
            <Select
              disabled={!form.getFieldValue('type_of_rescue_id')}
              placeholder="Species"
              style={{ width: "100%" }}
            >
              {speciesTypeData.filter((x) => x.rescue_type_id === +form.getFieldValue('type_of_rescue_id')).map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col xl={12}>
          <Form.Item label="Status" name="status_id">
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
    </div>
  );
};

export default BasicInfo;
