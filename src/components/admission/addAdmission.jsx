import { Button, Modal, Row, Col, Upload, message, Select, Form, Input, Divider, Space } from 'antd';
import { useState } from 'react';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import RescueLocation from './form-component/rescueLocation';
import BasicInfo from './form-component/basicInfo';
import AnimalInfo from './form-component/animalInfo';
import AnimalStatus from './form-component/animalStatus';

const AddAdmission = ({ isModalOpen, setIsModalOpen }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = (value) => {
    console.log("value", value);
  }


  return (
    <>
      <Modal maskClosable={false} title="Add new admission" open={isModalOpen} onCancel={handleCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              onSubmit(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
        width={"80%"}>
        <div>

          <Form layout="vertical" form={form}>
            <BasicInfo form={form} />
            <RescueLocation form={form} />
            <AnimalInfo form={form} />
            <AnimalStatus form={form} />
          </Form>
        </div>
      </Modal>
    </>
  );
};
export default AddAdmission;