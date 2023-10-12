import { useState, useEffect } from 'react';
import { Button, Modal, Row, Col, Upload, message, Select, Form, Input, Divider, Space } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import RescueLocation from './form-component/rescueLocation';
import BasicInfo from './form-component/basicInfo';
import AnimalInfo from './form-component/animalInfo';
import AnimalStatus from './form-component/animalStatus';
import axios from 'axios'
import { BASE_URL } from '../../constants/server';

const AddAdmission = ({ isModalOpen, setIsModalOpen, fieldsData }) => {
  const [form] = Form.useForm();
  const USER_TOKEN = sessionStorage.getItem("user_token");
  const USER_ID = localStorage.getItem("user_id");

  const handleOk = () => {
    setIsModalOpen(false);
  };


  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (value) => {
    const payload = {
      ...value,
      created_by: USER_ID,
    }
    console.log("value", value);
    let response = await axios.post(
      BASE_URL + `/admission-status/create?token=${USER_TOKEN}`,
      payload
    );

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
            <BasicInfo form={form} rescueTypeData={fieldsData.rescueTypeData}
              speciesType={fieldsData.speciesType} statusType={fieldsData.statusType}
              rescueNumber={fieldsData.rescueNumber} />

            <RescueLocation form={form} stateData={fieldsData.stateData} city={fieldsData.city}
              cityArea={fieldsData.cityArea} tolfaArea={fieldsData.tolfaArea}
              tolfaBlockNumber={fieldsData.tolfaBlockNumber} />

            <AnimalInfo form={form} />

            <AnimalStatus form={form} />
          </Form>
        </div>
      </Modal>
    </>
  );
};
export default AddAdmission;