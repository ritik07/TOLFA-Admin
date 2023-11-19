import React, { useState, useEffect } from "react";
import { Button, Table, message } from "antd";
import { stateColumn } from "../../../columns/master/location/state.column";
import { BASE_URL } from "../../../constants/server";
import Loader from "../../../components/loader/loader";
import { handleLogout } from "../../../global/function.global";
import ModalState from "../../../components/master/location/state.modal";
import { fetchStateListData } from "../../../services/master_service";
import { LongerCaching } from '../../../constants/conifg'
import { useQuery, useMutation } from 'react-query';

const State = () => {
  const AUTH_TOKEN = localStorage.getItem('auth_token');
  const USER_ID = localStorage.getItem("user_id");

  const [messageApi, contextHolder] = message.useMessage();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOnAddAdmission = () => {
    setIsModalOpen(true);
  };

  /**
   * @common_function
   */
  const handleQueryError = (error) => {
    if (error.response?.data?.code === 401) {
      handleLogout();
    }
  };

  // Define a query for state list data
  const { data: stateListData, isLoading: stateListLoading, isError: stateListError, refetch: refetchStateListData } = useQuery(
    'stateListData',
    () => fetchStateListData(AUTH_TOKEN),
    {
      ...LongerCaching,
      onError: handleQueryError,
    }
  );

  return !stateListLoading ? (
    <div>
      {contextHolder}
      <div className="cs-dis-flex cs-jc-end cs-m-10">
        <Button className="cs-theme-button" onClick={handleOnAddAdmission}>
          Add state
        </Button>
      </div>

      <div className="cs-tm-20">
        <Table
          dataSource={stateListData.data}
          columns={stateColumn()}
          scroll={{ x: 1300, y: "calc(100vh - 430px)" }}
        />
      </div>

      {isModalOpen ? (
        <ModalState
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          getTableData={refetchStateListData}
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

export default State;
