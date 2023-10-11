import React from 'react'
import { Table, Pagination, Card, Switch, Spin, Progress } from 'antd'
import { DahboardColumn } from '../antd/columns/DashboardColumns'
import OverAllAnalytics from './OverAllAnalytics'

const Overview = ({ filterData, current, total, pagination, resetFilters, completeData,
	setShowCompleteAnalytics, showCompleteAnalytics }) => {
	return (
		<div>
			<div className='cs-fw-700 cs-fs-24 cs-bm-10'>
				Overview
			</div>

			{/* below part is in bonus */}
			<Card className='cs-bm-10'>
				<div className='cs-dis-flex'>
					<div className='cs-fw-600 cs-rm-10'>
						Show complete data analytics
					</div>
					<Switch checked={showCompleteAnalytics} onChange={(value) => setShowCompleteAnalytics(value)} />
				</div>
				<div>
					{showCompleteAnalytics ? completeData ?
						<OverAllAnalytics completeData={completeData} />
						: <div className='cs-vt-center cs-hrz-center cs-dis-flex'>
							<Spin />
						</div>
						: null}
				</div>
			</Card>

			{/* Main table */}
			{filterData.length ?
				<div>
					<Table dataSource={filterData}
						columns={DahboardColumn}
						rowKey="id"
						pagination={false}
						scroll={{ y: showCompleteAnalytics ? 'calc(100vh - 458px)' : 'calc(100vh - 365px)', x: 'calc(700px + 50%)' }} />

					<Pagination className="cs-tm-10 cs-bm-10" current={current}
						pageSize={10} total={total} onChange={pagination}
						showSizeChanger={false} />
				</div> :
				<div className='cs-vh60  cs-vt-center cs-hrz-center cs-dis-flex'>
					<div className='cs-fs-20 cs-fw-600'>
						No data found on selected fitlers
						<p className='cs-font-12 cs-vt-center cs-hrz-center cs-dis-flex cs-cursor-pointer' onClick={resetFilters}>
							Reset filters?
						</p>
					</div>
				</div>}
		</div>
	)
}

export default Overview