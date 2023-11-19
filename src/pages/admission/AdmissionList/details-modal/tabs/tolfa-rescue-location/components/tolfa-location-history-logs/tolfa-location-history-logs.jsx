import React from 'react'
import { Col, Row, Space, Timeline, Typography } from 'antd'
import { useQuery, useMutation } from 'react-query';
import { HistoryOutlined } from '@ant-design/icons'
import { handleLogout } from '../../../../../../../../global/function.global';
import { fetchTolfaLocationHistoryLogsData } from '../../../../../../../../services/master_service';
import { LongerCaching } from '../../../../../../../../constants/conifg'
import Loader from '../../../../../../../../components/loader/loader';
import moment from 'moment';

const TolfaLocationHistoryLogs = ({ rescue_no }) => {
  const AUTH_TOKEN = localStorage.getItem('auth_token');

  const handleQueryError = (error) => {
    if (error.response?.data?.code === 401) {
      handleLogout();
    }
  };

  // Define a query for tolfa block list data
  const { data: tolfaLocationHistoryLogsData, isLoading: tolfaLocationHistoryLogsDataLoading, isError: tolfaLocationHistoryLogsDataListError } = useQuery(
    `tolfaLocationHistoryLogsData${rescue_no}`,
    () => fetchTolfaLocationHistoryLogsData(AUTH_TOKEN, rescue_no),
    {
      ...LongerCaching,
      onError: handleQueryError,
    }
  );
  return (
    !tolfaLocationHistoryLogsDataLoading ?
      <div>
        <Row>
          <Col xs={24}>
            <Space direction='horizontal'>
              <HistoryOutlined />

              <Typography.Title level={3}>
                History logs
              </Typography.Title>
            </Space>
          </Col>
        </Row>
        <div className='cs-tm-10'>
          <Timeline
            mode="left"
            items={tolfaLocationHistoryLogsData.data.map((item, index) => {
              return {
                label: moment(item.updated_at).format("DD/MM/YYY HH:mm"),
                children: `${item.area_name + " / " + item.block_name}`,
                id: item.id,
                color: index ? "black" : "green"
              }
            })}
          />
        </div>
      </div>
      : <div className="cs-dis-flex cs-hrz-center cs-vt-center cs-h-100vh">
        <Loader />
      </div>
  )
}

export default TolfaLocationHistoryLogs