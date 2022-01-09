import {postRequest} from '../Components/Requests';

const apiAnalyzeSummaryEndpoint = '/generate-summary-statements';

export async function getGeneratedSummaryStatements(selectedValues, visData, statementType: string): Promise<string> {
	const requestBody = {
		selected_values: selectedValues,
		vis_data: visData,
	};
	return await postRequest(apiAnalyzeSummaryEndpoint, requestBody).then(json =>
		json[statementType]
	);
}