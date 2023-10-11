import React from 'react'
import './productCard.css'
import { Col, Row, Space, Typography } from 'antd'
import { BASE_URL_ASSET } from '../../../../../../constant'
import ConnectOnWhatsApp from '../../buttons/connectOnWhatsApp/connectOnWhatsApp'
import { WhatsAppOutlined } from '@ant-design/icons'

const ProductCard = ({ productData }) => {

  return (
    <div>
      <div className='cs-card'>
        <Col xs={24}>
          <img className='cs-product-card-image' src={BASE_URL_ASSET + "/" + productData.image} alt={productData.name} />
          <Space direction='vertical'>
            <div className='cs-tm-10'>
              <Typography.Title level={5} className='cs-productdata-name'>
                {productData.name}
              </Typography.Title>
            </div>

            <Space direction='horizontal'>
              <Typography.Title className='cs-product-card-mrp' level={5}>
                ₹{productData.mrp}
              </Typography.Title>
              <Typography.Title className='cs-product-card-sell-price' level={5}>
                ₹{productData.sell_price}
              </Typography.Title>
            </Space>
          </Space>

          <div className='cs-tm-10'>
            <ConnectOnWhatsApp productData={productData} />
          </div>
        </Col>
      </div>
    </div >
  )
}

export default ProductCard