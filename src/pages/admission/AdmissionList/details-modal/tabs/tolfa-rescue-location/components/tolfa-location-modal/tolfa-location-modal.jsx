import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { Button, Modal, Form, Select, Row, Col, message } from 'antd';
import { LongerCaching } from '../../../../../../../../constants/conifg'
import { fetchTolfaAreaListData, fetchTolfaBlockNumberListData, updateTolfaLocation } from '../../../../../../../../services/master_service';
import { handleLogout } from '../../../../../../../../global/function.global';
import { createNotification } from '../../../../../../../../utils/notify';
import Loader from '../../../../../../../../components/loader/loader';

const TolfaLocationModal = ({ isModalOpen, setIsModalOpen, rescue_no, refetchAdmissionList, setShowModal }) => {
  const AUTH_TOKEN = localStorage.getItem('auth_token');
  const USER_ID = localStorage.getItem("user_id");

  const [form] = Form.useForm();

  /**
   * @watch
   */
  let watchTolfaAreaId = Form.useWatch('tolfa_area_id', form);

  useEffect(() => {
    form.setFieldsValue({ tolfa_block_id: undefined })
  }, [watchTolfaAreaId])

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const onCancel = () => {
    setIsModalOpen(false);
  };

  /**
 * @Function
 */
  const { mutate: updateTolfaLocationMutation, isLoading, isError, isSuccess } = useMutation(
    (formData) => updateTolfaLocation(AUTH_TOKEN, formData),
    {
      // onSuccess callback will be called when the mutation is successful
      onSuccess: () => {
        createNotification("success", {
          title: "Detail updated",
          message: "Tolfa location details updated",
        });
        form.resetFields()
        setShowModal(false)
        setIsModalOpen(false)
        refetchAdmissionList()
        message.success("Record added!!")
        // You can perform additional actions or updates here
      },
      // onError callback will be called when the mutation encounters an error
      onError: (error) => {
        console.error('Error posting data:', error);
        // You can handle errors or display error messages here
      },
    }
  );

  const onCreate = (values) => {
    try {
      const payload = {
        rescue_id: rescue_no,
        tolfa_area_id: values.tolfa_area_id,
        tolfa_block_id: values.tolfa_block_id,
        created_by: USER_ID,
      }
      updateTolfaLocationMutation(payload)
    } catch (error) {
      console.log("error", error);
    }
  }

  const handleQueryError = (error) => {
    if (error.response?.data?.code === 401) {
      handleLogout();
    }
  };

  // Define a query for tolfa area list data
  const { data: tolfaAreaListData, isLoading: tolfaAreaListLoading, isError: tolfaAreaListError } = useQuery(
    'tolfaAreaListData',
    () => fetchTolfaAreaListData(AUTH_TOKEN),
    {
      ...LongerCaching,
      onError: handleQueryError,
    }
  );

  // Define a query for tolfa block list data
  const { data: tolfaBlockNumberListData, isLoading: tolfaBlockNumberListLoading, isError: tolfaBlockNumberListError } = useQuery(
    'tolfaBlockNumberListData',
    () => fetchTolfaBlockNumberListData(AUTH_TOKEN),
    {
      ...LongerCaching,
      onError: handleQueryError,
    }
  );

  const areQueriesLoaded = !tolfaBlockNumberListLoading && !tolfaAreaListLoading

  return (
    <Modal
      open={isModalOpen}
      title="Create a new collection"
      okText="Update"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >   {areQueriesLoaded ?
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Row gutter={[12, 12]}>
          <Col xl={12}>
            <Form.Item label="Tolfa Area" name='tolfa_area_id'>
              <Select
                placeholder="Name of TOLFA area"
                style={{ width: "100%" }}
              >
                {tolfaAreaListData.data.map((item, index) => {
                  return <Select.Option key={item.id} value={item.value}>{item.name}</Select.Option>
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col xl={12}>
            <Form.Item label="TOLFA Kennel Number" name='tolfa_block_id'>
              <Select
                disabled={!form.getFieldValue('tolfa_area_id')}
                placeholder="TOLFA Kennel Number"
                style={{ width: "100%" }}>
                {tolfaBlockNumberListData.data.filter((x) => x.tolfa_area_id === +form.getFieldValue('tolfa_area_id')).map((item, index) => {
                  return <Select.Option key={item.id} value={item.value}>{item.name}</Select.Option>
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      : <Loader />}
    </Modal>

  );
};
export default TolfaLocationModal;