import React, {Component} from 'react';
import ContentEditable from 'react-contenteditable';
import {bindSpanHover} from '../bindSpanHover';
import {getSummaryAnalysis, sentenceMappingHtml} from './SummaryAnalyzer';

interface SummaryProps {
	summary: string,
	updateSummary: (event: Event) => void
	visData: Record<string, any>
	updateAnalyzedSummary: (string) => void
	setHighlighting: (keys: string[], labels: string[]) => void
}

export class Summary extends Component<SummaryProps> {

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.analyzeSummary = this.analyzeSummary.bind(this);
	}

	handleChange(event) {
		this.props.updateSummary(event);
	}
	render = () => {
		return <div className='summary'>
				<ContentEditable
					html={this.props.summary} // innerHTML of the editable div
					disabled={false} // use true to disable edition
					onChange={this.handleChange} // handle innerHTML change
					spellCheck={false}
					onBlur={this.analyzeSummary}
				/>
			</div>;
	};

	analyzeSummary() {
		if (this.props.summary) {
			{
				getSummaryAnalysis(this.props.summary, this.props.visData).then(mappings => {
					const html = sentenceMappingHtml(mappings);
					this.props.updateAnalyzedSummary(html);
					bindSpanHover(this.props.setHighlighting);
				});
			}
		}
	}
}
