import React, {Component} from 'react';
import './App.scss';
import {VisualizationSettings} from './Components/VisualizationSettings';
import {Summary} from './Components/Summary';

const REQUEST_URL = 'http://localhost:8000';

class App extends Component {
	private apiSchemaEndpoint = '/openapi.json';
	private apiDataEndpoint = '/data';

	constructor(props) {
		super(props);
		this.state = {apiSchema: undefined};
		this.updateAttribute = this.updateAttribute.bind(this);
		// testFetchPost();
		// this.state.
	}

	render() {
		return <div className="App">
			<body>
			{/*<Visualization/>*/}
			<VisualizationSettings apiSchema={this.state['apiSchema']} changeSetting={this.updateAttribute}/>
			<Summary/>
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
			this.requestVisData();

		}
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
			});
		});
		console.log(this.state);
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

// eslint-disable-next-line
async function getRequest(endpoint: string): Promise<Record<string, any>> {
	try {
		const response = await fetch(
			REQUEST_URL + endpoint
		);
		return await response.json();
	} catch (error) {
		console.error(error);
	}
}

// eslint-disable-next-line
async function postRequest(endpoint: string, requestBody: Record<string, any>): Promise<Record<string, any>> {
	try {
		const response = await fetch(
			REQUEST_URL + endpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(requestBody),
			}
		);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}

// eslint-disable-next-line
async function testFetchPost() {
	try {
		console.log('testFetchPost');
		const requestBody = {
			// 'values_row_name': 'Units Sold',
			// 'index_row_name': 'Segment',
			// 'aggregate': 'sum',
		};
		const response = await fetch(
			// 'https://29756-3000.codesphere.com/test',
			'http://localhost:8000/data', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(requestBody),
			}
		);
		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.log(error);
	}

}

function wait(delay) {
	return new Promise((resolve) => setTimeout(resolve, delay));
}
