import { Modal, Row, Col, Form, Input, message } from "antd";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../constants/server";
import { handleLogout } from "../../../global/function.global";
import { defaultCaching } from '../../../constants/conifg'
import { createNotification } from '../../../utils/notify';
import { addAnimalStatus } from "../../../services/master_service";
import { useMutation } from "react-query";

const ModalStatus = ({
  isModalOpen,
  setIsModalOpen,
  getTableData,
  messageApi,
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
    addAnimalStatusMutation(payload)
  };

  /**
 * @Function
 */
  const { mutate: addAnimalStatusMutation, isLoading, isError, isSuccess } = useMutation(
    (formData) => addAnimalStatus(AUTH_TOKEN, formData),
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
        title="Add status"
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
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter value!",
                },
              ]}
            >
              <Input placeholder="Enter value of status" />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};
export default ModalStatus;
