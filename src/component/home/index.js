import React, { useState, useEffect } from "react";
import Card from "../card/card";
import { Col, Row } from "antd";
import Banner from "../banner/banner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constant";
import Slider from "react-slick";

const Home = () => {
  const navigate = useNavigate();
  const handleCateogry = (id, categoryName) => {
    navigate("/home/category/" + id + "/" + categoryName);
  };

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  const [categoryData, setCategoryData] = useState([]);
  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    try {
      let response = await axios.get(BASE_URL + "category/get");
      setCategoryData(response.data.data);
      getBanners();
    } catch (error) {
      console.log("error", error);
    }
  };

  const getBanners = async () => {
    try {
      let response = await axios.get(BASE_URL + "banner/get");
      setBannerData(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <div className="cs-m-10">
        <Banner bannerData={bannerData} />
      </div>
      {/* Category */}
      <div className="cs-notation cs-bm-5">Category</div>
      {/* <Row gutter={[12, 12]}> */}
      <Slider {...settings}>
        {categoryData.map((item, index) => {
          return (
            <div key={index} onClick={() => handleCateogry(item.id, item.slug)}>
              <Card
                name={item.name}
                image={item.image}
                shortDecription={item.short_description}
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
      {/* </Row> */}
    </div>
  );
};

export default Home;
