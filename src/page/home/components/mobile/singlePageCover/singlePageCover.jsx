import React from 'react'
import { BASE_URL_ASSET } from '../../../../../constant'
import { Col, Row } from 'antd'
import "./singlePageCover.css"

const SinglePageCover = ({ image }) => {
  return (
    <div>
      <Row>
        <Col xs={24}>
          <div className='cs-center'>
            <div className='gradient-overlay'>
              <img className='cs-w-100' src={BASE_URL_ASSET + "/" + image} />
            </div>
          </div>
        </Col>
      </Row>


    </div>
  )
}

export default SinglePageCover