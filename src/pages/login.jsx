import React, { useState } from "react";
import { Card, Row, Col, Form, Input, Button } from "antd";
import axios from "axios";
import { BASE_URL } from "../constants/server";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (value) => {
    try {
      setLoading(true);
      let response = await axios.post(BASE_URL + "/auth/login", value);
      console.log("response", response.data.data);
      let storeDetail = JSON.stringify(response.data.data.id);
      sessionStorage.setItem("user_token", response.data.data.token);
      localStorage.setItem("user_id", storeDetail);
      console.log("storeDetail set", storeDetail);
      localStorage.setItem("logged_in", true);
      setTimeout(() => {
        navigate("/home");
      }, 100);
      setLoading(false);
      console.log("value", value);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="cs-h-100 cs-dis-flex cs-hrz-center cs-vt-center">
        <Row>
          <Col xl={24}>
            <Card>
              <div className="cs-login-title">
                <h1>LOGIN</h1>
              </div>
              <div className="cs-login-title">
                <h2>Please login to continue</h2>
              </div>

              <Form layout="vertical" form={form} onFinish={login}>
                <Form.Item
                  name="phone_no"
                  rules={[
                    {
                      required: true,
                      message: "Please enter value!",
                    },
                  ]}
                >
                  <Input placeholder="Enter your phone no" />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please enter value!",
                    },
                  ]}
                >
                  <Input type="password" placeholder="Enter your password" />
                </Form.Item>
                <Form.Item>
                  <Button loading={loading} type="primary" htmlType="submit">
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Login;
