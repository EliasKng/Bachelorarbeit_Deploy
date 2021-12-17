import React, {Component} from 'react';
import './App.scss';
import {Visualization} from './Components/Visualization';
import {VisualizationSettings} from './Components/VisualizationSettings';
import {Summary} from './Components/Summary';

const REQUEST_URL = 'http://localhost:8000';

class App extends Component {
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
			<Visualization/>
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
		const requiredFields = ['ValueRowName', 'IndexRowName', 'Aggregate'];
		const hasAllKeys = requiredFields.every(item => this.state.hasOwnProperty(item));
		if (hasAllKeys) {
			console.log('Update Visualization!');
		}
	}

	// eslint-disable-next-line
	async requestApiSchema(): Promise<Record<string, any>> {
		const schema = (await getRequest('/openapi.json'))?.components.schemas;
		this.setState(
			{apiSchema: schema}
		);
		return schema;
	}

	// async requestVisData(): Promise<Record<string, any>> {
	// }
}

export default App;

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
	} catch (event) {
		console.log(event);
	}

}

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
