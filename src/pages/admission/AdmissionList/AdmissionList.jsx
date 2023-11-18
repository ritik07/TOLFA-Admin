import React, { useState } from 'react'
import { admissionColumn } from './columns/admissionList.column'
import { Table } from 'antd';
import { useQuery, useMutation } from 'react-query';
import { fetchAdmissionListData } from '../../../services/master_service';
import { LongerCaching } from '../../../constants/conifg'
import { handleLogout } from '../../../global/function.global';
import DetailModal from './details-modal/detail-modal';

const AdmissionList = () => {
  const AUTH_TOKEN = localStorage.getItem('auth_token');
  const USER_ID = localStorage.getItem("user_id");

  /**
   * @state
   */
  const [showModal, setShowModal] = useState(false)
  const [rowData, setRowData] = useState([])

  /**
  * @api_calls
  */
  const handleQueryError = (error) => {
    if (error.response?.data?.code === 401) {
      handleLogout();
    }
  };
  // Define a query for rescue type data
  const { data: admissionListData, isLoading: admissionListLoading, isError: admissionListError } = useQuery(
    'admissionListData',
    () => fetchAdmissionListData(AUTH_TOKEN),
    {
      ...LongerCaching,
      onError: handleQueryError,
    }
  );

  /**
   * @functions
   */
  const handleViewDetail = (rowdata) => {
    setShowModal(true)
    setRowData(rowdata)
  }

  return (
    <div>
      {!admissionListLoading ?
        <div className='cs-tm-20'>
          <Table
            key={admissionListData.data.rescue_id}
            dataSource={admissionListData.data}
            columns={admissionColumn(handleViewDetail)}
            scroll={{ x: 1300, y: 'calc(100vh - 300px)' }} />
        </div>
        : null}

      {
        showModal ?
          <DetailModal
            rowData={rowData}
            setShowModal={setShowModal}
          />
          : null}
    </div>
  )
}

export default AdmissionList