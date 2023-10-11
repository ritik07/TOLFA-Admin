import React, { useState } from "react";
import { Button, Form, Input, Checkbox, Row, Col, Card } from "antd";
// import { PaytmButton } from "../../paytm-button/paytmButton";

const Address = () => {
  const [addressCompleted, setAddressCompleted] = useState(false);

  const onFinish = (values) => {
    setAddressCompleted(values);
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      {addressCompleted ? (
        <Card>
          {Object.keys(addressCompleted).map((key, index) => {
            return (
              <div key={index}>
                <div>
                  {key.toUpperCase()}:{" "}
                  <span style={{ fontWeight: 700 }}>
                    {addressCompleted[key]}
                  </span>
                </div>
              </div>
            );
          })}
          Price to pay: <span style={{ fontWeight: 700 }}>100</span>
          <div>
            Razor pay
            {/* <PaytmButton /> */}
          </div>
        </Card>
      ) : (
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
                message: "Please input your complete name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Row gutter={[15, 15]}>
            <Col span={12}>
              <Form.Item
                label="State"
                name="state"
                rules={[
                  {
                    required: true,
                    message: "Please enter your state!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Pin Code"
                name="pincode"
                rules={[
                  {
                    required: true,
                    message: "Please enter your pin code!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="City"
                name="city"
                rules={[
                  {
                    required: true,
                    message: "Please enter city name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Landmark"
                name="landmark"
                rules={[
                  {
                    required: true,
                    message: "Please enter your landmark!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please enter your address!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Mark as default address</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default Address;
