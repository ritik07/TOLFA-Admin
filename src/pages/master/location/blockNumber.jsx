import React, { useState, useEffect } from "react";
import { Button, Table, message } from "antd";
import { cityColumn } from "../../../columns/master/location/city.column";
import axios from "axios";
import { BASE_URL } from "../../../constants/server";
import Loader from "../../../components/loader/loader";
import { handleLogout } from "../../../global/function.global";
import ModalBlockNumber from "../../../components/master/location/blockNumber.modal";

const BlockNumber = () => {
  const USER_TOKEN = sessionStorage.getItem("user_token");

  const [messageApi, contextHolder] = message.useMessage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [areaData, setAreaData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getTableData();
  }, []);

  const getTableData = async () => {
    try {
      let response = await axios.get(BASE_URL + `/block-number?token=${USER_TOKEN}`);
      console.log("response.data", response.data);
      setTableData(response.data.data);
      getAreaData();
      //   setLoading(false);
    } catch (error) {
      if (error.response.data.code === 401) {
        handleLogout();
      }
      setError(error.response.data.message);
      console.log("error", error);
      setLoading(false);
    }
  };

  const getAreaData = async () => {
    try {
      let response = await axios.get(BASE_URL + `/area?token=${USER_TOKEN}`);
      console.log("response.data", response.data);
      setAreaData(response.data.data);
      setLoading(false);
    } catch (error) {
      if (error.response.data.code === 401) {
        handleLogout();
      }
      setError(error.response.data.message);
      console.log("error", error);
      setLoading(false);
    }
  };

  const handleOnAddAdmission = () => {
    setIsModalOpen(true);
  };

  return !loading ? (
    !error ? (
      <div>
        {contextHolder}
        <div className="cs-dis-flex cs-jc-end cs-m-10">
          <Button className="cs-theme-button" onClick={handleOnAddAdmission}>
            Add block number
          </Button>
        </div>

        <div className="cs-tm-20">
          <Table
            dataSource={tableData}
            columns={cityColumn()}
            scroll={{ x: 1300, y: "calc(100vh - 430px)" }}
          />
        </div>

        {isModalOpen ? (
          <ModalBlockNumber
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            getTableData={getTableData}
            messageApi={messageApi}
            areaData={areaData}
          />
        ) : null}
      </div>
    ) : (
      <div className="cs-dis-flex cs-hrz-center cs-vt-center cs-h-100vh">
        <h3> Something went wrong! Please try again later</h3>
      </div>
    )
  ) : (
    <div className="cs-dis-flex cs-hrz-center cs-vt-center cs-h-100vh">
      <Loader />
    </div>
  );
};

export default BlockNumber;
