import React, {Component} from 'react';

interface SummaryProps {
	generatedSummary: string,
}

export class Summary extends Component<SummaryProps> {
	render() {
		return <div className='summary'>
			<div className='summary-body'>
				<h2>Summary</h2>
				<p>{this.props.generatedSummary}</p>
			</div>

		</div>;
	}
}