import React, { useState, useEffect } from "react";
import { Button, Table, message } from "antd";
import { blockNumberColumn } from "../../../columns/master/location/blockNumber.column";
import axios from "axios";
import { BASE_URL } from "../../../constants/server";
import Loader from "../../../components/loader/loader";
import { handleLogout } from "../../../global/function.global";
import ModalBlockNumber from "../../../components/master/location/blockNumber.modal";
import { fetchTolfaAreaListData, fetchTolfaBlockNumberListData } from "../../../services/master_service";
import { useQuery, useMutation } from 'react-query';
import { LongerCaching } from '../../../constants/conifg'

const BlockNumber = () => {
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

  // Define a query for tolfa block list data
  const { data: tolfaBlockNumberListData, isLoading: tolfaBlockNumberListLoading, isError: tolfaBlockNumberListError, refetch: refetchTolfaBlockNumberListData } = useQuery(
    'tolfaBlockNumberListData',
    () => fetchTolfaBlockNumberListData(AUTH_TOKEN),
    {
      ...LongerCaching,
      onError: handleQueryError,
    }
  );

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

  const overallLoading = !tolfaAreaListLoading && !tolfaBlockNumberListLoading

  return overallLoading ?
    <div>
      {contextHolder}
      <div className="cs-dis-flex cs-jc-end cs-m-10">
        <Button className="cs-theme-button" onClick={handleOnAddAdmission}>
          Add block number
        </Button>
      </div>

      <div className="cs-tm-20">
        <Table
          dataSource={tolfaBlockNumberListData.data}
          columns={blockNumberColumn()}
          scroll={{ x: 1300, y: "calc(100vh - 430px)" }}
        />
      </div>

      {isModalOpen ? (
        <ModalBlockNumber
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          getTableData={refetchTolfaBlockNumberListData}
          messageApi={messageApi}
          areaData={tolfaAreaListData.data}
        />
      ) : null}
    </div>
    : (
      <div className="cs-dis-flex cs-hrz-center cs-vt-center cs-h-100vh">
        <Loader />
      </div>
    );
};

export default BlockNumber;
