import React, { useState, useEffect } from "react";
import { Button, Table, message } from "antd";
import { speciesColumn } from "../../../columns/master/rescue/species.column";
import axios from "axios";
import { BASE_URL } from "../../../constants/server";
import Loader from "../../../components/loader/loader";
import { handleLogout } from "../../../global/function.global";
import ModalBreed from "../../../components/master/animal/breed.modal";
import { useQuery, useMutation } from 'react-query';
import { defaultCaching } from '../../../constants/conifg'
import { fetchBreedListData, fetchSpeciesTypeData } from "../../../services/master_service";
import { breedColumn } from "./breed.column";

const Breed = () => {
  const USER_TOKEN = sessionStorage.getItem("user_token");
  const AUTH_TOKEN = localStorage.getItem('auth_token');

  const [messageApi, contextHolder] = message.useMessage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [breedTypeData, setBreedTypeData] = useState([]);



  /**
   * @common_function
   */

  const handleQueryError = (error) => {
    if (error.response?.data?.code === 401) {
      handleLogout();
    }
  };


  // Define a query for tolfa breed list data
  const { data: breedListData, isLoading: breedListLoading, isError: breedListError, refetch: refetchBreedListData } = useQuery(
    'breedListData',
    () => fetchBreedListData(AUTH_TOKEN),
    {
      ...defaultCaching,
      onError: handleQueryError,
    }
  );

  // Define a query for species type data
  const { data: speciesTypeData, isLoading: speciesTypeLoading, isError: speciesTypeError } = useQuery(
    'speciesTypeData',
    () => fetchSpeciesTypeData(AUTH_TOKEN),
    {
      ...defaultCaching,
      onError: handleQueryError,
    }
  );

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

  return !breedListLoading ? (
    <div>
      {contextHolder}
      <div className="cs-dis-flex cs-jc-end cs-m-10">
        <Button className="cs-theme-button" onClick={handleOnAddAdmission}>
          Add breed
        </Button>
      </div>

      <div className="cs-tm-20">
        <Table
          dataSource={breedListData.data}
          columns={breedColumn()}
          scroll={{ x: 1300, y: "calc(100vh - 430px)" }}
        />
      </div>

      {isModalOpen ? (
        <ModalBreed
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          getTableData={refetchBreedListData}
          messageApi={messageApi}
          breedTypeData={speciesTypeData.data}
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
