const REQUEST_URL = 'http://localhost:8000';

// eslint-disable-next-line
export async function getRequest(endpoint: string): Promise<Record<string, any>> {
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
export async function postRequest(endpoint: string, requestBody: Record<string, any>): Promise<Record<string, any>> {
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
		return await response.json();
	} catch (error) {
		console.error(error);
	}
}

// eslint-disable-next-line
export async function testFetchPost() {
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

export function wait(delay) {
	return new Promise((resolve) => setTimeout(resolve, delay));
}