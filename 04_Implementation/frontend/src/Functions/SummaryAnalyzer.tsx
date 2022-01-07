import {postRequest} from '../Components/Requests';

const apiAnalyzeSummaryEndpoint = '/analyze-summary';

interface SentenceMapping {
	sentence: string,
	mappedLabels: string[]
	mappedKeys: string[]
}

function getSummaryText(summary: string) {
	return summary.replace('<br>','/n').replace(/<[^>]+>/g, '').replace(/\&nbsp;/g, ' ');
}

export async function getSummaryAnalysis(summary: string, visData): Promise<SentenceMapping[]> {
	const requestBody = {
		summary: getSummaryText(summary),
		vis_data: visData,
	};
	return await postRequest(apiAnalyzeSummaryEndpoint, requestBody).then(json => {
		return json.map(datum => {
			datum.sentence = datum.sentence.replace('/n','<br>');
			return {
				sentence: datum.sentence,
				mappedLabels: datum.mapped_labels,
				mappedKeys: datum.mapped_keys,
			};
		});
	});
}

export function sentenceMappingHtml(sentenceMappings: SentenceMapping[]): string {
	const components = sentenceMappings.map(mapping => {
		// eslint-disable-next-line max-len
		return `<span mapped-labels="${mapping.mappedLabels}" mapped-keys="${mapping.mappedKeys}">${mapping.sentence}</span>`;
	});

	return components.join(' ');
}