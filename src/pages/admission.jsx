import React, { useState, useEffect } from 'react'
import { Button, Card, Input, Row, Col, Select, DatePicker, Table } from 'antd'
import Search from 'antd/es/transfer/search'
import AddAdmission from '../components/admission/addAdmission';
import { admissionColumn, } from '../columns/admission.column';
import { SEX } from '../constants/main'
import axios from 'axios'
import { BASE_URL } from '../constants/server';
import { handleLogout } from '../global/function.global';

const Admission = () => {
  const USER_TOKEN = sessionStorage.getItem("user_token");

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [fieldsData, setFieldsData] = useState({
    rescueTypeData: [], speciesType: [], statusType: [],
    rescueNumber: null, stateData: [], city: [], cityArea: [],
    tolfaArea: [], tolfaBlockNumber: []
  })

  useEffect(() => {
    // 1
    getRescueTypeData()
    getSpeciesType()
    getStatusTypeData()
    // 2
    getStateList()
    getCityList()
    getCityAreaList()
    getTolfaArea()
    getTolfaBlockNumber()
  }, [])

  const getTolfaBlockNumber = async () => {
    try {
      let response = await axios.get(BASE_URL + `/block-number?token=${USER_TOKEN}`);
      setFieldsData((prevFieldData) => ({
        ...prevFieldData,
        tolfaBlockNumber: response.data.data
      }))
    } catch (error) {
      if (error.response.data.code === 401) {
        handleLogout();
      }
      console.log("error", error);
    }
  };

  const getTolfaArea = async () => {
    try {
      let response = await axios.get(BASE_URL + `/area?token=${USER_TOKEN}`);
      setFieldsData((prevFieldData) => ({
        ...prevFieldData,
        tolfaArea: response.data.data
      }))
    } catch (error) {
      if (error.response.data.code === 401) {
        handleLogout();
      }
      console.log("error", error);

    }
  };

  const getCityAreaList = async () => {
    try {
      let response = await axios.get(BASE_URL + `/city-area?token=${USER_TOKEN}`);
      setFieldsData((prevFieldData) => ({
        ...prevFieldData,
        cityArea: response.data.data
      }))
    } catch (error) {
      if (error.response.data.code === 401) {
        handleLogout();
      }
      console.log("error", error);
    }
  };

  const getCityList = async () => {
    try {
      let response = await axios.get(BASE_URL + `/city?token=${USER_TOKEN}`);
      setFieldsData((prevFieldData) => ({
        ...prevFieldData,
        city: response.data.data
      }))
    } catch (error) {
      if (error.response.data.code === 401) {
        handleLogout();
      }
      console.log("error", error);
    }
  };

  const getStateList = async () => {
    try {
      let response = await axios.get(BASE_URL + `/state?token=${USER_TOKEN}`);
      setFieldsData(prevFieldsData => ({
        ...prevFieldsData,
        stateData: response.data.data
      }));
    } catch (error) {
      if (error.response.data.code === 401) {
        handleLogout();
      }
      console.log("error", error);
    }
  };


  const getStatusTypeData = async () => {
    try {
      let response = await axios.get(
        BASE_URL + `/animal-status?token=${USER_TOKEN}`
      );
      setFieldsData(prevFieldsData => ({
        ...prevFieldsData,
        statusType: response.data.data
      }));
      // setLoading(false);
    } catch (error) {
      if (error.response.data.code === 401) {
        handleLogout();
      }
      console.log("error", error);
      // setLoading(false);
    }
  };

  const getRescueTypeData = async () => {
    try {
      let response = await axios.get(
        BASE_URL + `/rescue-type?token=${USER_TOKEN}`
      );
      setFieldsData(prevFieldsData => ({
        ...prevFieldsData,
        rescueTypeData: response.data.data
      }));
      // setLoading(false);
    } catch (error) {
      if (error.response.data.code === 401) {
        handleLogout();
      }
      console.log("error", error);
      // setLoading(false);
    }
  };

  const getSpeciesType = async () => {
    try {
      let response = await axios.get(
        BASE_URL + `/species-type?token=${USER_TOKEN}`
      );
      setFieldsData(prevFieldsData => ({
        ...prevFieldsData,
        speciesType: response.data.data
      }));
      //   setLoading(false);
    } catch (error) {
      if (error.response.data.code === 401) {
        handleLogout();
      }
      console.log("error", error);
      // setLoading(false);
    }
  }

  const handleOnAddAdmission = () => {
    setIsModalOpen(true)
  }

  return (
    <div>
      <div className='cs-dis-flex cs-jc-end cs-m-10'>
        <Button className='cs-theme-button' onClick={handleOnAddAdmission}>
          Add new admission
        </Button>
      </div>
      <Card className='cs-theme-card'>
        <Row gutter={[10, 10]}>
          <Col xl={5}>
            <Search placeholder='Search by rescuse no.' />
          </Col>

          <Col xl={3}>
            <Select
              placeholder="Status"
              style={{ width: "100%" }}
              options={[
                {
                  value: '1',
                  label: 'Admitted',
                },
                {
                  value: '2',
                  label: 'Admitted - Under Treatment',
                },
                {
                  value: '3',
                  label: 'Released',
                },
                {
                  value: '4',
                  label: 'Died',
                },
              ]}
            />
          </Col>

          <Col xl={3}>
            <Select
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
          </Col>

          <Col xl={3}>
            <Select
              placeholder="ABC Status"
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
          </Col>


          <Col xl={3}>
            <Select
              placeholder="Type"
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
          </Col>

          <Col xl={3}>
            <Select
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
              placeholder="Breed"
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
          </Col>

          <Col xl={3}>
            <DatePicker placeholder='Start date' />
          </Col>

          <Col xl={3}>
            <DatePicker placeholder='End date' />
          </Col>

          <Col>
            <Button className='cs-theme-button'>
              Search
            </Button>
          </Col>
        </Row>
      </Card>

      <div className='cs-tm-20'>
      </div>

      {isModalOpen ?
        <AddAdmission fieldsData={fieldsData} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        : null}
    </div>
  )
}

export default Admission