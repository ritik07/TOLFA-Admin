import React, { useState, useEffect } from "react";
import { Button, Table, message } from "antd";
import { rescueTypeColumn } from "../../../columns/master/rescue/rescueType.column";
import axios from "axios";
import { BASE_URL } from "../../../constants/server";
import AddRescueType from "../../../components/master/rescue/rescueType.modal";
import Loader from "../../../components/loader/loader";
import { handleLogout } from "../../../global/function.global";
import { LongerCaching } from '../../../constants/conifg'
import { useQuery, useMutation } from 'react-query';
import { fetchRescueTypeData } from "../../../services/master_service";

const RescueType = () => {
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

  /**
   * @api_calls
   */

  // Define a query for rescue type data
  const { data: rescueTypeData, isLoading: rescueTypeLoading, isError: rescueTypeError, refetch: refetchRescueTypeData } = useQuery(
    'rescueTypeData',
    () => fetchRescueTypeData(AUTH_TOKEN),
    {
      ...LongerCaching,
      onError: handleQueryError,
    }
  );


  const handleOnAddAdmission = () => {
    setIsModalOpen(true);
  };

  return !rescueTypeLoading ? (
    <div>
      {contextHolder}
      <div className="cs-dis-flex cs-jc-end cs-m-10">
        <Button className="cs-theme-button" onClick={handleOnAddAdmission}>
          Add rescue type
        </Button>
      </div>

      <div className="cs-tm-20">
        <Table
          dataSource={rescueTypeData.data}
          columns={rescueTypeColumn()}
          scroll={{ x: 1300, y: "calc(100vh - 430px)" }}
        />
      </div>

      {isModalOpen ? (
        <AddRescueType
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          getTableData={refetchRescueTypeData}
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

export default RescueType;
