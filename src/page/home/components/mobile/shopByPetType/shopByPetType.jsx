import React from "react";
import { BASE_URL_ASSET } from "../../../../../constant";
import "./shopByPetType.css";
import Slider from "react-slick";

const ShopByPetType = ({ petTypeList }) => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };
  return (
    <div>
      <div className="cs-text-mobile-heading cs-m-10 cs-font">Shop Deals For Your Best Buddy</div>

      <div className="cs-tm-10">
        <Slider {...settings}>
          {petTypeList.map((item, index) => {
            return (
              <div key={index}>
                <img
                  className="cs-shop-pet-type-img"
                  alt="shop-by-pet-type"
                  src={BASE_URL_ASSET + "/" + item.image}
                />
                <div className="cs-dis-flex cs-hrz-center">{item.name}</div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default ShopByPetType;
