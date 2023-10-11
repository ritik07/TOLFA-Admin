import React, { useState, useEffect } from 'react'
import { Progress, Card, Row, Col, Tooltip } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'

const OverAllAnalytics = ({ completeData }) => {
  const [bestProduct, setBestProduct] = useState(false)
  const [lowStock, setLowStock] = useState(false)
  const [bestDeals, setBestDeals] = useState(false)

  let totalProducts = completeData.length

  useEffect(() => {
    getAnalytics()
  }, [])

  const getAnalytics = () => {
    let bestRating = completeData.filter((item) => item.rating > 4.5).length
    let stockCount = completeData.filter((item) => item.stock <= 50).length
    let bestDealsCount = completeData.filter((item) => item.discountPercentage >= 16).length

    setLowStock((100 * stockCount) / totalProducts)
    setBestProduct((100 * bestRating) / totalProducts)
    setBestDeals((100 * bestDealsCount) / totalProducts)
  }

  return (
    <div className='cs-tm-20'>
      <Row gutter={[10, 10]}>
        <Col lg={8}>
          <Card size='small' className='cs-br-10'>
            <div className='cs-fw-500'>
              Best products
              <span className='cs-lm-10'>
                <Tooltip title="Products having rating above 4.5">
                  <InfoCircleOutlined />
                </Tooltip>
              </span>
            </div>
            <Progress percent={bestProduct} className='cs-best-products' />
          </Card>
        </Col>

        <Col lg={8}>
          <Card size='small' className='cs-br-10'>
            <div className='cs-fw-500'>
              Low in stock
              <span className='cs-lm-10'>
                <Tooltip title="Products having stock count less than 50">
                  <InfoCircleOutlined />
                </Tooltip>
              </span>
            </div>
            <Progress percent={lowStock} className='cs-low-stock' />
          </Card>
        </Col>

        <Col lg={8}>
          <Card size='small' className='cs-br-10'>
            <div className='cs-fw-500'>
              Best deals
              <span className='cs-lm-10'>
                <Tooltip title="Products having discount greater than 15">
                  <InfoCircleOutlined />
                </Tooltip>
              </span>
            </div>
            <Progress percent={bestDeals} className='cs-best-deals' />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default OverAllAnalytics