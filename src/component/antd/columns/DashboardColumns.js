import React from 'react'
import { Image } from 'antd'
export const DahboardColumn = [
	{
		title: 'Title',
		className: 'cs-fw-500',
		dataIndex: 'title',
		key: 'title',
		width: 300,
		fixed: 'left',
		render: (record, data, index) => {
			return (<div>
				<div className='cs-dis-flex'>
					<div>
						<Image src={data.thumbnail} className='cs-dashboard-table-image' />
					</div>
					<div className='cs-dis-flex cs-vt-center cs-lm-10'>
						{record}
					</div>
				</div>
			</div>)
		}
	},
	{
		title: 'Description',
		className: 'cs-fw-500',
		dataIndex: 'description',
		key: 'description',
		width: 200
	},
	{
		title: 'Category',
		className: 'cs-fw-500',
		dataIndex: 'category',
		key: 'category',
		width: 200,
	},
	{
		title: 'Brand',
		className: 'cs-fw-500',
		dataIndex: 'brand',
		key: 'brand',
		width: 200,
	},
	{
		title: 'Price',
		dataIndex: 'price',
		key: 'price',
		width: 120,
		render: (record) => <div className='cs-fs-18 cs-clr-secondary cs-fw-700'>{"$" + record}</div>
	},
	{
		title: 'Discount Percentage',
		dataIndex: 'discountPercentage',
		key: 'discountPercentage',
		width: 120,
		render: (record) => <div className='cs-fs-18 cs-clr-discount cs-fw-700'>{record + "%"}</div>
	},
	{
		title: 'Stock',
		dataIndex: 'stock',
		key: 'stock',
		width: 120,
		render: (record) => <div className={`${'cs-fs-18 cs-fw-700 ' + (record < 50 ? 'cs-clr-danger' : "cs-clr-purple")}`}>{record}</div>
	},
	{
		title: 'rating',
		dataIndex: 'rating',
		key: 'rating',
		width: 120,
		render: (record) => <div className={'cs-fs-18 cs-clr-success cs-fw-700'}>{record}</div>
	},
];