import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { fetchAllCareUser, } from '../services/master_service';

const SelfAdmissions = () => {
  const [userData, setUserData] = useState([]);
  const token = localStorage.getItem('auth_token');

  const fetcher = async (token) => {
    try {
      const response = await fetchAllCareUser(token);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetcher(token);
  }, [token]);

  const columns = userData.length > 0 ? Object.keys(userData[0]).map((key) => ({
    title: key,
    dataIndex: key,
    key,
  })) : [];

  return (
    <Table dataSource={userData} columns={columns} />
  );
};

export default SelfAdmissions;
