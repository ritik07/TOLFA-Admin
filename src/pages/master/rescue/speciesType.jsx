import React, { useState, useEffect } from "react";
import { Button, Table, message } from "antd";
import { speciesColumn } from "../../../columns/master/rescue/species.column";
import axios from "axios";
import { BASE_URL } from "../../../constants/server";
import Loader from "../../../components/loader/loader";
import { handleLogout } from "../../../global/function.global";
import ModalSpeciesType from "../../../components/master/rescue/speciesType.modal";
import { fetchRescueTypeData, fetchSpeciesTypeData } from "../../../services/master_service";
import { LongerCaching } from '../../../constants/conifg'
import { useQuery, useMutation } from 'react-query';

const SpeciesType = () => {
  const AUTH_TOKEN = localStorage.getItem('auth_token');

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


  // Define a query for rescue type data
  const { data: rescueTypeData, isLoading: rescueTypeLoading, isError: rescueTypeError } = useQuery(
    'rescueTypeData',
    () => fetchRescueTypeData(AUTH_TOKEN),
    {
      ...LongerCaching,
      onError: handleQueryError,
    }
  );

  // Define a query for species type data
  const { data: speciesTypeData, isLoading: speciesTypeLoading, isError: speciesTypeError, refetch: refetchSpeciesTypeData } = useQuery(
    'speciesTypeData',
    () => fetchSpeciesTypeData(AUTH_TOKEN),
    {
      ...LongerCaching,
      onError: handleQueryError,
    }
  );

  const overallLoading = !rescueTypeLoading && !speciesTypeLoading

  return overallLoading ? (
    <div>
      {contextHolder}
      <div className="cs-dis-flex cs-jc-end cs-m-10">
        <Button className="cs-theme-button" onClick={handleOnAddAdmission}>
          Add rescue type
        </Button>
      </div>

      <div className="cs-tm-20">
        <Table
          dataSource={speciesTypeData.data}
          columns={speciesColumn()}
          scroll={{ x: 1300, y: "calc(100vh - 430px)" }}
        />
      </div>

      {isModalOpen ? (
        <ModalSpeciesType
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          getTableData={refetchSpeciesTypeData}
          messageApi={messageApi}
          rescueTypeData={rescueTypeData.data}
        />
      ) : null}
    </div>
  ) : (
    <div className="cs-dis-flex cs-hrz-center cs-vt-center cs-h-100vh">
      <Loader />
    </div>
  );
};

export default SpeciesType;
