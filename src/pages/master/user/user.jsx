import React, { useState, useEffect } from "react";
import { Button, Table, message } from "antd";
import { userColumn } from "../../../columns/master/user/user.column";
import axios from "axios";
import { BASE_URL } from "../../../constants/server";
import UserModal from "../../../components/master/user/user.modal";
import Loader from "../../../components/loader/loader";
import { handleLogout } from "../../../global/function.global";

const User = () => {
  const USER_TOKEN = sessionStorage.getItem("user_token");
  const USER_ID = localStorage.getItem("user_id");

  const [messageApi, contextHolder] = message.useMessage();
  const [rowData, setRowData] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    getTableData();
  }, []);

  const getTableData = async () => {
    try {
      let response = await axios.get(BASE_URL + `/user?token=${USER_TOKEN}`);
      console.log("response.data", response.data);
      setTableData(response.data.data.data);
      getUserRole();
      //   setLoading(false);
    } catch (error) {
      if (error.response.data.code === 401) {
        handleLogout();
      }
      console.log("error", error);
      setLoading(false);
    }
  };

  const getUserRole = async () => {
    try {
      let response = await axios.get(
        BASE_URL + `/role/get?token=${USER_TOKEN}&user_id=${USER_ID}`
      );
      console.log("response.data", response.data);
      setUserRoles(response.data.data);
      setLoading(false);
    } catch (error) {
      if (error.response.data.code === 401) {
        handleLogout();
      }
      console.log("error", error);
      setLoading(false);
    }
  };

  const handleOnAdd = () => {
    setIsModalOpen(true);
  };

  return !loading ? (
    <div>
      {contextHolder}
      <div className="cs-dis-flex cs-jc-end cs-m-10">
        <Button className="cs-theme-button" onClick={handleOnAdd}>
          Add user
        </Button>
      </div>

      <div className="cs-tm-20">
        <Table
          dataSource={tableData}
          columns={userColumn()}
          scroll={{ x: 1300, y: "calc(100vh - 430px)" }}
        />
      </div>

      {isModalOpen ? (
        <UserModal
          rowData={rowData}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          getTableData={getTableData}
          messageApi={messageApi}
          userRoles={userRoles}
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
