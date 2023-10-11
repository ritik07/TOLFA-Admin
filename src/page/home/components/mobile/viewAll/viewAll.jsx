import React from 'react'
import { BASE_URL_ASSET } from '../../../../../constant';
import { Col, Row, Typography } from 'antd';
import { useNavigate } from 'react-router-dom'

const ViewAll = ({ data, type }) => {
  const navigate = useNavigate()

  const handleSelect = (id, type) => {
    console.log("type", type);
    switch (type) {
      case 1:
        return navigate(`/brand/${id}/products`)
      case 2:
        return navigate(`/category/${id}/products`)

      default:
        break;
    }
  }
  return (
    <div>
      <div>
        <Row gutter={[5, 5]}>
          {data.map((item, index) => {
            return (
              <Col span={6} key={item.id}>
                <div
                  onClick={() => handleSelect(item.id, type)}
                  key={item.id}
                  id={item.id}
                  className="cs-dis-flex cs-hrz-center"
                >
                  <div className="cs-shop-brands-img-container">
                    <img
                      src={BASE_URL_ASSET + "/" + item.image}
                      className="cs-shop-brands-img"
                    />
                  </div>
                </div>
                <Col xs={24}>
                  <div className="cs-font cs-dis-flex cs-hrz-center cs-text-align">
                    {item.name}
                  </div>
                </Col>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  )
}

export default ViewAll