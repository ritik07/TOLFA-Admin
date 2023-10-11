import React, { useEffect, useState } from 'react'
import { BASE_URL, BASE_URL_ASSET } from '../../../../../../constant'
import axios from 'axios'
import Spinner from '../../loader/spinner'
import ProductCard from '../productCard/productCard'
import SinglePageCover from '../../singlePageCover/singlePageCover'
import { Col, Row, Space, Typography } from 'antd'
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { setProductDetail } from '../../../../../../redux/actions/productActions'
import FloatingBack from '../../buttons/floatingBack/floatingBack'
import { ArrowLeftOutlined } from '@ant-design/icons'

const ProductByCategory = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [data, setData] = useState(false)
  useEffect(() => {
    getProductByCategory()
  }, [])

  let { categoryId } = useParams();

  const getProductByCategory = async () => {
    try {
      let response = await axios.get(
        BASE_URL + `/product-list/byCategory/${categoryId}`
      );
      setData(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  }

  const handleProductCard = (productId) => {
    navigate(`/category/${categoryId}/products/${productId}/product-details`)
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
          <SinglePageCover image={data[0]?.category_image} />
          <div className='cs-mrl-10 cs-tm-20'>
            <div className='cs-tm-10 cs-bm-10'>
              <Space direction='horizontal'>
                <div onClick={handleBackBtn} style={{ fontSize: "20px" }}>
                  <ArrowLeftOutlined />
                </div>
                <Typography.Title level={2}>
                  {data[0].category_name}
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

export default ProductByCategory