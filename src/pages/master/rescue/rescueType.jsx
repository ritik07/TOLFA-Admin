import React, { useState, useEffect } from 'react'
import { Button, Table, message } from 'antd'
import { rescueTypeColumn } from '../../../columns/master/rescue/rescueType.column';
import axios from 'axios'
import { BASE_URL } from '../../../constants/server';
import AddRescueType from '../../../components/master/rescue/rescueType.modal';
import Loader from '../../../components/loader/loader';

const RescueType = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTableData()
  }, [])


  const getTableData = async () => {
    try {
      let response = await axios.get(BASE_URL + "/rescue-type/get")
      console.log("response.data", response.data);
      setTableData(response.data.data)
      setLoading(false)
    } catch (error) {
      console.log("error", error);
      setLoading(false)
    }
  }

  const handleOnAddAdmission = () => {
    setIsModalOpen(true)
  }

  return (
    !loading ?
      <div>
        {contextHolder}
        <div className='cs-dis-flex cs-jc-end cs-m-10'>
          <Button className='cs-theme-button' onClick={handleOnAddAdmission}>
            Add rescue type
          </Button>
        </div>

        <div className='cs-tm-20'>
          <Table dataSource={tableData} columns={rescueTypeColumn()} scroll={{ x: 1300, y: 'calc(100vh - 430px)' }} />
        </div>

        {isModalOpen ?
          <AddRescueType isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
            getTableData={getTableData} messageApi={messageApi} />
          : null}
      </div>
      : <div className='cs-dis-flex cs-hrz-center cs-vt-center cs-h-100vh'>
        <Loader />
      </div>
  )
}

export default RescueType