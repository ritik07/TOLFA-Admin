import { Modal, Row, Col, Form, Input, message, Select } from "antd";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../constants/server";
import { handleLogout } from "../../../global/function.global";
import { useQuery, useMutation } from 'react-query';
import { createNotification } from "../../../utils/notify";
import { addBreed } from "../../../services/master_service";

const ModalBreed = ({
  isModalOpen,
  setIsModalOpen,
  getTableData,
  messageApi,
  breedTypeData,
}) => {
  const USER_ID = localStorage.getItem("user_id");
  const USER_TOKEN = sessionStorage.getItem("user_token");
  const AUTH_TOKEN = localStorage.getItem('auth_token');

  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (value) => {
    let payload = {
      ...value,
      created_by: USER_ID,
    };
    addBreedMutation(payload)
  };

  /**
   * @Function
   */
  const { mutate: addBreedMutation, isLoading, isError, isSuccess } = useMutation(
    (formData) => addBreed(AUTH_TOKEN, formData),
    {
      // onSuccess callback will be called when the mutation is successful
      onSuccess: () => {
        createNotification("success", {
          title: "Detail added",
          message: "Record added",
        });
        form.resetFields()
        message.success("Record added!!")
        getTableData();
        setIsModalOpen(false);
        // You can perform additional actions or updates here
      },
      // onError callback will be called when the mutation encounters an error
      onError: (error) => {
        console.error('Error posting data:', error);
        // You can handle errors or display error messages here
      },
    }
  );

  return (
    <>
      <Modal
        maskClosable={false}
        title="Add Species type"
        open={isModalOpen}
        onCancel={handleCancel}
        okText="Submit"
        okButtonProps={{ loading: isLoading }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              onSubmit(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      // width={"80%"}
      >
        <div>
          <Form layout="vertical" form={form}>
            <Form.Item
              label="Species type"
              name="species_id"
              rules={[
                {
                  required: true,
                  message: "Please enter value!",
                },
              ]}
            >
              <Select
                placeholder="Select species type"
                style={{ width: "100%" }}
                options={breedTypeData.map((item, index) => {
                  return {
                    value: item.id,
                    label: item.name,
                  };
                })}
              />
            </Form.Item>

            <Form.Item
              name="name"
              label="Breed name"
              rules={[
                {
                  required: true,
                  message: "Please enter value!",
                },
              ]}
            >
              <Input placeholder="Enter value of type of breed" />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};
export default ModalBreed;
