import React, { useState, useEffect } from "react";
import { Button, Table, message } from "antd";
import { areaColumn } from "../../../columns/master/location/area.column";
import axios from "axios";
import { BASE_URL } from "../../../constants/server";
import Loader from "../../../components/loader/loader";
import { handleLogout } from "../../../global/function.global";
import ModalArea from "../../../components/master/location/area.modal";
import { fetchTolfaAreaListData } from "../../../services/master_service";
import { LongerCaching } from '../../../constants/conifg'
import { useQuery, useMutation } from 'react-query';

const Area = () => {
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


  // Define a query for tolfa area list data
  const { data: tolfaAreaListData, isLoading: tolfaAreaListLoading, isError: tolfaAreaListError, refetch: refetchTolfaAreaListData } = useQuery(
    'tolfaAreaListData',
    () => fetchTolfaAreaListData(AUTH_TOKEN),
    {
      ...LongerCaching,
      onError: handleQueryError,
    }
  );

  const handleOnAddAdmission = () => {
    setIsModalOpen(true);
  };

  return !tolfaAreaListLoading ? (
    <div>
      {contextHolder}
      <div className="cs-dis-flex cs-jc-end cs-m-10">
        <Button className="cs-theme-button" onClick={handleOnAddAdmission}>
          Add area
        </Button>
      </div>

      <div className="cs-tm-20">
        <Table
          dataSource={tolfaAreaListData.data}
          columns={areaColumn()}
          scroll={{ x: 1300, y: "calc(100vh - 430px)" }}
        />
      </div>

      {isModalOpen ? (
        <ModalArea
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          getTableData={refetchTolfaAreaListData}
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
