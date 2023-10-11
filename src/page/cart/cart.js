import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constant";
import { Card, Col, Row, Button } from "antd";
import { useNavigate } from "react-router-dom";
import useRazorpay from "react-razorpay";

const Cart = () => {
  const navigate = useNavigate();
  let sum = 0;

  const [cartItems, setCartItems] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);

  useEffect(() => {
    getCartDetails();
  }, []);

  let totalPrice = 0;
  let inititateOrderDetail = {
    amount:
      cartItems.reduce((inital, item, index) => {
        totalPrice += item.total;
        console.log("item", item);
        if (cartItems.length === index + 1) {
          return totalPrice;
        }
      }, 0) * 100,
    currency: "INR",
  };
  const Razorpay = useRazorpay();
  const handlePayment = async (e) => {
    try {
      const response = await axios.post(BASE_URL + "payment/process-payment", {
        inititateOrderDetail,
      });

      const options = {
        key: "rzp_live_aBs0ePN97PGbnR", // Enter the Key ID generated from the Dashboard
        key_id: "rzp_live_aBs0ePN97PGbnR",
        amount: inititateOrderDetail.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: inititateOrderDetail.currency,
        name: "Doggiesthan",
        description: "Test Transaction",
        image: "https://dummyimage.com/600x400/000/fff",
        order_id: response.orderId, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
        handler: function (res) {
          console.log("res", res);
          let redirect_url;
          if (
            typeof res.razorpay_payment_id == "undefined" ||
            res.razorpay_payment_id < 1
          ) {
            redirect_url = "/you-owe-money.html";
          } else {
            handleSuccess(res.razorpay_payment_id);
            redirect_url = "/thnx-you-paid.html";
          }
          console.log("redirect_url", redirect_url);
        },
        // modal: {
        //   ondismiss: function () {
        //     console.log("Checkout form closed");
        //   },
        // },
        prefill: {
          name: "Ritik Soni",
          email: "ritiksingat7@gmail.com",
          contact: "919509636507",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new Razorpay(options);

      rzp1.on("payment.failed", function (response) {
        console.log("response", response);
        // alert(response.error.code);
        // alert(response.error.description);
        // alert(response.error.source);
        // alert(response.error.step);
        // alert(response.error.reason);
        // alert(response.error.metadata.order_id);
        // alert(response.error.metadata.payment_id);
      });

      rzp1.open();
      // const response = await axios.post(BASE_URL + "payment/process-payment", {
      //   options,
      // });
      // console.log("response", response);
      // const { orderId } = response.data;

      // let rzp = new Razorpay(options);
      // console.log("rzp", rzp);
      // rzp.open();
    } catch (error) {
      console.error(error);
      alert("Failed to process payment");
    }
  };

  const removeSingleItem = async (product_id, current_qty) => {
    if (removeLoading) {
      return;
    }
    try {
      setRemoveLoading(true);
      const payload = {
        product_id: +product_id,
        user_id: JSON.parse(localStorage.getItem("user_id")),
        session_id: JSON.parse(localStorage.getItem("user_session")),
        current_qty: +current_qty,
      };

      let response = await axios.put(
        BASE_URL + "/cart/removesingleitem",
        payload
      );
      setRemoveLoading(false);
      getCartDetails();
      console.log("response", response);
    } catch (error) {
      setRemoveLoading(false);
      console.log("error", error);
    }
  };

  const handleSuccess = async (payment_id) => {
    const payload = {
      user_id: JSON.parse(localStorage.getItem("user_id")),
      session_id: JSON.parse(localStorage.getItem("user_session")),
      payment_id: payment_id,
      cart_detail: cartItems,
      total: inititateOrderDetail.amount,
    };
    let response = await axios.post(BASE_URL + "order/create", payload);
    // localStorage.removeItem("user_session");
    console.log("response", response);
  };

  const getCartDetails = async () => {
    const payload = {
      user_id: JSON.parse(localStorage.getItem("user_id")),
      session_id: JSON.parse(localStorage.getItem("user_session")),
    };
    let cartResponse = await axios.post(
      BASE_URL + "cart/getcartdetail",
      payload
    );
    setCartItems(cartResponse.data.data);
    console.log("cartResponse", cartResponse);
  };

  return (
    <div>
      <Card>
        <Row>
          <Col xs={4}>No.</Col>

          <Col xs={4}>Name</Col>

          <Col xs={4}>Price</Col>

          <Col xs={4}>Qty.</Col>

          <Col xs={4}>Sub Total</Col>

          <Col xs={4}>Actions</Col>
        </Row>
      </Card>

      <Card>
        {cartItems.length ? (
          cartItems.map((item, index) => {
            return (
              <Row className="cs-tm-20" key={item.id}>
                <Col xs={4}>{index + 1}</Col>
                <Col xs={4}>Test</Col>
                <Col xs={4}>{item.price}</Col>
                <Col xs={4}>{item.quantity}</Col>
                <Col xs={4}>{item.total}</Col>

                <Col xs={4}>
                  <div
                    className="txt-remove cs-dis-flex cs-vt-center"
                    style={{ color: removeLoading ? "#9999" : "red" }}
                    onClick={() =>
                      removeSingleItem(item.product_id, item.quantity)
                    }
                  >
                    REMOVE
                  </div>
                </Col>
              </Row>
            );
          })
        ) : (
          <Row>
            <Col xs={24}>
              <div className="cs-dis-flex cs-hrz-center cs-tm-40">
                No Items found.
              </div>
            </Col>
          </Row>
        )}
      </Card>
      {cartItems.length ? (
        <Card>
          <Row>
            <Col xs={18}>
              TOTAL ={" "}
              {cartItems.reduce((inital, item, index) => {
                sum += item.total;
                console.log("item", item);
                if (cartItems.length === index + 1) {
                  return sum;
                }
              }, 0)}
            </Col>
            <Col xs={6}>{/* <PaytmButton /> */}</Col>
          </Row>
        </Card>
      ) : null}

      {/* <Button onClick={handleSuccess}>Success</Button> */}
      {cartItems.length ? <Button onClick={handlePayment}>Pay</Button> : null}
      {/* <Button>Failure</Button> */}
    </div>
  );
};

export default Cart;
