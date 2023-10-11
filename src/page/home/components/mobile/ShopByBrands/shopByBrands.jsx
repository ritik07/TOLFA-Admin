import { Col, Row, Typography } from "antd";
import React, { useEffect } from "react";
import { BASE_URL_ASSET } from "../../../../../constant";
import "./shopByBrands.css";
import { useNavigate } from 'react-router-dom'

const ShopByBrands = ({ brandsList }) => {
  const navigate = useNavigate()

  const onBrandSelect = (id) => {
    navigate(`brand/${id}/products`)
  }
  return (
    <div>
      <div className="cs-text-mobile-heading cs-font">
        <div className="cs-dis-flex cs-jc-sb">
          <Typography.Title level={5}>
            Shop by Brands
          </Typography.Title>

          <Typography.Title level={5} onClick={() => navigate("/allbrands")}>
            View all
          </Typography.Title>
        </div>
      </div>

      <div className="cs-tm-10">
        <Row gutter={[5, 5]}>
          {brandsList.map((item, index) => {
            return (
              <Col span={6} key={item.id}>
                <div
                  onClick={() => onBrandSelect(item.id)}
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
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default ShopByBrands;
