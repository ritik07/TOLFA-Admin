import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL, BASE_URL_ASSET } from '../../../../../../constant';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Col, Row, Space, Typography } from 'antd';
import ConnectOnWhatsApp from '../../buttons/connectOnWhatsApp/connectOnWhatsApp';
import FloatingBack from '../../buttons/floatingBack/floatingBack';

const ProductSingle = () => {
  const [productData, setProductData] = useState(false)
  let { productId } = useParams();

  useEffect(() => {
    getProductData()
  }, [])

  const getProductData = async () => {
    try {
      let response = await axios.get(
        BASE_URL + `/product-list/${productId}?active=${true}`
      );
      setProductData(response.data.data[0]);
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div className='cs-m-10 cs-pos-rel'>
      <Row gutter={[20, 20]}>
        <Col xs={24}>
          <img className='cs-w-100' src={BASE_URL_ASSET + "/" + productData.image} alt="" />
        </Col>
        <Col xs={24}>
          <Typography.Title level={4}>
            {productData.name}
          </Typography.Title>
          <Space direction='horizontal'>
            <Typography.Title type='secondary' level={5}>
              ({productData.unit_value}
            </Typography.Title>
            <Typography.Title type='secondary' level={5}>
              {productData.unit})
            </Typography.Title>
          </Space>
        </Col>
        <Col xs={24}>
          <Space direction='horizontal'>
            <Typography.Title level={4} type='danger' className='cs-font-line-through'>
              ₹{productData.mrp}
            </Typography.Title>
            <Typography.Title level={3} type='success'>
              ₹{productData.sell_price}
            </Typography.Title>
          </Space>
        </Col>

        <Col xs={24}>
          <div className='cs-tm-10'>
            <ConnectOnWhatsApp productData={productData} />
          </div>
        </Col>
      </Row>
      <div className='cs-integrate-back-btn'>
        <FloatingBack />
      </div>
    </div>
  )
}

export default ProductSingle