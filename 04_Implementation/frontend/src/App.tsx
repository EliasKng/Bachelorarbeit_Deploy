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
			visSetting: {
				IndexRowName: undefined,
				ValuesRowName: undefined,
				Aggregate: undefined,
			},
			visColorCode: ['rgba(106, 110, 229)'],
			highlightedElements: {
				bars: [0,3],
				settingElements: [],
			},
		};
		this.updateVisSetting = this.updateVisSetting.bind(this);
		this.updateSummary = this.updateSummary.bind(this);
	}

	render() {
		return <div className="App">
			<body>
			<VisChartjs
				data={this.state['visData']}
				schema={this.state['visSchema']}
				title={this.state['visTitle']}
				highlitedBarIndexes={[0,4]}
				selectedBarIndexes={[2]}
			/>
			<VisualizationSettings apiSchema={this.state['apiSchema']} changeSetting={this.updateVisSetting}/>
			<Summary
				summary={this.state['summary']}
				updateSummary={this.updateSummary}
				visSchema={this.state['visSchema']}
			/>
			</body>
		</div>;
	}

	componentDidMount() {
		this.requestApiSchema();
	}

	async updateVisSetting(attribute: string, value: string) {
		// Check if state was already set
		if (this.state['visSetting'][attribute] === value) {
			return;
		}
		await this.setState(prevState => {
			const prevVisSettings = Object.assign({}, prevState['visSetting']);
			prevVisSettings[attribute] = value;
			console.log(prevVisSettings);
			return {'visSetting': prevVisSettings};
		});
		console.log(this.state);
		const requiredFields = ['ValuesRowName', 'IndexRowName', 'Aggregate'];
		const hasAllKeys = requiredFields.every(item => {
			return this.state['visSetting'][item];
		});
		if (hasAllKeys) {
			this.requestVisData();
		}
	}

	updateSummary(event) {
		this.setState({summary: event.target.value});
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
}

export default App;

