import React from 'react';
import { Table } from 'antd';

const data = [
  {
    id: 1,
    name: 'Darshan',
    mob_no: '8005875401',
    alt_mob_no: '7891719896',
    address: 'ajmer',
    created_by: 'darshan',
    updated_by: 'darshan',
    created_at: '2023-10-25 10:00 AM',
    updated_at: '2023-10-25 2:30 PM',
  },
  {
    id: 2,
    name: 'Mundra',
    mob_no: '8005875401',
    alt_mob_no: '8005875401',
    address: 'kharekahri',
    created_by: 'User C',
    updated_by: 'User D',
    created_at: '2023-10-24 11:15 AM',
    updated_at: '2023-10-25 3:45 PM',
  },
 
];

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Mobile Number',
    dataIndex: 'mob_no',
    key: 'mob_no',
  },
  {
    title: 'Alternate Mobile Number',
    dataIndex: 'alt_mob_no',
    key: 'alt_mob_no',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Created By',
    dataIndex: 'created_by',
    key: 'created_by',
  },
  {
    title: 'Updated By',
    dataIndex: 'updated_by',
    key: 'updated_by',
  },
  {
    title: 'Created At',
    dataIndex: 'created_at',
    key: 'created_at',
  },
  {
    title: 'Updated At',
    dataIndex: 'updated_at',
    key: 'updated_at',
  },
];

const Caregiversdetails = () => {
  return (
    <Table dataSource={data} columns={columns} />
  );
};

export default Caregiversdetails;
