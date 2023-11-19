import { Button, Col, Divider, Row, Tag, Typography } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'
import TolfaAnimalStausModal from './components/tolfa-animal-staus-modal'
import { fetchStatusTypeData } from '../../../../../../services/master_service'
import { handleLogout } from '../../../../../../global/function.global'
import { useQuery, useMutation } from 'react-query';
import { LongerCaching } from '../../../../../../constants/conifg'
import Loader from '../../../../../../components/loader/loader'

const TolfaAnimalStatus = ({ rowData, refetchAdmissionList, setShowModal }) => {
  const AUTH_TOKEN = localStorage.getItem('auth_token');
  const USER_ID = localStorage.getItem("user_id");

  const { abc_status, condition_value, rescue_no,
    animal_status_name, tattoo_number, body_score,
    problem, problem_type, injury_location,
    alt_problem_type, alt_problem,
    symptoms,
    alt_symptoms, alt_injury_location, cause_of_problem, rassi_no, status_id
  } = rowData
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOnUpdate = () => {
    setIsModalOpen(true)
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

  // Define a query for status type data
  const { data: statusTypeData, isLoading: statusTypeLoading, isError: statusTypeError } = useQuery(
    'statusTypeData',
    () => fetchStatusTypeData(AUTH_TOKEN),
    {
      ...LongerCaching,
      onError: handleQueryError,
    }
  );

  return (
    !statusTypeLoading ?
      <div>
        <Row gutter={[12, 12]}>
          <Col xs={24}>
            <div className='cs-dis-flex cs-jc-sb'>
              <Typography.Title level={2}>
                Status
              </Typography.Title>

              <div className='cs-dis-flex cs-vt-center'>
                <Button className='cs-theme-button' onClick={handleOnUpdate}>
                  Update
                </Button>
              </div>
            </div>
          </Col>

          <Col>
            <Typography.Title level={4}>
              Condition:
            </Typography.Title>
          </Col>
          <Col className='cs-dis-flex cs-vt-center'>
            <Tag color={condition_value === "good" ? 'green' :
              condition_value === "serious" ? "red" : "yellow"
            }>
              {condition_value}
            </Tag>
          </Col>

          <Col>
            <Typography.Title level={4}>
              Animal Status:
            </Typography.Title>
          </Col>
          <Col>
            <Typography.Title type='secondary' level={4}>
              {animal_status_name}
            </Typography.Title>
          </Col>

          <Col>
            <Typography.Title level={4}>
              ABC Status:
            </Typography.Title>
          </Col>
          <Col>
            <Typography.Title type='secondary' level={4}>
              {abc_status}
            </Typography.Title>
          </Col>

          <Col>
            <Typography.Title level={4}>
              Tattoo Number:
            </Typography.Title>
          </Col>
          <Col>
            <Typography.Title type='secondary' level={4}>
              {tattoo_number}
            </Typography.Title>
          </Col>
        </Row>

        <Row className='cs-tm-10' gutter={[12, 12]}>
          <Col>
            <Typography.Title level={4}>
              Body Score:
            </Typography.Title>
          </Col>
          <Col>
            <Typography.Title type='secondary' level={4}>
              {body_score}
            </Typography.Title>
          </Col>

          <Col>
            <Typography.Title level={4}>
              Rassi No.:
            </Typography.Title>
          </Col>
          <Col>
            <Typography.Title type='secondary' level={4}>
              {rassi_no}
            </Typography.Title>
          </Col>
        </Row>

        <Divider className='cs-theme-divider' />

        <Row gutter={[12, 12]}>
          <Col xs={24}>
            <div className='cs-dis-flex cs-jc-sb'>
              <Typography.Title level={2}>
                Problem Details
              </Typography.Title>
            </div>
          </Col>

          <Col>
            <Typography.Title level={4}>
              Problem:
            </Typography.Title>
          </Col>
          <Col>
            <Typography.Title type='secondary' level={4}>
              {problem}
            </Typography.Title>
          </Col>

          <Col>
            <Typography.Title level={4}>
              Problem Type:
            </Typography.Title>
          </Col>
          <Col>
            {problem_type.replace(/"/g, '').split(',').map((item, index) => {
              return <Tag>
                <Typography.Title type='secondary' level={4}>
                  {item}
                </Typography.Title>
              </Tag>
            })}
          </Col>
          {
            problem === "other" || problem === "injured" ? <>
              <Col>
                <Typography.Title level={4}>
                  Injury location:
                </Typography.Title>
              </Col>
              <Col>
                {injury_location.replace(/"/g, '').split(',').map((item, index) => {
                  return <Tag>
                    <Typography.Title type='secondary' level={4}>
                      {item}
                    </Typography.Title>
                  </Tag>
                })}
              </Col>
            </>
              : <>
                <Col>
                  <Typography.Title level={4}>
                    Symptoms:
                  </Typography.Title>
                </Col>
                <Col>
                  <Typography.Title type='secondary' level={4}>
                    {symptoms}
                  </Typography.Title>
                </Col>
              </>
          }
        </Row>

        <Divider className='cs-theme-divider' />

        <Row gutter={[12, 12]}>
          <Col xs={24}>
            <div className='cs-dis-flex cs-jc-sb'>
              <Typography.Title level={2}>
                Other Condition
              </Typography.Title>
            </div>
          </Col>

          <Col>
            <Typography.Title level={4}>
              Problem:
            </Typography.Title>
          </Col>
          <Col>
            <Typography.Title type='secondary' level={4}>
              {alt_problem}
            </Typography.Title>
          </Col>

          <Col>
            <Typography.Title level={4}>
              Problem Type:
            </Typography.Title>
          </Col>
          <Col>
            {alt_problem_type.replace(/"/g, '').split(',').map((item, index) => {
              return <Tag>
                <Typography.Title type='secondary' level={4}>
                  {item}
                </Typography.Title>
              </Tag>
            })}
          </Col>
          {
            alt_problem === "other" || alt_problem === "injured" ? <>
              <Col>
                <Typography.Title level={4}>
                  Injury location:
                </Typography.Title>
              </Col>
              <Col>
                {alt_injury_location.replace(/"/g, '').split(',').map((item, index) => {
                  return <Tag>
                    <Typography.Title type='secondary' level={4}>
                      {item}
                    </Typography.Title>
                  </Tag>
                })}
              </Col>
            </>
              : <>
                <Col>
                  <Typography.Title level={4}>
                    Symptoms:
                  </Typography.Title>
                </Col>
                <Col>
                  <Typography.Title type='secondary' level={4}>
                    {alt_symptoms}
                  </Typography.Title>
                </Col>
              </>
          }
        </Row>

        <Divider className='cs-theme-divider' />

        <Row gutter={[12, 12]}>
          <Col xs={24}>
            <div className='cs-dis-flex cs-jc-sb'>
              <Typography.Title level={2}>
                Cause of problem
              </Typography.Title>
            </div>
          </Col>

          <Col>
            <Typography.Title level={4}>
              Cause:
            </Typography.Title>
          </Col>
          <Col>
            <Typography.Title type='secondary' level={4}>
              {cause_of_problem}
            </Typography.Title>
          </Col>
        </Row>
        {/* <TolfaLocationHistoryLogs rescue_no={rescue_no} /> */}

        <TolfaAnimalStausModal
          refetchAdmissionList={refetchAdmissionList}
          status_id={status_id}
          statusTypeData={statusTypeData.data}
          rowData={rowData}
          rescue_no={rescue_no}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setShowModal={setShowModal} />
      </div>
      :
      <div className="cs-dis-flex cs-hrz-center cs-vt-center cs-h-100vh">
        <Loader />
      </div>
  )
}

export default TolfaAnimalStatus