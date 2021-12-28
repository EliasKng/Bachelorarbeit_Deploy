import React, {Component} from 'react';
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from 'chart.js';
import {Bar} from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			display: false,
			position: 'top' as const,
		},
		title: {
			display: true,
			text: 'Chart.js Bar Chart',
		},
	},
};

// const dateFormatter = (item: moment.MomentInput) => moment(item).format('MMM YY');
interface VisualizationProps {
	data: [Record<string, any>],
	schema: Record<string, any>,
	title: string,
}

export class VisChartjs extends Component<VisualizationProps> {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		if (this.props.data && this.props.schema) {
			return <div className="visualization">
				<Bar options={options} data={this.getDataSpec()}/>
			</div>;
		} else {
			return <div className="visualization">
				<h2>No visualization specified</h2>
			</div>;
		}
	}

	getDataSpec() {
		const labels = this.props.data.map(data => {
			return data[this.props.schema.primaryKey];
		});

		const values = this.props.data.map(data => {
			return data[this.props.schema.fields[1].name];
		});

		return {
			labels,
			datasets: [
				{
					label: 'Dataset 1',
					data: values,
					backgroundColor: 'rgba(106, 110, 229)',
				},
			],
		};
	}
}