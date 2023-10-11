import React from 'react';
import { Button, Drawer, Form, Input, InputNumber, Select } from 'antd';

const { Option } = Select;


function isValidMobileNumber(input) {
  // Regular expression pattern for a valid Indian mobile number
  const mobileNumberPattern = /^[6-9]\d{9}$/;

  return mobileNumberPattern.test(input);
}

const AddNewAddress = ({ open, setOpen, setAddressList }) => {
  let getAddressList = JSON.parse(localStorage.getItem('addressList'))
  const [form] = Form.useForm();


  const onClose = () => {
    setOpen(false);
  };
  const stateNames = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
    'Andaman and Nicobar Islands',
    'Chandigarh',
    'Dadra and Nagar Haveli and Daman and Diu',
    'Lakshadweep',
    'Delhi',
    'Puducherry',
  ];

  const onFinish = (values) => {
    // console.log('Received values:', values);
    let tempAddressData = getAddressList ? getAddressList : []
    // console.log("tempAddressData", tempAddressData);
    tempAddressData.push({ ...values, active: !tempAddressData.length })
    // console.log("tempAddressData", tempAddressData);
    setOpen(false)
    setAddressList(tempAddressData)
    localStorage.setItem('addressList', JSON.stringify(tempAddressData))
    // Here you can add logic to save the form data to your backend or perform other actions.
  };

  return (
    <div>
      <Drawer
        title="Add new address"
        width={320}
        closable={false}
        onClose={onClose}
        open={open}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            required
            label="Full name"
            name="name"
            rules={[{ required: true, message: 'Required field!' }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>

          <Form.Item
            required
            label="Mobile number"
            name="mobno"
            rules={[
              {
                required: true,
                message: 'Please enter your mobile number',
              },
              {
                validator: (_, value) => isValidMobileNumber(value) ? Promise.resolve() : Promise.reject('Invalid mobile number'),
              },
            ]}
          >
            <InputNumber style={{ width: '100%' }} placeholder="Enter mobile number" />
          </Form.Item>

          <Form.Item
            required
            label="Pincode"
            name="pincode"
            rules={[{ required: true, message: 'Required field!' }]}
          >
            <InputNumber style={{ width: '100%' }} placeholder="Enter pincode" />
          </Form.Item>

          <Form.Item
            required
            label="Flat, House no., Building, Company, Apartment"
            name="flat"
            rules={[{ required: true, message: 'Required field!' }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            required
            label="Area, Street, Sector, Village"
            name="area"
            rules={[{ required: true, message: 'Required field!' }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            required
            label="Landmark"
            name="landmark"
            rules={[{ required: true, message: 'Required field!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            required
            label="Town/City"
            name="city"
            rules={[{ required: true, message: 'Required field!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            required
            label="Select State"
            name="state"
            rules={[{ required: true, message: 'Required field!' }]}
          >
            <Select style={{ width: '100%' }} placeholder="Select a state">
              {stateNames.map((state) => (
                <Option key={state} value={state}>
                  {state}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Add a "Save" button */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default AddNewAddress;
