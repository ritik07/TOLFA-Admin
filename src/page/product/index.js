import { Button, Col, Row } from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL, BASE_URL_ASSET } from "../../constant";
import Loader from "../../component/loader/loader";

const Product = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [loading, setLoading] = useState(false);
  const [addtocartLoading, setAddtocartLoading] = useState(false);
  const [itemCount, setItemCount] = useState(0);

  const {
    name,
    image,
    price,
    mrp,
    short_description,
    description,
    product_id,
    product_image,
  } = state;

  useEffect(() => {
    getCount();
  }, []);

  const getCount = async () => {
    setLoading(true);
    let payload = {
      product_id,
      user_id: JSON.parse(localStorage.getItem("user_id")),
      session_id: JSON.parse(localStorage.getItem("user_session")),
    };
    try {
      let result = await axios.post(BASE_URL + "cart/productcount", payload);
      if (!result.data.data.length) {
        setItemCount(0);
      } else {
        setItemCount(+result.data.data[0].quantity);
      }

      setLoading(false);
      console.log("result", result);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };

  const redirectToLogin = () => {
    if (
      !JSON.parse(localStorage.getItem("user_id")) ||
      !JSON.parse(localStorage.getItem("user_session"))
    ) {
      navigate("/");
      return true;
    } else {
      return false;
    }
  };

  const handleOnBuy = () => {
    if (!redirectToLogin()) {
      navigate("/cart");
    }
    // navigate(
    //   `/home/category/${window.location.pathname.split("/")[3]}/${
    //     window.location.pathname.split("/")[4]
    //   }/product/${window.location.pathname.split("/")[6]}/${
    //     window.location.pathname.split("/")[7]
    //   }/purchase`
    // );
  };
  const handleOnAddToCart = async () => {
    setAddtocartLoading(true);
    if (!redirectToLogin()) {
      const payload = {
        product_id: product_id,
        price: price,
        user_id: JSON.parse(localStorage.getItem("user_id")),
        session_id: JSON.parse(localStorage.getItem("user_session")),
        quantity: 1,
      };
      try {
        let result = await axios.post(BASE_URL + "cart/addtocart", payload);
        setAddtocartLoading(false);
        console.log("result", result);
        // setItemCount(result.data.data[0].quantity);
        getCount();
      } catch (error) {
        setAddtocartLoading(false);
        console.log("error", error);
      }
    }
  };

  const removeSingleItem = async () => {
    try {
      const payload = {
        product_id: +product_id,
        user_id: JSON.parse(localStorage.getItem("user_id")),
        session_id: JSON.parse(localStorage.getItem("user_session")),
        current_qty: +itemCount,
      };

      let response = await axios.put(
        BASE_URL + "/cart/removesingleitem",
        payload
      );
      getCount();
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  return !loading ? (
    <div>
      <Row>
        <Col span={12}>
          <img
            className="cs-w-max p-5"
            src={BASE_URL_ASSET + "/" + product_image}
          />
        </Col>
        <Col span={12}>
          <div className="cs-product-name cs-notation">{name}</div>

          <div>{description}</div>
          <div>
            <h2 className="cs-mrp">Rs {mrp}</h2>
          </div>
          <div>
            <h2>Rs {price}</h2>
          </div>
        </Col>
      </Row>

      <Row className="cs-mt-30">
        <Col span={24}>
          <div className="cs-float-right cs-dis-flex">
            <Row gutter={[40, 40]}>
              {itemCount ? (
                <Col span={10}>
                  <Button onClick={handleOnBuy}>Buy now</Button>
                </Col>
              ) : null}

              {!itemCount ? (
                <Col span={14}>
                  <Button
                    onClick={handleOnAddToCart}
                    loading={addtocartLoading}
                  >
                    Add to cart
                  </Button>
                </Col>
              ) : (
                <Col span={14}>
                  <Row gutter={[10, 10]}>
                    <Col>
                      <Button
                        onClick={handleOnAddToCart}
                        disabled={addtocartLoading}
                      >
                        +
                      </Button>
                    </Col>

                    <Col className="cs-dis-flex cs-vt-center cs-hrz-center">
                      <div>{itemCount}</div>
                    </Col>

                    <Col>
                      <Button
                        onClick={removeSingleItem}
                        disabled={addtocartLoading}
                      >
                        -
                      </Button>
                    </Col>
                  </Row>
                </Col>
              )}
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  ) : (
    <div className="cs-dis-flex cs-hrz-center cs-vt-center cs-h-100vh">
      <Loader />
    </div>
  );
};

export default Product;
