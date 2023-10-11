import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Checkbox, Col, Form, Input, Row } from "antd";
import loginImage from "./assets/images/login-img.png";
const Login = () => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (localStorage.getItem("user_id")) {
  //     navigate("/home");
  //   }
  // }, []);
  return (
    <div className="cs-100vh cs-dis-grid cs-vt-center">
      <div>
        <Row gutter={[20, 20]} className="cs-w-100">
          <Col xl={14} sm={24}>
            <div className="cs-dis-flex cs-hrz-center">
              <img src={loginImage} />
            </div>
          </Col>

          <Col xl={10} sm={24}>
            <Card>
              <div>
                <h1>Sign Up Your Account</h1>
                {/* <h3>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  ipsam labore dolore sunt laudantium aperiam.
                </h3> */}

                <Form layout="vertical">
                  <Row gutter={[10, 5]}>
                    <Col xl={12} sm={12}>
                      <Form.Item label="First Name">
                        <Input placeholder="First Name" />
                      </Form.Item>
                    </Col>

                    <Col xl={12} sm={12}>
                      <Form.Item label="Last Name">
                        <Input placeholder="Last Name" />
                      </Form.Item>
                    </Col>

                    <Col xl={24} sm={24}>
                      <Form.Item label="Email Address">
                        <Input placeholder="Email Address" />
                      </Form.Item>
                    </Col>

                    <Col xl={12} sm={12}>
                      <Form.Item label="Password">
                        <Input type="password" placeholder="Password" />
                      </Form.Item>
                    </Col>

                    <Col xl={12} sm={12}>
                      <Form.Item label="Confirm Password">
                        <Input type="password" placeholder="Confirm Password" />
                      </Form.Item>
                    </Col>

                    <Col xl={24} sm={24}>
                      <Form.Item>
                        <Row gutter={[10, 10]}>
                          <Col>
                            <Checkbox />
                          </Col>
                          <Col>
                            I agree with Licences Info, Terms of Service ,
                            Privacy Policy
                          </Col>
                        </Row>
                      </Form.Item>
                    </Col>

                    <Col xl={24} sm={24}>
                      <Button className="cs-w-100 cs-clr-cyan">Sign up</Button>
                    </Col>
                  </Row>
                </Form>
                <div className="cs-dis-flex cs-hrz-center cs-tm-10">
                  <h3>Already Have An Account? Login Now</h3>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Login;
