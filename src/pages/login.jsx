import React, { useState } from "react";
import { Card, Row, Col, Form, Input, Button } from "antd";
import axios from "axios";
import { BASE_URL } from "../constants/server";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserProfile } from "../redux/actions/userProfile";

const Login = () => {
  /**
   * @redux
   */
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (value) => {

    try {
      setLoading(true);
      let response = await axios.post(BASE_URL + "/auth/login", value);
      let userId = JSON.stringify(response.data.data.id);
      getUserDetails(userId)
      syncLocalStoreage(userId)
      syncSessionStorage(response.data.data.token)
      setTimeout(() => {
        navigate("/home");
      }, 100);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const syncLocalStoreage = (userId) => {
    localStorage.setItem("user_id", userId);
    localStorage.setItem("logged_in", true);
  }

  const syncSessionStorage = (token) => {
    sessionStorage.setItem("user_token", token);
    localStorage.setItem("auth_token", token);
  }

  const getUserDetails = async (userId) => {
    try {
      setLoading(true);
      let userResponse = await axios.get(BASE_URL + "/user/" + userId);

      dispatch(setUserProfile(userResponse.data.data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
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
