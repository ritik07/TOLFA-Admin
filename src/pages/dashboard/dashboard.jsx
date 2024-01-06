import React from 'react'
import { Row, Col } from 'antd'
import TotalRescuesBySpeciesChart from './TotalRescuesBySpeciesChart'
import TotalRescuesByCityChart from './TotalRescuesByCityChart'
import MostFrequentProblemTypesChart from './MostFrequentProblemTypesChart'

const Dashboard = () => {
  return (
    <div className='cs-vh-fit cs-scroll'>
      <Row gutter={[20, 20]}>
        <Col xs={12}>
          <TotalRescuesBySpeciesChart />
        </Col>
        <Col xs={12}>
          <TotalRescuesByCityChart />
        </Col>
        <Col xs={12} className='cs-tm-20'>
          <MostFrequentProblemTypesChart />
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard