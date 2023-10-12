import React, { useState, useEffect } from "react";
import { Button, Table, message } from "antd";
import { cityColumn } from "../../../columns/master/location/city.column";
import axios from "axios";
import { BASE_URL } from "../../../constants/server";
import Loader from "../../../components/loader/loader";
import { handleLogout } from "../../../global/function.global";
import ModalCity from "../../../components/master/location/city.modal";

const City = () => {
  const USER_TOKEN = sessionStorage.getItem("user_token");

  const [messageApi, contextHolder] = message.useMessage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stateData, setStateData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getTableData();
  }, []);

  const getTableData = async () => {
    try {
      let response = await axios.get(BASE_URL + `/city?token=${USER_TOKEN}`);
      console.log("response.data", response.data);
      setTableData(response.data.data);
      getStateData();
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

  const getStateData = async () => {
    try {
      let response = await axios.get(BASE_URL + `/state?token=${USER_TOKEN}`);
      console.log("response.data", response.data);
      setStateData(response.data.data);
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
            Add city
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
          <ModalCity
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            getTableData={getTableData}
            messageApi={messageApi}
            stateData={stateData}
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

export default City;
