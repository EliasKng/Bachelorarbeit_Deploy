import {postRequest} from '../Components/Requests';

const apiAnalyzeSummaryEndpoint = '/generate-summary-statements';

export async function getGeneratedSummaryStatements(selectedValues, visData): Promise<void> {
	const requestBody = {
		selected_values: selectedValues,
		vis_data: visData,
	};
	return await postRequest(apiAnalyzeSummaryEndpoint, requestBody).then(json =>
		console.log(json)
	);
}