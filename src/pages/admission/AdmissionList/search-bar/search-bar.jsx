import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Select, DatePicker, Button } from 'antd'
import Search from 'antd/es/transfer/search'
import { SEX } from '../../../../constants/main'
import { LongerCaching } from '../../../../constants/conifg'
import { useQuery, useMutation } from 'react-query';
import { fetchBreedListData, fetchRescueTypeData, fetchSpeciesTypeData, fetchStatusTypeData } from '../../../../services/master_service'
import { handleLogout } from '../../../../global/function.global'

const SearchBar = ({ setSearchQuery }) => {
  const AUTH_TOKEN = localStorage.getItem('auth_token');
  const [searchInputs, setSearchInputs] = useState({})


  const onChangeSearch = (data, key) => {
    setSearchInputs((prevValue) => ({ ...prevValue, [key]: data }))
  }

  const handleSearch = () => {
    setSearchQuery({ ...searchInputs })
  }

  const handleRest = () => {
    setSearchInputs({})
    setSearchQuery(false)
  }

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
      ...LongerCaching,
      onError: handleQueryError,
    }
  );

  // Define a query for tolfa breed list data
  const { data: breedListData, isLoading: breedListLoading, isError: breedListError } = useQuery(
    'breedListData',
    () => fetchBreedListData(AUTH_TOKEN),
    {
      ...LongerCaching,
      onError: handleQueryError,
    }
  );


  // Define a query for status type data
  const { data: statusTypeData, isLoading: statusTypeLoading, isError: statusTypeError } = useQuery(
    'statusTypeData',
    () => fetchStatusTypeData(AUTH_TOKEN),
    {
      ...LongerCaching,
      onError: handleQueryError,
    }
  );

  // Determine if all queries are successful
  const areQueriesLoaded = !rescueTypeLoading && !breedListLoading && !statusTypeLoading



  return (

    areQueriesLoaded ?
      <Card className='cs-theme-card'>
        <Row gutter={[10, 10]}>
          <Col xl={4}>
            <Search
              value={searchInputs.rescue_no}
              onChange={(e) => onChangeSearch(+e.target.value, "rescue_no")}
              placeholder='Search by Rescuse no.' />
          </Col>

          <Col xl={3}>
            <Select
              value={searchInputs.animal_status_id}
              onChange={(e) => onChangeSearch(+e, "animal_status_id")}
              placeholder="Status"
              style={{ width: "100%" }}
              options={statusTypeData.data?.map((item) => {
                return { label: item.name, value: item.id }
              })}
            />
          </Col>

          {/* <Col xl={3}>
            <Select
              onChange={(e) => onChangeSearch(e, "condition")}
              placeholder="Condition"
              style={{ width: "100%" }}
              options={[
                {
                  value: '1',
                  label: 'Good',
                },
                {
                  value: '2',
                  label: 'Poor',
                },
                {
                  value: '3',
                  label: 'Collapsed',
                },
                {
                  value: '4',
                  label: 'Serious',
                },

              ]}
            />
          </Col> */}

          {/* <Col xl={3}>
            <Select
              placeholder="ABC Status"
              onChange={(e) => onChangeSearch(e, "abc_status")}
              style={{ width: "100%" }}
              options={[
                // {
                //   value: 'jack',
                //   label: 'Jack',
                // },
                // {
                //   value: 'lucy',
                //   label: 'Lucy',
                // },
                // {
                //   value: 'Yiminghe',
                //   label: 'yiminghe',
                // },
                // {
                //   value: 'disabled',
                //   label: 'Disabled',
                //   disabled: true,
                // },
              ]}
            />
          </Col> */}


          <Col xl={3}>
            <Select
              value={searchInputs.rescue_type_id}
              onChange={(e) => onChangeSearch(e, "rescue_type_id")}
              placeholder="Type"
              style={{ width: "100%" }}
              options={rescueTypeData.data.map((item) => {
                return { label: item.name, value: item.id }
              })}
            />
          </Col>

          <Col xl={3}>
            <Select
              onChange={(e) => onChangeSearch(e, "sex")}
              value={searchInputs.sex}
              placeholder="Sex"
              style={{ width: "100%" }}
              options={
                SEX.map((item, index) => {
                  return {
                    value: item.value,
                    label: item.label,
                  }
                })
              }
            />
          </Col>


          <Col xl={3}>
            <Select
              onChange={(e) => onChangeSearch(e, "breed_id")}
              value={searchInputs.breed_id}
              placeholder="Breed"
              style={{ width: "100%" }}
              options={breedListData.data.map((item) => {
                return { label: item.name, value: item.id }
              })}
            />
          </Col>

          {/* <Col xl={3}>
          <DatePicker placeholder='Start date' />
        </Col>

        <Col xl={3}>
          <DatePicker placeholder='End date' />
        </Col> */}

          <Col>
            <Button onClick={handleSearch} className='cs-theme-button'>
              Search
            </Button>

            <Button onClick={handleRest} className='cs-theme-button' style={{ marginLeft: 20 }}>
              Reset
            </Button>
          </Col>
        </Row>
      </Card>
      : null
  )
}

export default SearchBar