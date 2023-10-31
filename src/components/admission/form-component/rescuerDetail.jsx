import React, { useState, useEffect, useRef } from 'react'
import { Button, Col, Form, Input, InputNumber, Row, } from 'antd'
import { addCareUser, fetchCareUser, fetchTolfaStaffListData } from '../../../services/master_service';
import { useQuery, useMutation } from 'react-query';
import { defaultCaching, LongerCaching } from '../../../constants/conifg'
import { handleLogout } from '../../../global/function.global';
import { createNotification } from '../../../utils/notify';

const RescuerDetail = ({ form }) => {
  const AUTH_TOKEN = localStorage.getItem('auth_token');
  const USER_ID = localStorage.getItem("user_id");

  const rescurerExistRef = useRef(null);
  const rescurerNumberRef = useRef(null)

  const handleQueryError = (error) => {
    if (error.response?.data?.code === 401) {
      handleLogout();
    }
  };

  /**
   * @apiCall
   */

  const { data: careUserData, isLoading: careUserLoading, isError: careUserError, refetch: careUserReFetch } = useQuery(
    'careUserData',
    () => fetchCareUser(AUTH_TOKEN, form.getFieldValue('search_care_people')),
    {
      ...LongerCaching,
      onError: handleQueryError,
      enabled: false
    }
  );

  const { mutate: addUserMutation, isLoading, isError, isSuccess } = useMutation(
    (formData) => addCareUser(AUTH_TOKEN, formData),
    {
      retry: 3,
      // onSuccess callback will be called when the mutation is successful
      onSuccess: () => {
        createNotification("success", {
          title: "Detail added",
          message: "Rescurer details added",
        });
        form.setFieldsValue({ search_care_people: rescurerNumberRef.current })
        handleUserSearch()
        // You can perform additional actions or updates here
      },
      // onError callback will be called when the mutation encounters an error
      onError: (error) => {
        console.error('Error posting data:', error);
        // You can handle errors or display error messages here
      },
    }
  );

  /**
   * @functions
   */

  const setRescurerDetail = (data, reset) => {
    if (reset) {
      form.setFieldsValue({
        rescurer_name: undefined,
        rescurer_mob_no: form.getFieldValue('search_care_people'),
        rescurer_alt_mob_no: undefined,
        rescurer_address: undefined
      })
      return
    }

    const { name, mob_no, alt_mob_no, address, id } = data
    form.setFieldsValue({
      rescurer_name: name,
      rescurer_mob_no: mob_no,
      rescurer_alt_mob_no: alt_mob_no,
      rescurer_address: address,
      care_people_id: id
    })
  }

  const handleUserSearch = async () => {
    // Trigger the query when the "Search" button is clicked
    let response = await careUserReFetch(AUTH_TOKEN, form.getFieldValue('search_care_people'));
    if (response.data.data.length) {
      const rescurerData = response.data.data[0]
      createNotification("success", {
        title: "Detail fetched",
        message: "Rescurer details found",
      });
      setRescurerDetail(rescurerData, false)
      rescurerExistRef.current = true
    } else {
      createNotification("error", {
        title: "No detail found",
        message: "Not an existing rescurer",
      });
      setRescurerDetail(null, true)
      rescurerExistRef.current = false
    }
  };

  const addUserDetail = () => {
    let formData = form.getFieldValue()
    const { rescurer_name, rescurer_mob_no, rescurer_alt_mob_no, rescurer_address } = formData

    rescurerNumberRef.current = rescurer_mob_no

    let payload = {
      name: rescurer_name,
      mob_no: rescurer_mob_no,
      alt_mob_no: rescurer_alt_mob_no,
      address: rescurer_address,
      created_by: USER_ID,
    }
    addUserMutation(payload);
  }


  return (
    <div>
      <h3>Rescuer Details</h3>
      <div className='divider' />

      <Row gutter={[10, 10]}>
        <Col span={8}>
          <Form.Item name="search_care_people" label="Search user by Contact no">
            <InputNumber className='cs-w-100' placeholder='Contact no' />
          </Form.Item>
        </Col>
        <Col span={8} className='cs-dis-flex cs-vt-center' >
          <Button onClick={handleUserSearch}>
            Search
          </Button>
        </Col>
      </Row>
      {rescurerExistRef.current !== null &&
        <Row gutter={[10, 10]}>
          <Col span={8}>
            <Form.Item name="rescurer_name" label="Name">
              <Input disabled={rescurerExistRef.current} placeholder='Name of rescuer' />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item name="rescurer_mob_no" label="Contact no">
              <InputNumber disabled={rescurerExistRef.current} className='cs-w-100' placeholder='Contact no' />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item name="rescurer_alt_mob_no" label="Alternative contact no">
              <InputNumber disabled={rescurerExistRef.current} className='cs-w-100' placeholder='Alternative contact no' />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item name="rescurer_address" label="Rescurer Address">
              <Input.TextArea disabled={rescurerExistRef.current} className='cs-w-100' placeholder='Rescurer Address' />
            </Form.Item>
          </Col>
          <Form.Item name="care_people_id">

          </Form.Item>
          {rescurerExistRef.current === false &&
            <Col span={8} className='cs-dis-flex cs-vt-center'>
              <div>
                <Button onClick={addUserDetail}>
                  Add rescurer detail
                </Button>
              </div>
            </Col>
          }
        </Row>
      }

    </div>
  )
}

export default RescuerDetail