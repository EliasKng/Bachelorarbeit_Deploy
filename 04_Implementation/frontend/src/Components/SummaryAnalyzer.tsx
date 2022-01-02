import {postRequest} from './Requests';

const apiAnalyzeSummaryEndpoint = '/analyze-summary';

function getSummaryText(summary: string) {
	return summary.replace(/<[^>]+>/g, '');
}

export async function getAnalysis(summary: string, visSchema) {
	const requestBody = {
		summary: getSummaryText(summary),
		vis_data: visSchema,
	};
	await postRequest(apiAnalyzeSummaryEndpoint, requestBody).then(json => {
		console.log(json);
	});
}

// TODO make sure this is only used when the user is not writing anymore (e.g. focus lost of Summary)