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
		// testFetchPost();
		// this.state.
	}

	render() {
		return <div className="App">
			<body>
			<Visualization/>
			<VisualizationSettings apiSchema={this.state['apiSchema']}/>
			<Summary/>
			</body>
		</div>;
	}

	componentDidMount() {
		this.requestApiSchema();
	}

	// eslint-disable-next-line
	async requestApiSchema(): Promise<Record<string, any>> {
		const schema = (await getRequest('/openapi.json'))?.components.schemas;
		console.log(schema);
		this.setState(
			{apiSchema: schema}
		);
		return schema;

		// try {
		// 	const response = await fetch(
		// 		// 'https://29756-3000.codesphere.com/test',
		// 		'http://localhost:8000/openapi.json'
		// 	);
		// 	const data = await response.json();
		// 	//Set apiSchema to state
		// 	this.state = {apiSchema: data.components.schemas};
		// 	return data.components.schemas;
		// } catch (event) {
		// 	console.error(event);
		// }
	}
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
