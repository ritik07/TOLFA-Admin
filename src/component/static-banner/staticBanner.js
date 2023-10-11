import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import bannerImage from "./static/assets/images/banner-bg.png";
import bannerFeatureImage from "./static/assets/images/banner-two-img.png";
import "./static/styles/staticBanner.css";
import { BASE_URL_ASSET } from "../../constant";

export const StaticBanner = ({ staticBannerData }) => {
  return (
    <div>
      <Row>
        <Col xl={24} sm={24} xs={24} md={24}>
          <div className="cs-pos-rel">
            <div>
              <img className="cs-static-image" src={bannerImage}></img>
            </div>

            <div className="cs-pos-abs cs-static-banner-title">
              <div className="cs-static-banner-title cs-font">
                {staticBannerData.title}
              </div>
            </div>

            <div className="cs-pos-abs cs-static-banner-brief">
              <div className="cs-static-banner-content cs-font">
                {staticBannerData.sub_title}
              </div>
            </div>

            <div className="cs-pos-abs cs-static-banner-feature-image-position">
              <img
                className="cs-static-banner-feature-image"
                src={BASE_URL_ASSET + "/" + staticBannerData.image}
              ></img>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
