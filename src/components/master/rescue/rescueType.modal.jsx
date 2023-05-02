import { Modal, Row, Col, Form, Input, message } from "antd";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../constants/server";
import { useSelector } from "react-redux";

const AddRescueType = ({
  isModalOpen,
  setIsModalOpen,
  getTableData,
  messageApi,
}) => {
  const login = useSelector((state) => state.userProfile.userProfile);
  console.log("login", login);
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (value) => {
    try {
      let payload = {
        ...value,
      };
      setLoading(true);
      let response = await axios.post(
        BASE_URL + "/rescue-type/create",
        payload
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
        title="Add rescue type"
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
              <Input placeholder="Enter value of type of rescue" />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};
export default AddRescueType;
