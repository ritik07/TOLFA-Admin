import React from 'react';
import { Card, Form } from 'antd';
import { useQuery } from 'react-query';
import BasicInfo from '../../../components/admission/form-component/basicInfo';
import RescueLocation from '../../../components/admission/form-component/rescueLocation';
import AnimalInfo from '../../../components/admission/form-component/animalInfo';
import AnimalStatus from '../../../components/admission/form-component/animalStatus';
import { handleLogout } from '../../../global/function.global';
import { fetchCityAreaListData, fetchCityListData, fetchRescueTypeData, fetchSpeciesTypeData, fetchStateListData, fetchStatusTypeData, fetchTolfaAreaListData, fetchTolfaBlockNumberListData } from '../../../services/master_service';
import { defaultCaching } from '../../../constants/conifg'

const AddAdmission = () => {
  const AUTH_TOKEN = localStorage.getItem('auth_token');
  const [form] = Form.useForm();

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
  const { data: rescueTypeData, isLoading: rescueTypeLoading, isError: rescueTypeError } = useQuery(
    'rescueTypeData',
    () => fetchRescueTypeData(AUTH_TOKEN),
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

  // Define a query for status type data
  const { data: statusTypeData, isLoading: statusTypeLoading, isError: statusTypeError } = useQuery(
    'statusTypeData',
    () => fetchStatusTypeData(AUTH_TOKEN),
    {
      ...defaultCaching,
      onError: handleQueryError,
    }
  );

  // Define a query for state list data
  const { data: stateListData, isLoading: stateListLoading, isError: stateListError } = useQuery(
    'stateListData',
    () => fetchStateListData(AUTH_TOKEN),
    {
      ...defaultCaching,
      onError: handleQueryError,
    }
  );

  // Define a query for city list data
  const { data: cityListData, isLoading: cityListLoading, isError: cityListError } = useQuery(
    'cityListData',
    () => fetchCityListData(AUTH_TOKEN),
    {
      ...defaultCaching,
      onError: handleQueryError,
    }
  );

  // Define a query for city area list data
  const { data: cityAreaListData, isLoading: cityAreaListLoading, isError: cityAreaListError } = useQuery(
    'cityAreaListData',
    () => fetchCityAreaListData(AUTH_TOKEN),
    {
      ...defaultCaching,
      onError: handleQueryError,
    }
  );

  // Define a query for tolfa area list data
  const { data: tolfaAreaListData, isLoading: tolfaAreaListLoading, isError: tolfaAreaListError } = useQuery(
    'tolfaAreaListData',
    () => fetchTolfaAreaListData(AUTH_TOKEN),
    {
      ...defaultCaching,
      onError: handleQueryError,
    }
  );

  // Define a query for tolfa block list data
  const { data: tolfaBlockNumberListData, isLoading: tolfaBlockNumberListLoading, isError: tolfaBlockNumberListError } = useQuery(
    'tolfaBlockNumberListData',
    () => fetchTolfaBlockNumberListData(AUTH_TOKEN),
    {
      ...defaultCaching,
      onError: handleQueryError,
    }
  );

  // Determine if all queries are successful
  const areQueriesLoaded = !rescueTypeLoading && !speciesTypeLoading && !statusTypeLoading
    && !stateListLoading && !cityListLoading && !cityAreaListLoading && !tolfaAreaListLoading && !tolfaBlockNumberListLoading;

  return (
    <div>
      <div className='cs-vh-fit cs-scroll'>
        <Form layout="vertical" form={form}>
          {areQueriesLoaded ? (
            <>
              <BasicInfo form={form}
                rescueTypeData={rescueTypeData.data}
                speciesTypeData={speciesTypeData.data}
                statusTypeData={statusTypeData.data} />

              <RescueLocation form={form} stateData={stateListData.data} city={cityListData.data}
                cityArea={cityAreaListData.data} tolfaArea={tolfaAreaListData.data}
                tolfaBlockNumber={tolfaBlockNumberListData.data} />
{/* 
              <AnimalInfo form={form} />

              <AnimalStatus form={form} /> */}

              {/* Render other components here */}
            </>
          ) : (
            // Loading or error state
            <div>Loading...</div>
          )}

          {/* Conditional rendering based on rescueByDetail */}
          {/* ... your other components ... */}
        </Form>
      </div>
    </div>
  );
};

export default AddAdmission;
