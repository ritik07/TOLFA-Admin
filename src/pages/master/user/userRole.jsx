import React, { useState, useEffect } from "react";
import { Button, Table, message } from "antd";
import { userRoleColumn } from "../../../columns/master/user/user.column";
import axios from "axios";
import { BASE_URL } from "../../../constants/server";
import UserRoleModal from "../../../components/master/user/userRole.modal";
import Loader from "../../../components/loader/loader";
import { handleLogout } from "../../../global/function.global";
import { defaultCaching } from '../../../constants/conifg'
import { useQuery } from 'react-query';
import { fetchTolfaStaffRoleListData } from "../../../services/master_service";

const UserRole = () => {
  const AUTH_TOKEN = localStorage.getItem('auth_token');
  const USER_TOKEN = sessionStorage.getItem("user_token");
  const USER_ID = localStorage.getItem("user_id");

  const [messageApi, contextHolder] = message.useMessage();
  const [rowData, setRowData] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleOnAddAdmission = () => {
    setIsModalOpen(true);
  };

  /**
 * @common_function
 */
  const handleQueryError = (error) => {
    if (error.response?.data?.code === 401) {
      handleLogout();
    }
  };

  // Define a query for rescue type data
  const { data: staffListRoleData, isLoading: staffListRoleLoading, isError: staffListRoleError, refetch: refetchStaffListRoleData } = useQuery(
    'staffListRoleData',
    () => fetchTolfaStaffRoleListData(AUTH_TOKEN),
    {
      ...defaultCaching,
      onError: handleQueryError,
    }
  );

  const handleDelete = async (data) => {
    try {
      let response = await axios.put(
        BASE_URL + `/role/delete/${data.id}`, { headers: { auth_token: AUTH_TOKEN }, }
      );
      messageApi.open({
        type: "success",
        content: response.data.message,
      });
      refetchStaffListRoleData();
    } catch (error) {
      if (error.response.data.code === 401) {
        handleLogout();
      }
      console.log("error", error);
    }
  };

  const handleUpdate = (data) => {
    setRowData(data);
    setIsModalOpen(true);
  };

  return !staffListRoleLoading ? (
    <div>
      {contextHolder}
      <div className="cs-dis-flex cs-jc-end cs-m-10">
        <Button className="cs-theme-button" onClick={handleOnAddAdmission}>
          Add role
        </Button>
      </div>

      <div className="cs-tm-20">
        <Table
          dataSource={staffListRoleData.data}
          columns={userRoleColumn(handleDelete, handleUpdate)}
          scroll={{ x: 1300, y: "calc(100vh - 430px)" }}
        />
      </div>

      {isModalOpen ? (
        <UserRoleModal
          rowData={rowData}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          getTableData={refetchStaffListRoleData}
          messageApi={messageApi}
        />
      ) : null}
    </div>
  ) : (
    <div className="cs-dis-flex cs-hrz-center cs-vt-center cs-h-100vh">
      <Loader />
    </div>
  );
};

export default UserRole;
