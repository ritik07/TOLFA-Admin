import React, { useState, useEffect } from "react";
import { Button, Table, message } from "antd";
import { rescueTypeColumn } from "../../../columns/master/rescue/rescueType.column";
import axios from "axios";
import { BASE_URL } from "../../../constants/server";
import AddRescueType from "../../../components/master/rescue/rescueType.modal";
import Loader from "../../../components/loader/loader";
import { handleLogout } from "../../../global/function.global";
import ModalStatus from "../../../components/master/animal/status.modal";

const Status = () => {
  const USER_TOKEN = sessionStorage.getItem("user_token");

  const [messageApi, contextHolder] = message.useMessage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTableData();
  }, []);

  const getTableData = async () => {
    try {
      let response = await axios.get(
        BASE_URL + `/animal-status?token=${USER_TOKEN}`
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

  return !loading ? (
    <div>
      {contextHolder}
      <div className="cs-dis-flex cs-jc-end cs-m-10">
        <Button className="cs-theme-button" onClick={handleOnAddAdmission}>
          Add status
        </Button>
      </div>

      <div className="cs-tm-20">
        <Table
          dataSource={tableData}
          columns={rescueTypeColumn()}
          scroll={{ x: 1300, y: "calc(100vh - 430px)" }}
        />
      </div>

      {isModalOpen ? (
        <ModalStatus
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

export default Status;
