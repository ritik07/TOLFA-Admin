import React, { useState } from 'react'
import { admissionColumn } from './columns/admissionList.column'
import { Table, } from 'antd';
import { useQuery, useMutation } from 'react-query';
import { fetchAdmissionListData } from '../../../services/master_service';
import { LongerCaching } from '../../../constants/conifg'
import { handleLogout } from '../../../global/function.global';
import DetailModal from './details-modal/detail-modal';
import SearchBar from './search-bar/search-bar';
import { useEffect } from 'react';

const AdmissionList = () => {
  const AUTH_TOKEN = localStorage.getItem('auth_token');
  const USER_ID = localStorage.getItem("user_id");

  /**
   * @state
   */
  const [showModal, setShowModal] = useState(false)
  const [rowData, setRowData] = useState([])
  const [searchQuery, setSearchQuery] = useState(false)
  const [filterData, setFilterData] = useState([])

  /**
* @api_calls
*/
  const handleQueryError = (error) => {
    if (error.response?.data?.code === 401) {
      handleLogout();
    }
  };
  // Define a query for rescue type data
  const { data: admissionListData, isLoading: admissionListLoading, isError: admissionListError, refetch: refetchAdmissionList } = useQuery(
    'admissionListData',
    () => fetchAdmissionListData(AUTH_TOKEN),
    {
      ...LongerCaching,
      onError: handleQueryError,
    }
  );



  useEffect(() => {
    if (searchQuery) {
      console.log("admissionListData", admissionListData.data);
      const result = filterDataByCriteria(admissionListData, searchQuery);

      setFilterData(result)
      console.log("filterData", result)
    } else if (!admissionListLoading) {
      console.log("admissionListLoading", admissionListLoading);
      setFilterData(admissionListData.data)
    }
    console.log("searchQuery", searchQuery);
  }, [searchQuery, admissionListLoading])

  function filterDataByCriteria(dataArray, criteria) {
    return dataArray.data.filter(item => {
      for (const key in criteria) {
        if (item[key] !== criteria[key]) {
          return false;
        }
      }
      return true;
    });
  }

  /**
   * @functions
   */
  const handleViewDetail = (rowdata) => {
    setShowModal(true)
    setRowData(rowdata)
  }

  return (
    <div>

      <SearchBar setSearchQuery={setSearchQuery} />

      {!admissionListLoading ?
        <div className='cs-tm-20'>
          <Table
            key={admissionListData.data.rescue_no}
            dataSource={filterData}
            columns={admissionColumn(handleViewDetail)}
            scroll={{ x: 1300, y: 'calc(100vh - 300px)' }} />
        </div>
        : null}

      {
        showModal ?
          <DetailModal
            refetchAdmissionList={refetchAdmissionList}
            rowData={rowData}
            setShowModal={setShowModal}
          />
          : null}
    </div>
  )
}

export default AdmissionList