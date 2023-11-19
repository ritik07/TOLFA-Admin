import React, { useState, useEffect } from "react";
import { Button, Table, message } from "antd";
import { cityColumn } from "../../../columns/master/location/city.column";
import axios from "axios";
import { BASE_URL } from "../../../constants/server";
import Loader from "../../../components/loader/loader";
import { handleLogout } from "../../../global/function.global";
import ModalCity from "../../../components/master/location/city.modal";
import { fetchCityListData, fetchStateListData } from "../../../services/master_service";
import { useQuery, useMutation } from 'react-query';
import { LongerCaching } from '../../../constants/conifg'

const City = () => {
  const AUTH_TOKEN = localStorage.getItem('auth_token');
  const USER_ID = localStorage.getItem("user_id");

  const [messageApi, contextHolder] = message.useMessage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);


  /**
   * @common_function
   */

  const handleQueryError = (error) => {
    if (error.response?.data?.code === 401) {
      handleLogout();
    }
  };

  // Define a query for city list data
  const { data: cityListData, isLoading: cityListLoading, isError: cityListError, refetch: refetchCityListData } = useQuery(
    'cityListData',
    () => fetchCityListData(AUTH_TOKEN),
    {
      ...LongerCaching,
      onError: handleQueryError,
    }
  );


  // Define a query for state list data
  const { data: stateListData, isLoading: stateListLoading, isError: stateListError, refetch: refetchStateListData } = useQuery(
    'stateListData',
    () => fetchStateListData(AUTH_TOKEN),
    {
      ...LongerCaching,
      onError: handleQueryError,
    }
  );

  const handleOnAddAdmission = () => {
    setIsModalOpen(true);
  };

  const overallLoading = !stateListLoading && !cityListLoading

  return overallLoading ?
    <div>
      {contextHolder}
      <div className="cs-dis-flex cs-jc-end cs-m-10">
        <Button className="cs-theme-button" onClick={handleOnAddAdmission}>
          Add city
        </Button>
      </div>

      <div className="cs-tm-20">
        <Table
          dataSource={cityListData.data}
          columns={cityColumn()}
          scroll={{ x: 1300, y: "calc(100vh - 430px)" }}
        />
      </div>

      {isModalOpen ? (
        <ModalCity
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          getTableData={refetchCityListData}
          messageApi={messageApi}
          stateData={stateListData.data}
        />
      ) : null}
    </div>
    : (
      <div className="cs-dis-flex cs-hrz-center cs-vt-center cs-h-100vh">
        <Loader />
      </div>
    );
};

export default City;
