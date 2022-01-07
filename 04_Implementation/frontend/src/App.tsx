import React, {Component} from 'react';
import './Scss/App.scss';
import {VisualizationSettings} from './Components/VisualizationSettings';
import {VisChartjs} from './Components/VisChartjs';
import {Summary} from './Components/Summary';
import {getRequest, postRequest, wait} from './Components/Requests';
import {getSummaryAnalysis, sentenceMappingHtml} from './Components/SummaryAnalyzer';
import {bindSpanHover} from './bindSpanHover';

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
			selectedBarIndexes: [],
		};
		this.updateAttribute = this.updateAttribute.bind(this);
		this.updateSummary = this.updateSummary.bind(this);
		this.updateAnalyzedSummary = this.updateAnalyzedSummary.bind(this);
		this.setHighlightVisSetting = this.setHighlightVisSetting.bind(this);
		this.setHighlighting = this.setHighlighting.bind(this);
		this.toggleBarSelectIndex = this.toggleBarSelectIndex.bind(this);
		this.analyzeSummary = this.analyzeSummary.bind(this);
	}

	render() {
		return <div className="App">
			<body>
			<VisChartjs
				data={this.state['visData']}
				schema={this.state['visSchema']}
				title={this.state['visTitle']}
				highlitedBarIndexes={this.state['highlightedElements']['bars']}
				selectedBarIndexes={this.state['selectedBarIndexes']}
				toggleSelectBarIndex={this.toggleBarSelectIndex}
			/>
			<VisualizationSettings
				apiSchema={this.state['apiSchema']}
				changeSetting={this.updateAttribute}
				highlighted={this.state['highlightedElements']['settingElements']}
				buttons={
					[{
						text: 'Add summary statement from selected bars',
						disabled: false,
						onClick: this.addSummaryStatementFromSelectedBars,
					}]

				}
			/>
			<Summary
				summary={this.state['summary']}
				updateSummary={this.updateSummary}
				analyzeSummary={this.analyzeSummary}
			/>
			</body>
		</div>;
	}

	addSummaryStatementFromSelectedBars() {
		console.log('addSummaryStatementFromSelectedBars!!!');
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
		this.analyzeSummary();
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

	analyzeSummary() {
		if (this.state['summary']) {
			{
				getSummaryAnalysis(this.state['summary'], this.state['visData']).then(mappings => {
					const html = sentenceMappingHtml(mappings);
					this.updateAnalyzedSummary(html);
					bindSpanHover(this.setHighlighting);
				});
			}
		}
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

	async toggleBarSelectIndex(index: number) {
		const state = this.state;
		if (state['selectedBarIndexes'].indexOf(index) === -1) {
			state['selectedBarIndexes'].push(index);
		} else {
			state['selectedBarIndexes'].splice(state['selectedBarIndexes'].indexOf(index), 1);
		}

		this.setState(state);
	}

}

export default App;