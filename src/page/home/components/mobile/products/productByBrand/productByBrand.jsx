import React, { useEffect, useState } from 'react'
import { BASE_URL, BASE_URL_ASSET } from '../../../../../../constant'
import axios from 'axios'
import Spinner from '../../loader/spinner'
import ProductCard from '../productCard/productCard'
import SinglePageCover from '../../singlePageCover/singlePageCover'
import { Col, Row, Space, Typography } from 'antd'
import { useParams, useNavigate } from 'react-router-dom';
import FloatingBack from '../../buttons/floatingBack/floatingBack'
import { ArrowLeftOutlined } from '@ant-design/icons'

const ProductByBrand = () => {
  const navigate = useNavigate()

  const [data, setData] = useState(false)
  useEffect(() => {
    getProductByBrands()
  }, [])

  let { brandId } = useParams();

  const getProductByBrands = async () => {
    try {
      let response = await axios.get(
        BASE_URL + `/product-list/byBrand/${brandId}`
      );
      setData(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  }

  const handleProductCard = (productId) => {
    navigate(`/brand/${brandId}/product/${productId}/product-details`)
  }
  const handleBackBtn = () => {
    navigate(-1)
  }
  return (
    data ?
      !data.length ?
        <div className='cs-mrl-10 cs-vh-60 cs-center'>
          <Typography.Title>
            No Product Found!!
          </Typography.Title>
        </div>
        :
        <div className='cs-pos-rel'>
          <SinglePageCover image={data[0]?.brand_image} />

          <div className='cs-mrl-10 cs-tm-20'>
            <div className='cs-tm-10 cs-bm-10'>
              <Space direction='horizontal'>
                <div onClick={handleBackBtn} style={{ fontSize: "20px" }}>
                  <ArrowLeftOutlined />
                </div>
                <Typography.Title level={2}>
                  {data[0].brand_name}
                </Typography.Title>
              </Space>
            </div>
            <Row gutter={[20, 20]}>
              {data?.map((item) => {
                return (
                  <Col xs={12} key={item.id} onClick={() => handleProductCard(item.id)}>
                    <ProductCard productData={item}
                    />
                  </Col>
                )
              })
              }
            </Row>

          </div>
          {/* <div className='cs-integrate-back-btn'>
            <FloatingBack />
          </div> */}
        </div>
      :
      <div>
        <Spinner />
      </div>
  )
}

export default ProductByBrand