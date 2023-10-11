import { Col, Row, Typography } from "antd";
import React, { useEffect } from "react";
import { BASE_URL_ASSET } from "../../../../../constant";
import { useNavigate } from 'react-router-dom'
import "./shopByCategory.css";

const ShopByCategory = ({ categoryList }) => {
  const navigate = useNavigate()

  return (
    <div>
      <div className="cs-text-mobile-heading cs-font">
        <div className="cs-dis-flex cs-jc-sb">
          <Typography.Title level={5}>
            Shop by Cateogry
          </Typography.Title>

          <Typography.Title level={5} onClick={() => navigate('/allcategories')}>
            View all
          </Typography.Title>
        </div>
      </div>

      <div className="cs-tm-10">
        <Row gutter={[5, 25]}>
          {categoryList.map((item, index) => {
            return (
              <Col span={6} key={item.id}>
                <div
                  onClick={() => navigate(`/category/${item.id}/products`)}
                  key={item.id}
                  id={item.id}
                  className="cs-dis-flex cs-hrz-center"
                >
                  <img
                    src={BASE_URL_ASSET + "/" + item.image}
                    className="cs-shop-brands-img"
                  />
                </div>
                <div className="cs-font cs-dis-flex cs-hrz-center cs-text-align">
                  {item.name}
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default ShopByCategory;
