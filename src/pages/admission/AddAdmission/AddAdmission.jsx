import React from 'react';
import { Button, Card, Form, message } from 'antd';
import { useQuery, useMutation } from 'react-query';
import BasicInfo from '../../../components/admission/form-component/basicInfo';
import RescueLocation from '../../../components/admission/form-component/rescueLocation';
import AnimalInfo from '../../../components/admission/form-component/animalInfo';
import AnimalStatus from '../../../components/admission/form-component/animalStatus';
import { handleLogout } from '../../../global/function.global';
import { addAdmission, fetchBreedListData, fetchCityAreaListData, fetchCityListData, fetchRescueTypeData, fetchSpeciesTypeData, fetchStateListData, fetchStatusTypeData, fetchTolfaAreaListData, fetchTolfaBlockNumberListData } from '../../../services/master_service';
import { defaultCaching } from '../../../constants/conifg'
import { createNotification } from '../../../utils/notify';

const AddAdmission = () => {
  const AUTH_TOKEN = localStorage.getItem('auth_token');
  const USER_ID = localStorage.getItem("user_id");

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

  // Define a query for tolfa breed list data
  const { data: breedListData, isLoading: breedListLoading, isError: breedListError } = useQuery(
    'breedListData',
    () => fetchBreedListData(AUTH_TOKEN),
    {
      ...defaultCaching,
      onError: handleQueryError,
    }
  );

  /**
   * @Function
   */
  const { mutate: addAdmissionMutation, isLoading, isError, isSuccess } = useMutation(
    (formData) => addAdmission(AUTH_TOKEN, formData),
    {
      // onSuccess callback will be called when the mutation is successful
      onSuccess: () => {
        createNotification("success", {
          title: "Detail added",
          message: "Admission details added",
        });
        form.resetFields()
        message.success("Record added!!")
        // You can perform additional actions or updates here
      },
      // onError callback will be called when the mutation encounters an error
      onError: (error) => {
        console.error('Error posting data:', error);
        // You can handle errors or display error messages here
      },
    }
  );

  const handleOnFinish = (payloadData) => {
    const { type_of_rescue_id, species_id, status_id, state_id, city_id, area_id, rescue_address, rescue_by_tolfa,
      animal_name, animal_sex, age, main_color_id, second_color_id, thirdcolor_id, id_features, breed_id, animal_image,
      care_people_id, tolfa_area_id, tolfa_block_id, abc_status, tattoo_number, condition, body_score,
      caregiver_name, caregiver_number, problem, problem_type, symptoms, injury_location, alt_problem, alt_problem_type,
      alt_symptoms, alt_injury_location, cause_of_problem, rassi_no, rescue_team } = payloadData

    function objectToFormData(obj) {
      const formData = new FormData();

      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];

          if (typeof value === 'object' && !Array.isArray(value)) {
            // Handle nested objects
            for (const nestedKey in value) {
              if (value.hasOwnProperty(nestedKey)) {
                formData.append(`${key}[${nestedKey}]`, value[nestedKey]);
              }
            }
          } else {
            formData.append(key, value);
          }
        }
      }
      formData.append("image", animal_image);
      return formData;
    }

    const payload = {
      active: true,
      state_id,
      type_of_rescue_id: +type_of_rescue_id, species_id: +species_id, status_id: +status_id,
      city_id: +city_id, area_id: +area_id, rescue_address,
      rescue_by_tolfa, animal_name, sex: animal_sex, age: +age,
      main_color_id, second_color_id, thirdcolor_id, id_features: id_features.toString(), breed_id,
      image: animal_image,
      care_people_id,
      tolfa_location: {
        tolfa_area_id,
        tolfa_block_id
      },
      rescue_animal_status: {
        abc_status,
        tattoo_number,
        condition_value: condition,
        body_score,
        caregiver_name,
        caregiver_number,
        problem,
        problem_type,
        symptoms,
        injury_location,
        alt_problem,
        alt_problem_type,
        alt_symptoms,
        alt_injury_location,
        cause_of_problem,
        rassi_no,
      },
      created_by: USER_ID,
      tolfa_team: rescue_team
    }

    let formDataPayload = objectToFormData(payload);

    addAdmissionMutation(formDataPayload)
  }

  // Determine if all queries are successful
  const areQueriesLoaded = !rescueTypeLoading && !speciesTypeLoading && !statusTypeLoading
    && !stateListLoading && !cityListLoading && !cityAreaListLoading && !tolfaAreaListLoading && !tolfaBlockNumberListLoading
    && !breedListLoading;

  return (
    <div>
      <div className='cs-vh-fit cs-scroll'>
        <Form layout="vertical" form={form} onFinish={handleOnFinish}>
          {areQueriesLoaded ? (
            <>
              <BasicInfo form={form}
                rescueTypeData={rescueTypeData.data}
                speciesTypeData={speciesTypeData.data}
                statusTypeData={statusTypeData.data} />

              <RescueLocation form={form} stateData={stateListData.data} city={cityListData.data}
                cityArea={cityAreaListData.data} tolfaArea={tolfaAreaListData.data}
                tolfaBlockNumber={tolfaBlockNumberListData.data} />

              <AnimalInfo form={form} breedData={breedListData.data} />

              <AnimalStatus form={form} />

              <Button type="primary" htmlType="submit">
                Submit
              </Button>

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
