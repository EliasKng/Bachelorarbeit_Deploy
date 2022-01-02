import {postRequest} from './Requests';

const apiAnalyzeSummaryEndpoint = '/analyze-summary';

function getSummaryText(summary: string) {
	return summary.replace(/<[^>]+>/g, '').replace(/\&nbsp;/g, ' ');
}

export async function getSummaryAnalysis(summary: string, visSchema) {
	const requestBody = {
		summary: getSummaryText(summary),
		vis_data: visSchema,
	};
	await postRequest(apiAnalyzeSummaryEndpoint, requestBody).then(json => {
		console.log(json);
	});
}
