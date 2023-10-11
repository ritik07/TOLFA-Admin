import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { BASE_URL_ASSET } from "../../../../../constant";
import { useNavigate } from 'react-router-dom'
import "./petWiseCategory.css";

const PetWiseCategory = ({ petWiseList }) => {
  const navigate = useNavigate()

  return (
    <div>
      {petWiseList.map((item, index) => {
        return (
          <div className="cs-bm-30" key={index + Math.random(0, 1000)}>
            <div className="cs-text-mobile-heading cs-font">
              Top Categories For {item.pet_type}
            </div>

            <div className="cs-tm-10">
              <Row gutter={[5, 25]}>
                {item.data.map((category, index) => {
                  return (
                    <Col span={6} key={index + Math.random(0, 1000)}>
                      <div
                        onClick={() => navigate(`/category/${category.id}/products`)}
                        key={category.id}
                        id={category.id}
                        className="cs-dis-flex cs-hrz-center"
                      >
                        <img
                          src={BASE_URL_ASSET + "/" + category.image}
                          className="cs-shop-brands-img"
                        />
                      </div>
                      <div className="cs-font cs-dis-flex cs-hrz-center cs-text-align">
                        {category.name}
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PetWiseCategory;
