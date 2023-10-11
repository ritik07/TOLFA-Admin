import React from "react";
import { Button, Form, Input, Checkbox, Row, Col, Card } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constant";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(BASE_URL + "auth/login", values);
      console.log("response", response.data.data.id);
      localStorage.setItem("user_id", JSON.stringify(response.data.data.id));
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

        <div className="cs-dis-flex cs-hrz-center cs-vt-center">Login</div>
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
            label="Mobile number"
            name="mobno"
            rules={[
              {
                required: true,
                message: "Please input your mobile number!",
              },
            ]}
          >
            <Input />
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
            <Input type="password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>

        <div className="cs-dis-flex cs-hrz-center cs-vt-center">
          <h3 onClick={() => navigate("/signup")}>New user? signup</h3>
        </div>

        <div className="cs-dis-flex cs-hrz-center cs-vt-center">
          <h3 onClick={() => navigate("/home")}>Skip login? Enter as guest</h3>
        </div>
      </Card>
    </div>
  );
};

export default Login;
