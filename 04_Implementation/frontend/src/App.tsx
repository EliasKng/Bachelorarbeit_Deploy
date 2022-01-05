import React, {Component} from 'react';
import './Scss/App.scss';
import {VisualizationSettings} from './Components/VisualizationSettings';
import {VisChartjs} from './Components/VisChartjs';
import {Summary} from './Components/Summary';
import {getRequest, postRequest, wait} from './Components/Requests';

class App extends Component {
	private apiSchemaEndpoint = '/openapi.json';
	private apiDataEndpoint = '/data';

	constructor(props) {
		super(props);
		this.state = {
			apiSchema: undefined,
			summary: '',
			visSchema: '',
			visColorCode: ['rgba(106, 110, 229)'],
			highlightedElements: {
				bars: [],
				settingElements: {
					xAxis: false,
					yAxis: false,
					aggregate: false,
				},
			},
		};
		this.updateAttribute = this.updateAttribute.bind(this);
		this.updateSummary = this.updateSummary.bind(this);
		this.updateAnalyzedSummary = this.updateAnalyzedSummary.bind(this);
		this.setHighlightVisSetting = this.setHighlightVisSetting.bind(this);
		this.setHighlighting = this.setHighlighting.bind(this);
	}

	render() {
		return <div className="App">
			<body>
			<VisChartjs
				data={this.state['visData']}
				schema={this.state['visSchema']}
				title={this.state['visTitle']}
				highlitedBarIndexes={this.state['highlightedElements']['bars']}
				selectedBarIndexes={[]}
			/>
			<VisualizationSettings
				apiSchema={this.state['apiSchema']}
				changeSetting={this.updateAttribute}
				highlighted={this.state['highlightedElements']['settingElements']}
			/>
			<Summary
				summary={this.state['summary']}
				updateSummary={this.updateSummary}
				visData={this.state['visData']}
				updateAnalyzedSummary={this.updateAnalyzedSummary}
				setHighlighting={this.setHighlighting}
			/>
			</body>
		</div>;
	}

	componentDidMount() {
		this.requestApiSchema();
	}

	async updateAttribute(attribute: string, value: string) {
		// Check if state was already set
		if (this.state[attribute] === value) {
			return;
		}
		await this.setState({[attribute]: value});
		const requiredFields = ['ValuesRowName', 'IndexRowName', 'Aggregate'];
		const hasAllKeys = requiredFields.every(item => this.state.hasOwnProperty(item));
		if (hasAllKeys) {
			await this.requestVisData();
		}
	}

	updateSummary(event) {
		this.setState({summary: event.target.value});
	}

	updateAnalyzedSummary(summaryHtml) {
		this.setState({summary: summaryHtml});
	}

	async requestVisData() {
		const requestBody = {
			aggregate: this.state['Aggregate'],
			index_row_name: this.state['IndexRowName'],
			values_row_name: this.state['ValuesRowName'],
		};
		await postRequest(this.apiDataEndpoint, requestBody).then(async json => {
			this.setState({
				visData: json.data,
				visSchema: {
					fields: json.schema.fields,
					primaryKey: json.schema.primaryKey[0],
				},
				visTitle: json.title,
				summary: json.summary,
			});
		});
	}

	requestApiSchema() {
		getRequest(this.apiSchemaEndpoint).then(json => {
			this.setState(
				{apiSchema: json.components.schemas}
			);
		}).catch(error => {
			console.error(error);
			//Retry fetch request
			return wait(2000).then(() => this.requestApiSchema());
		});
	}

	/**
	 * Changes the state which highlights the regarding part
	 * @param setting can be either 'xAxis', 'yAxis' or 'aggregate'
	 * @param highlight true: highlight the setting, false: unhighlight setting
	 */
	setHighlightVisSetting(setting: string, highlight: boolean) {
		this.setState(prevState => {
			return prevState['highlightedElements']['settingElements'][setting] = highlight;
		});
	}

	setHighlightedBars(barNumbers: number[]) {
		this.setState(prevState => {
			return prevState['highlightedElements']['bars'] = barNumbers;
		});
	}

	setHighlighting(keys: string[], labels: string[]) {
		const xAxisSettings = this.state['apiSchema']['IndexRowName']['enum'];
		const yAxisSettings = this.state['apiSchema']['ValuesRowName']['enum'];

		const highlightxAxis = xAxisSettings.filter(value => keys.includes(value)).length > 0;
		const highlightyAxis = yAxisSettings.filter(value => keys.includes(value)).length > 0;

		this.setHighlightVisSetting('xAxis', highlightxAxis);
		this.setHighlightVisSetting('yAxis', highlightyAxis);

		const dataLabels = this.state['visData'].map(data => {
			return data[this.state['visSchema'].primaryKey];
		});

		console.log(dataLabels);
		const highlightedBars = [];

		labels.forEach(label => {
			const barIndex = dataLabels.indexOf(label);
			if (barIndex !== -1) {
				highlightedBars.push(barIndex);
			}
		});
		this.setHighlightedBars(highlightedBars);
	}
}

export default App;

