import React, { useState, useEffect } from "react";
import { Button, Table, message } from "antd";
import { areaColumn } from "../../../columns/master/location/area.column";
import axios from "axios";
import { BASE_URL } from "../../../constants/server";
import Loader from "../../../components/loader/loader";
import { handleLogout } from "../../../global/function.global";
import ModalArea from "../../../components/master/location/area.modal";

const Area = () => {
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
      let response = await axios.get(BASE_URL + `/area?token=${USER_TOKEN}`);
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
          Add area
        </Button>
      </div>

      <div className="cs-tm-20">
        <Table
          dataSource={tableData}
          columns={areaColumn()}
          scroll={{ x: 1300, y: "calc(100vh - 430px)" }}
        />
      </div>

      {isModalOpen ? (
        <ModalArea
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

export default Area;
