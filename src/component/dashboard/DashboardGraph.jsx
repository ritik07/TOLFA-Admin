import React, { useEffect } from 'react'
import { Chart } from '@antv/g2';

const DashboardGraph = ({ filterData, resetFilters }) => {
	useEffect(() => {
		removeContainer()
		configData()
	}, [filterData])

	const removeContainer = () => {
		//logic to handle re rendering of graph on every state update
		let count = document.getElementById('container')
		if (count.firstChild) {
			count.removeChild(count.firstChild);
		}
	}

	function configData() {
		// 0-499, 500-999, 1000-1499, 1500-2000
		filterData.forEach(obj => {
			if (obj.price > 0 && obj.price <= 499) {
				obj.clarity = '0 - 499'
			} else if (obj.price > 500 && obj.price <= 999) {
				obj.clarity = '500 - 999'
			} else if (obj.price > 1000 && obj.price <= 1499) {
				obj.clarity = '1000 - 1499'
			} else if (obj.price > 1500 && obj.price <= 2000) {
				obj.clarity = '1500 - 2000'
			}
			// obj.clarity = obj.title
			// obj.type = `${[obj.title] + ": " + obj.price}`
			obj.type = ``
			obj.label = `${[obj.title] + ": " + obj.price}`
		});

		const chart = new Chart({
			container: 'container',
			autoFit: true,
			height: 200,
			// padding: [0, 100, 80, 80],
			margin: [100, 100]
		});

		chart.tooltip({
			showCrosshairs: true,
			crosshairs: {
				type: 'xy',
			},
		});
		chart.data(filterData);
		chart.scale('label', {
			range: [0, 1]
		});
		chart.coordinate('polar');
		chart.legend(false);
		chart.axis('clarity', {
			grid: {
				alignTick: false,
				line: {
					style: {
						lineDash: [0, 0]
					},
				},
			},
		});
		chart
			.point()
			.adjust('jitter')
			.position('clarity*type')
			.color('clarity')
			.shape('circle')
			.tooltip('title*price*brand*category', (title, price, brand, category) => {
				return {
					name: title,
					value: "Price:" + price + " " + "Brand:" + brand + " " + "Category:" + category
				};
			})
			.style({
				fillOpacity: 0.85,
			})
		chart.render();
	}

	return (
		<div>
			<div id="container" />
			<div className='cs-fs-20 cs-fw-600 cs-pos-abs'>
				{!filterData.length ?
					<div>
						No data found on selected fitlers
						<p className='cs-font-12 cs-vt-center cs-hrz-center cs-dis-flex cs-cursor-pointer' onClick={resetFilters}>
							Reset filters?
						</p>
					</div>
					: ""}
			</div>
		</div>
	)
}

export default DashboardGraph