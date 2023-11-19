import React, { useState, useEffect } from "react";
import { Button, Table, message } from "antd";
import { cityAreaColumn } from "../../../columns/master/location/cityArea.column";
import Loader from "../../../components/loader/loader";
import { handleLogout } from "../../../global/function.global";
import ModalCityArea from "../../../components/master/location/cityArea.modal";
import { useQuery, useMutation } from 'react-query';
import { fetchCityAreaListData, fetchCityListData, fetchStateListData } from "../../../services/master_service";
import { LongerCaching } from '../../../constants/conifg'

const CityArea = () => {
  const AUTH_TOKEN = localStorage.getItem('auth_token');

  const [messageApi, contextHolder] = message.useMessage();

  const [isModalOpen, setIsModalOpen] = useState(false);


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

  // Define a query for city area list data
  const { data: cityAreaListData, isLoading: cityAreaListLoading, isError: cityAreaListError, refetch: refetchCityAreaListData } = useQuery(
    'cityAreaListData',
    () => fetchCityAreaListData(AUTH_TOKEN),
    {
      ...LongerCaching,
      onError: handleQueryError,
    }
  );


  const handleOnAddAdmission = () => {
    setIsModalOpen(true);
  };

  const overallLoading = !cityAreaListLoading && !cityListLoading

  return overallLoading ?
    <div>
      {contextHolder}
      <div className="cs-dis-flex cs-jc-end cs-m-10">
        <Button className="cs-theme-button" onClick={handleOnAddAdmission}>
          Add city area
        </Button>
      </div>

      <div className="cs-tm-20">
        <Table
          dataSource={cityAreaListData.data}
          columns={cityAreaColumn()}
          scroll={{ x: 1300, y: "calc(100vh - 430px)" }}
        />
      </div>

      {isModalOpen ? (
        <ModalCityArea
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          getTableData={refetchCityAreaListData}
          messageApi={messageApi}
          cityData={cityListData.data}
        />
      ) : null}
    </div>
    : <div className="cs-dis-flex cs-hrz-center cs-vt-center cs-h-100vh">
      <Loader />
    </div>
};

export default CityArea;
