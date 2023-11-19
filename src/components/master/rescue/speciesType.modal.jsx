import { Modal, Row, Col, Form, Input, message, Select } from "antd";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../constants/server";
import { handleLogout } from "../../../global/function.global";

const ModalSpeciesType = ({
  isModalOpen,
  setIsModalOpen,
  getTableData,
  messageApi,
  rescueTypeData,
}) => {
  const USER_ID = localStorage.getItem("user_id");
  const AUTH_TOKEN = localStorage.getItem('auth_token');

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (value) => {
    try {
      let payload = {
        ...value,
        created_by: USER_ID,
      };
      setLoading(true);
      let response = await axios.post(
        BASE_URL + `/species-type/create`,
        payload, { headers: { auth_token: AUTH_TOKEN }, }
      );
      console.log("response", response);
      messageApi.open({
        type: "success",
        content: response.data.message,
      });
      getTableData();
      setLoading(false);
      setIsModalOpen(false);
    } catch (error) {
      if (error.response.data.code === 401) {
        handleLogout();
        return;
      }
      console.log("error", error);
      messageApi.open({
        type: "error",
        content: error.response.data.message,
      });

      setLoading(false);
      console.log("error", error);
    }
    console.log("value", value);
  };

  return (
    <>
      <Modal
        maskClosable={false}
        title="Add Species type"
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
              label="Rescue type"
              name="rescue_type_id"
              rules={[
                {
                  required: true,
                  message: "Please enter value!",
                },
              ]}
            >
              <Select
                placeholder="Select rescue type"
                style={{ width: "100%" }}
                options={rescueTypeData.map((item, index) => {
                  return {
                    value: item.id,
                    label: item.name,
                  };
                })}
              />
            </Form.Item>

            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter value!",
                },
              ]}
            >
              <Input placeholder="Enter value of type of rescue" />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};
export default ModalSpeciesType;
