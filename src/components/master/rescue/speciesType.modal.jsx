import { useState, useEffect } from "react";
import { Modal, Row, Col, Form, Input, message, Select } from "antd";
import axios from "axios";
import { BASE_URL } from "../../../constants/server";
import { handleLogout } from "../../../global/function.global";

const ModalSpeciesType = ({
  isModalOpen,
  setIsModalOpen,
  getTableData,
  messageApi,
  rescueTypeData,
  rowData
}) => {
  const USER_ID = localStorage.getItem("user_id");
  const AUTH_TOKEN = localStorage.getItem('auth_token');

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (rowData) {
      form.setFieldsValue(rowData)
    }
  }, [])

  const handleCancel = () => {
    setIsModalOpen(undefined, false);
  };

  const onSubmit = async (value) => {
    try {
      let payload = {
        ...rowData,
        ...value,
        created_by: USER_ID,
      };
      // return console.log("payload", payload);
      setLoading(true);
      let URL = BASE_URL + `/species-type/${rowData ? "update" : "create"}`
      let response
      if (!rowData) {
        response = await axios.post(
          URL,
          payload, { headers: { auth_token: AUTH_TOKEN }, }
        );
      } else {
        response = await axios.put(
          URL,
          payload, { headers: { auth_token: AUTH_TOKEN }, }
        );

      }
      console.log("response", response);
      messageApi.open({
        type: "success",
        content: response.data.message,
      });
      getTableData();
      setLoading(false);
      setIsModalOpen(undefined, false);
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
        title={`${rowData ? "Update" : "Add"} Species type`}
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
