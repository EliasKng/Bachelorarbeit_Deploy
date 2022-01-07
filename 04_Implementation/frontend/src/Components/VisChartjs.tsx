import React, {Component} from 'react';
import {BarElement, CategoryScale, Chart, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from 'chart.js';
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
			display: false,
			text: 'Chart.js Bar Chart',
		},
	},
};

// const dateFormatter = (item: moment.MomentInput) => moment(item).format('MMM YY');
interface VisualizationProps {
	data: [Record<string, any>],
	schema: Record<string, any>,
	title: string,
	highlitedBarIndexes: number[],
	selectedBarIndexes: number[],
	toggleSelectBarIndex: (int) => void;
}

export class VisChartjs extends Component<VisualizationProps> {
	private chartRef;
	constructor(props) {
		super(props);
		this.state = {};
		this.clickBarElement = this.clickBarElement.bind(this);
		this.chartRef = React.createRef();
	}

	render() {
		if (this.props.data && this.props.schema) {
			return <div className="visualization">
				<Bar
					options={options}
					data={this.getDataSpec()}
					onClick={this.clickBarElement}
					ref={this.chartRef}
				/>
			</div>;
		} else {
			return <div className="visualization">
				<h2>No visualization specified</h2>
			</div>;
		}
	}

	clickBarElement = (event) => {
		const chart = Chart.getChart(this.chartRef.current);
		const clickedElements = chart.getElementsAtEventForMode(event, 'nearest',{intersect: true}, false);
		const index = clickedElements[0] ? clickedElements[0]['index'] : null;
		this.props.toggleSelectBarIndex(index);
	}

	getLabels(): string[] {
		return this.props.data.map(data => {
			return data[this.props.schema.primaryKey];
		});
	}

	getValues () {
		return this.props.data.map(data => {
			return data[this.props.schema.fields[1].name];
		});
	}

	getDataSpec() {
		const labels = this.getLabels();
		const values = this.getValues();

		return {
			labels,
			datasets: [
				{
					label: 'Dataset 1',
					data: values,
					backgroundColor: this.getColorCodes(),
				},
			],
		};
	}

	// Color palette @see https://coolors.co/264653-2a9d8f-e9c46a-f4a261-e76f51
	getColorCodes(): string[] {
		const colorBase = '#f4a261';
		const colorHighlited = '#e76f51';
		const colorMarked = '#2A9D8F';

		const labels: string[] = this.getLabels();
		const colors = Array(labels.length).fill(colorBase);

		this.props.selectedBarIndexes.forEach(selectedIndex => {
			colors[selectedIndex] = colorMarked;
		});

		this.props.highlitedBarIndexes.forEach(highlitedIndex => {
			colors[highlitedIndex] = colorHighlited;
		});

		return colors;
	}
}