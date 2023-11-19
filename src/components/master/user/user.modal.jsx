import { Modal, Row, Col, Form, Input, message, Select } from "antd";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../constants/server";
import { handleLogout } from "../../../global/function.global";
import { createNotification } from "../../../utils/notify";
import { useQuery, useMutation } from 'react-query';
import { addTolfaUser } from "../../../services/master_service";

const UserRole = ({
  isModalOpen,
  setIsModalOpen,
  getTableData,
  messageApi,
  userRoles,
}) => {
  const USER_ID = localStorage.getItem("user_id");
  const AUTH_TOKEN = localStorage.getItem('auth_token');

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (value) => {
    let payload = {
      ...value,
      created_by: USER_ID,
    };
    addTolfaUserMutation(payload)
  };

  /**
 * @Function
 */
  const { mutate: addTolfaUserMutation, isLoading, isError, isSuccess } = useMutation(
    (formData) => addTolfaUser(AUTH_TOKEN, formData),
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
        title="Add user"
        open={isModalOpen}
        onCancel={handleCancel}
        okText="Submit"
        okButtonProps={{ loading: loading }}
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
              <Input placeholder="Enter name of user" />
            </Form.Item>

            <Form.Item
              name="phone_no"
              rules={[
                {
                  required: true,
                  message: "Please enter value!",
                },
              ]}
            >
              <Input type="number" placeholder="Enter phone no of user" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter value!",
                },
              ]}
            >
              <Input placeholder="Enter email of user" />
            </Form.Item>

            <Form.Item
              label="User role"
              name="role_data"
              rules={[
                {
                  required: true,
                  message: "Please enter value!",
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Select User role"
                style={{ width: "100%" }}
                options={userRoles.map((item, index) => {
                  return {
                    value: item.id,
                    label: item.name,
                  };
                })}
              />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};
export default UserRole;
