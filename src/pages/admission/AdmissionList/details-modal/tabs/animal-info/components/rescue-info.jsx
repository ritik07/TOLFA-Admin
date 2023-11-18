import { Col, Divider, Row, Typography } from 'antd'
import React from 'react'

const RescueInfo = ({ rescueInfoProps }) => {
  const { rescue_type_name, species_name, rescue_by_tolfa,
    care_people_name, care_people_mob_no, care_people_alt_mob_no, care_people_address,
    rescued_by_team_user_names } = rescueInfoProps
  return (
    <div>
      <Row gutter={[12, 12]}>
        <Col xs={24}>
          <Typography.Title level={2}>
            Rescue Info
          </Typography.Title>
        </Col>

        <Col>
          <Typography.Title level={4}>
            Rescue Type:
          </Typography.Title>
        </Col>
        <Col>
          <Typography.Title type='secondary' level={4}>
            {rescue_type_name}
          </Typography.Title>
        </Col>

        <Col>
          <Typography.Title level={4}>
            Rescue Species:
          </Typography.Title>
        </Col>
        <Col>
          <Typography.Title type='secondary' level={4}>
            {species_name}
          </Typography.Title>
        </Col>

        <Col>
          <Typography.Title level={4}>
            Rescue by:
          </Typography.Title>
        </Col>
        <Col>
          <Typography.Title type='secondary' level={4}>
            {rescue_by_tolfa ? "Tolfa team" : "Caregiver"}
          </Typography.Title>
        </Col>
      </Row>

      <Divider className='cs-theme-divider' />

      {!rescue_by_tolfa ?
        <Row gutter={[12, 12]}>
          <Col xs={24}>
            <Typography.Title level={2}>
              Rescuer Details
            </Typography.Title>
          </Col>

          <Col>
            <Typography.Title level={4}>
              Caregiver name:
            </Typography.Title>
          </Col>
          <Col>
            <Typography.Title type='secondary' level={4}>
              {care_people_name}
            </Typography.Title>
          </Col>

          <Col>
            <Typography.Title level={4}>
              Caregiver Contact Info:
            </Typography.Title>
          </Col>
          <Col>
            <Typography.Title type='secondary' level={4}>
              {care_people_mob_no}
            </Typography.Title>
          </Col>

          <Col>
            <Typography.Title level={4}>
              Caregiver ALT. Contact Info:
            </Typography.Title>
          </Col>
          <Col>
            <Typography.Title type='secondary' level={4}>
              {care_people_alt_mob_no}
            </Typography.Title>
          </Col>

          <Col xs={24}>
            <Row gutter={[12, 12]}>
              <Col>
                <Typography.Title level={4}>
                  Caregiver Address:
                </Typography.Title>
              </Col>
              <Col>
                <Typography.Title type='secondary' level={4}>
                  {care_people_address}
                </Typography.Title>
              </Col>

            </Row>
          </Col>
        </Row>
        : <Row gutter={[12, 12]}>
          <Col xs={24}>
            <Typography.Title level={2}>
              Rescuer Details
            </Typography.Title>
          </Col>

          <Col xs={24}>
            <Row gutter={[12, 12]}>
              <Col>
                <Typography.Title level={4}>
                  Rescued by:
                </Typography.Title>
              </Col>
              <Col>
                <Typography.Title type='secondary' level={4}>
                  {rescued_by_team_user_names}
                </Typography.Title>
              </Col>
            </Row>

          </Col>
        </Row >}
    </div >
  )
}

export default RescueInfo