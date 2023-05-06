import React, { useState, useEffect } from "react";
import { Button, Table, message } from "antd";
import { userRoleColumn } from "../../../columns/master/user/user.column";
import axios from "axios";
import { BASE_URL } from "../../../constants/server";
import UserRoleModal from "../../../components/master/user/userRole.modal";
import Loader from "../../../components/loader/loader";
import { handleLogout } from "../../../global/function.global";

const UserRole = () => {
  const USER_TOKEN = sessionStorage.getItem("user_token");
  const USER_ID = localStorage.getItem("user_id");

  const [messageApi, contextHolder] = message.useMessage();
  const [rowData, setRowData] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTableData();
  }, []);

  const getTableData = async () => {
    try {
      let response = await axios.get(
        BASE_URL + `/role/get?token=${USER_TOKEN}&user_id=${USER_ID}`
      );
      console.log("response.data", response.data);
      setTableData(response.data.data);
      setLoading(false);
    } catch (error) {
      if (error.response.data.code === 401) {
        handleLogout();
      }
      console.log("error", error);
      setLoading(false);
    }
  };

  const handleOnAddAdmission = () => {
    setIsModalOpen(true);
  };

  const handleDelete = async (data) => {
    try {
      let response = await axios.put(
        BASE_URL + `/role/delete/${data.id}?token=${USER_TOKEN}`
      );
      messageApi.open({
        type: "success",
        content: response.data.message,
      });
      getTableData();
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

  return !loading ? (
    <div>
      {contextHolder}
      <div className="cs-dis-flex cs-jc-end cs-m-10">
        <Button className="cs-theme-button" onClick={handleOnAddAdmission}>
          Add role
        </Button>
      </div>

      <div className="cs-tm-20">
        <Table
          dataSource={tableData}
          columns={userRoleColumn(handleDelete, handleUpdate)}
          scroll={{ x: 1300, y: "calc(100vh - 430px)" }}
        />
      </div>

      {isModalOpen ? (
        <UserRoleModal
          rowData={rowData}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          getTableData={getTableData}
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
