import React from 'react';
import './App.scss';
import {Visualization} from './Components/Visualization';
import {VisualizationSettings} from './Components/VisualizationSettings';
import {Summary} from './Components/Summary';

function App() {
	const visSettingsProps = requestApiSchema();

	return <div className="App">
		<body>
			<Visualization/>
			<VisualizationSettings schema={visSettingsProps}/>
			<Summary/>
		</body>
	</div>;
}

export default App;
// eslint-disable-next-line
async function testFetch() {
	try {
		const response = await fetch(
			// 'https://29756-3000.codesphere.com/test',
			'http://localhost:8000/test'
		);
		const data = await response.json();
		console.log(data);
	} catch (event) {
		console.log(event);
	}

}

// eslint-disable-next-line
async function testFetchPost() {
	try {
		const requestBody = {
			'values_row_name': 'Units Sold',
			'index_row_name': 'Segment',
			'aggregate': 'sum',
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
async function requestApiSchema(): Promise<Record<string, any>> {
	try {
		const response = await fetch(
			// 'https://29756-3000.codesphere.com/test',
			'http://localhost:8000/openapi.json'
		);
		const data = await response.json();
		return data.components.schemas;
	} catch (event) {
		console.error(event);
	}
}
