import React, { useState, useEffect } from "react";
import { Button, Table, message } from "antd";
import { rescueTypeColumn } from "../../../columns/master/rescue/rescueType.column";
import axios from "axios";
import { BASE_URL } from "../../../constants/server";
import AddRescueType from "../../../components/master/rescue/rescueType.modal";
import Loader from "../../../components/loader/loader";
import { handleLogout } from "../../../global/function.global";
import ModalStatus from "../../../components/master/animal/status.modal";
import { fetchStatusTypeData } from "../../../services/master_service";
import { useQuery, useMutation } from 'react-query';
import { defaultCaching } from '../../../constants/conifg'

const Status = () => {
  const USER_TOKEN = sessionStorage.getItem("user_token");
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


  // Define a query for status type data
  const { data: statusTypeData, isLoading: statusTypeLoading, isError: statusTypeError, refetch: refetchStatusTypeData } = useQuery(
    'statusTypeData',
    () => fetchStatusTypeData(AUTH_TOKEN),
    {
      ...defaultCaching,
      onError: handleQueryError,
    }
  );

  const handleOnAddAdmission = () => {
    setIsModalOpen(true);
  };

  return !statusTypeLoading ? (
    <div>
      {contextHolder}
      <div className="cs-dis-flex cs-jc-end cs-m-10">
        <Button className="cs-theme-button" onClick={handleOnAddAdmission}>
          Add status
        </Button>
      </div>

      <div className="cs-tm-20">
        <Table
          dataSource={statusTypeData.data}
          columns={rescueTypeColumn()}
          scroll={{ x: 1300, y: "calc(100vh - 430px)" }}
        />
      </div>

      {isModalOpen ? (
        <ModalStatus
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          getTableData={refetchStatusTypeData}
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

export default Status;
