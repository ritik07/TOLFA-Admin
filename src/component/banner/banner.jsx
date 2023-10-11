import { Col, Row } from "antd";
import React from "react";
import Slider from "react-slick";
import { BASE_URL_ASSET } from "../../constant";

const Banner = ({ bannerData }) => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <Slider {...settings}>
        {bannerData.map((item, index) => {
          return (
            <div key={index}>
              <img
                className="cs-w-max"
                alt="banner"
                src={BASE_URL_ASSET + "/" + item.image}
              />
            </div>
            // <Col
            //   key={item.id}
            //   xs={12}
            //   onClick={() => handleCateogry(item.id, item.slug)}
            // >
            //   <Card
            //     name={item.name}
            //     image={item.image}
            //     shortDecription={item.short_description}
            //   />
            // </Col>
          );
        })}
      </Slider>
      {/* <Row>
        <Col span={24}>
          <img
            className="cs-w-max"
            src="https://img.freepik.com/free-psd/healthy-dog-food-banner-template_23-2148457498.jpg?w=2000&t=st=1671896166~exp=1671896766~hmac=7f3b012d63c90693991c44c76bb06b89228c04c0a9ec8d09fc0761e82767af7b"
          />
        </Col>
      </Row> */}
    </div>
  );
};

export default Banner;
