import {postRequest} from './Requests';

const apiAnalyzeSummaryEndpoint = '/analyze-summary';

interface SentenceMapping {
	sentence: string,
	mappedLabels: string[]
	mappedKeys: string[]
}

function getSummaryText(summary: string) {
	return summary.replace(/<[^>]+>/g, '').replace(/\&nbsp;/g, ' ');
}

export async function getSummaryAnalysis(summary: string, visSchema): Promise<SentenceMapping[]> {
	const requestBody = {
		summary: getSummaryText(summary),
		vis_data: visSchema,
	};
	return await postRequest(apiAnalyzeSummaryEndpoint, requestBody).then(json => {
		return json.map(datum => {
			return {
				sentence: datum.sentence,
				mappedLabels: datum.mapped_labels,
				mappedKeys: datum.mapped_keys,
			};
		});
	});
}
