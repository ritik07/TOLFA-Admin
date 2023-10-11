import React from "react";
import { Button, Form, Input, Checkbox, Row, Col, Card } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constant";

const Signup = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(BASE_URL + "auth/signup", values);
      console.log("response", response.data.data.user_id);
      localStorage.setItem("user_id", JSON.stringify(response.data.data.user_id));
      navigate("/home");
    } catch (error) {
      console.log("error", error);
    }
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Card>
        <div className="cs-dis-flex cs-hrz-center cs-vt-center">
          <h3>Welcome to Doggiesthan</h3>
        </div>

        <div className="cs-dis-flex cs-hrz-center cs-vt-center">
          User signup
        </div>
        <Form
          layout="vertical"
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item
            label="Mobile number"
            name="mobno"
            rules={[
              {
                required: true,
                message: "Please input your number!",
              },
            ]}
          >
            <Input type="number" placeholder="Enter your mobile number" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input type="password" placeholder="Enter password" />
          </Form.Item>

          <Form.Item
            label="Pin code"
            name="pincode"
            rules={[
              {
                required: true,
                message: "Please input your pin code!",
              },
            ]}
          >
            <Input placeholder="Enter pin code" />
          </Form.Item>

          <Form.Item
            label="State"
            name="state"
            rules={[
              {
                required: true,
                message: "Please input your state!",
              },
            ]}
          >
            <Input placeholder="Enter state" />
          </Form.Item>

          <Form.Item
            label="City"
            name="city"
            rules={[
              {
                required: true,
                message: "Please input your city name!",
              },
            ]}
          >
            <Input placeholder="Enter city name" />
          </Form.Item>

          <Form.Item
            label="Landmark"
            name="landmark"
            rules={[
              {
                required: true,
                message: "Please input landmark!",
              },
            ]}
          >
            <Input placeholder="Enter landmark" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input address!",
              },
            ]}
          >
            <Input.TextArea placeholder="Enter address" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Signup
            </Button>
          </Form.Item>
        </Form>

        <div className="cs-dis-flex cs-hrz-center cs-vt-center">
          <h3 onClick={() => navigate("/home")}>Skip login? Enter as guest</h3>
        </div>
      </Card>
    </div>
  );
};

export default Signup;
