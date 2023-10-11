import { Col, Row } from "antd";
import React, { useState, useEffect } from "react";
import Card from "../../component/card/card";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../component/card/ProductCard";
import axios from "axios";
import { BASE_URL } from "../../constant";
import Loader from "../../component/loader/loader";

const Products = () => {
  const navigate = useNavigate();
  const handleProduct = (id, product_slug, productDetai) => {
    navigate(
      "/home/category/" +
        window.location.pathname.split("/")[3] +
        "/" +
        window.location.pathname.split("/")[4] +
        "/product/" +
        id +
        "/" +
        product_slug,
      { state: productDetai }
    );
  };

  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProductByCategoryId();
  }, []);

  const getProductByCategoryId = async () => {
    setLoading(true);
    try {
      let categoryID = window.location.pathname.split("/")[3];
      let response = await axios.get(
        BASE_URL + `product/get/bycategoryid/${categoryID}`
      );
      setProductData(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };

  return !loading ? (
    productData.length ? (
      <div>
        <Row gutter={[12, 12]}>
          {productData.map((item, index) => {
            return (
              <Col
                xs={12}
                key={index}
                onClick={() => handleProduct(item.product_id, item.slug, item)}
              >
                <ProductCard
                  name={item.name}
                  image={item.product_image}
                  shortDecription={item.short_description}
                  mrp={item.mrp}
                  price={item.price}
                />
              </Col>
            );
          })}
        </Row>
      </div>
    ) : (
      <div className="cs-dis-flex cs-hrz-center cs-vt-center cs-h-100vh">
        <h2>No Products Found</h2>
      </div>
    )
  ) : (
    <div className="cs-dis-flex cs-hrz-center cs-vt-center cs-h-100vh">
      <Loader />
    </div>
  );
};

export default Products;
