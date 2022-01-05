import ReactDOMServer from 'react-dom/server';
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

export function sentenceMappingToHtml(sentenceMappings: SentenceMapping[]): string {
	const components = sentenceMappings.map(mapping => {
		return <span onMouseOver={() => console.log(`map to ${mapping.mappedKeys} and ${mapping.mappedLabels}`)}>
			{mapping.sentence}
		</span>;
	});
	return components.reduce(((previousValue, currentValue) => {
		return previousValue + ReactDOMServer.renderToString(currentValue);
	}),'');
}

export function sentenceMappingHtml(sentenceMappings: SentenceMapping[]): string {
	const components = sentenceMappings.map(mapping => {
		// eslint-disable-next-line max-len
		return `<span mapped-labels="${mapping.mappedLabels}" mapped-keys="${mapping.mappedKeys}">${mapping.sentence}</span>`;
	});

	return components.join(' ');
}