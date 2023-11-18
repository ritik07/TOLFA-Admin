import { Col, Image, Row, Typography } from 'antd'
import React from 'react'
import { BASE_URL_ASSET } from '../../../../../../../constants/server'
import { ANIMAL_COLOR } from '../../../details-modal.constant'

const Profile = ({ profileProps }) => {
  const { animal_name, animal_image, age: animal_age, breed_name,
    species_name, sex,
    id_features, main_color_id, second_color_id, thirdcolor_id, } = profileProps
  return (
    <div>
      <Row gutter={[12, 12]}>
        <Col xs={24}>
          <Typography.Title level={2}>
            Profile details
          </Typography.Title>

        </Col>

        <Col xs={3}>
          <Image className='cs-animal-pic' src={BASE_URL_ASSET + "/" + animal_image} alt="animal-pic" />

        </Col>

        <Col xs={21}>
          <Row gutter={[10, 10]}>
            <Col>
              <Typography.Title level={4}>
                Name:
              </Typography.Title>
            </Col>
            <Col>
              <Typography.Title type='secondary' level={4}>
                {animal_name} ({sex ? "Male" : "Female"})
              </Typography.Title>
            </Col>

            <Col>
              <Typography.Title level={4}>
                Species Name:
              </Typography.Title>
            </Col>
            <Col>
              <Typography.Title type='secondary' level={4}>
                {species_name}
              </Typography.Title>
            </Col>

            <Col>
              <Typography.Title level={4}>
                Breed:
              </Typography.Title>
            </Col>
            <Col>
              <Typography.Title type='secondary' level={4}>
                {breed_name}
              </Typography.Title>
            </Col>

            <Col>
              <Typography.Title level={4}>
                Age:
              </Typography.Title>
            </Col>

            <Col>
              <Typography.Title type='secondary' level={4}>
                {animal_age}
              </Typography.Title>
            </Col>
          </Row>

          <div className='cs-tm-5' />
          <Row gutter={[10, 10]}>
            <Col>
              <Typography.Title level={4}>
                Main Color:
              </Typography.Title>
            </Col>
            <Col>
              <Typography.Title type='secondary' level={4}>
                {ANIMAL_COLOR.find((x) => x.value === main_color_id).name}
              </Typography.Title>
            </Col>

            <Col>
              <Typography.Title level={4}>
                Secondary Color:
              </Typography.Title>
            </Col>
            <Col>
              <Typography.Title type='secondary' level={4}>
                {ANIMAL_COLOR.find((x) => x.value === second_color_id).name}
              </Typography.Title>
            </Col>

            <Col>
              <Typography.Title level={4}>
                Third Color:
              </Typography.Title>
            </Col>
            <Col>
              <Typography.Title type='secondary' level={4}>
                {ANIMAL_COLOR.find((x) => x.value === thirdcolor_id).name}
              </Typography.Title>
            </Col>
          </Row>

          <div className='cs-tm-5' />

          <Row gutter={[10, 10]}>
            <Col>
              <Typography.Title level={4}>
                ID Features:
              </Typography.Title>
            </Col>
            <Col>
              <Typography.Title type='secondary' level={4}>
                {id_features}
              </Typography.Title>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default Profile