import React, { useState, useEffect } from "react";
import { Button, Table, message } from "antd";
import { speciesColumn } from "../../../columns/master/rescue/species.column";
import axios from "axios";
import { BASE_URL } from "../../../constants/server";
import Loader from "../../../components/loader/loader";
import { handleLogout } from "../../../global/function.global";
import ModalSpeciesType from "../../../components/master/rescue/speciesType.modal";
import ModalBreed from "../../../components/master/animal/breed.modal";

const Breed = () => {
  const USER_TOKEN = sessionStorage.getItem("user_token");

  const [messageApi, contextHolder] = message.useMessage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [breedTypeData, setBreedTypeData] = useState([]);

  useEffect(() => {
    getTableData();
  }, []);

  const getTableData = async () => {
    try {
      let response = await axios.get(
        BASE_URL + `/breed?token=${USER_TOKEN}`
      );
      console.log("response.data", response.data);
      setTableData(response.data.data);
      getSpeciesTypeTypeData();
      //   setLoading(false);
    } catch (error) {
      if (error.response.data.code === 401) {
        handleLogout();
      }
      console.log("error", error);
      setLoading(false);
    }
  };

  const getSpeciesTypeTypeData = async () => {
    try {
      let response = await axios.get(
        BASE_URL + `/species-type?token=${USER_TOKEN}`
      );
      console.log("response.data", response.data);
      setBreedTypeData(response.data.data);
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
          Add breed
        </Button>
      </div>

      <div className="cs-tm-20">
        <Table
          dataSource={tableData}
          columns={speciesColumn()}
          scroll={{ x: 1300, y: "calc(100vh - 430px)" }}
        />
      </div>

      {isModalOpen ? (
        <ModalBreed
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          getTableData={getTableData}
          messageApi={messageApi}
          breedTypeData={breedTypeData}
        />
      ) : null}
    </div>
  ) : (
    <div className="cs-dis-flex cs-hrz-center cs-vt-center cs-h-100vh">
      <Loader />
    </div>
  );
};

export default Breed;
