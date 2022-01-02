import React, {Component} from 'react';
import ContentEditable from 'react-contenteditable';
import {getSummaryAnalysis} from './SummaryAnalyzer';

interface SummaryProps {
	summary: string,
	updateSummary: (event: Event) => void
	visSchema: Record<string, any>
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
		getSummaryAnalysis(this.props.summary, this.props.visSchema);
	}
}
