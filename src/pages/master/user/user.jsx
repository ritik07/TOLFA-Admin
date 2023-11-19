import React, { useState, useEffect } from "react";
import { Button, Table, message } from "antd";
import { userColumn } from "../../../columns/master/user/user.column";
import axios from "axios";
import { BASE_URL } from "../../../constants/server";
import UserModal from "../../../components/master/user/user.modal";
import Loader from "../../../components/loader/loader";
import { useQuery } from 'react-query';
import { handleLogout } from "../../../global/function.global";
import { fetchTolfaStaffListData, fetchTolfaStaffRoleListData } from "../../../services/master_service";
import { defaultCaching } from '../../../constants/conifg'

const User = () => {
  const AUTH_TOKEN = localStorage.getItem('auth_token');
  const USER_ID = localStorage.getItem("user_id");

  const [messageApi, contextHolder] = message.useMessage();
  const [rowData, setRowData] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [userRoles, setUserRoles] = useState([]);

  /**
 * @common_function
 */
  const handleQueryError = (error) => {
    if (error.response?.data?.code === 401) {
      handleLogout();
    }
  };

  /**
 * @api_calls
 */

  // Define a query for rescue type data
  const { data: staffListData, isLoading: staffListLoading, isError: staffListError, refetch: refetchStaffListData } = useQuery(
    'staffListData',
    () => fetchTolfaStaffListData(AUTH_TOKEN),
    {
      ...defaultCaching,
      onError: handleQueryError,
    }
  );

  // Define a query for rescue type data
  const { data: staffListRoleData, isLoading: staffListRoleLoading, isError: staffListRoleError, refetch: refetchStaffListRoleData } = useQuery(
    'staffListRoleData',
    () => fetchTolfaStaffRoleListData(AUTH_TOKEN),
    {
      ...defaultCaching,
      onError: handleQueryError,
    }
  );

  const handleOnAdd = () => {
    setIsModalOpen(true);
  };

  const overallLoading = !staffListRoleLoading && !staffListLoading

  return overallLoading ? (
    <div>
      {contextHolder}
      <div className="cs-dis-flex cs-jc-end cs-m-10">
        <Button className="cs-theme-button" onClick={handleOnAdd}>
          Add user
        </Button>
      </div>

      <div className="cs-tm-20">
        <Table
          dataSource={staffListData.data}
          columns={userColumn()}
          scroll={{ x: 1300, y: "calc(100vh - 430px)" }}
        />
      </div>

      {isModalOpen ? (
        <UserModal
          rowData={rowData}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          getTableData={refetchStaffListData}
          messageApi={messageApi}
          userRoles={staffListRoleData.data}
        />
      ) : null}
    </div>
  ) : (
    <div className="cs-dis-flex cs-hrz-center cs-vt-center cs-h-100vh">
      <Loader />
    </div>
  );
};

export default User;
