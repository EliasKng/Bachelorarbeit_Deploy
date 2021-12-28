import React, {Component} from 'react';

interface SummaryProps {
	summary: string,
	updateSummary: (event: Event) => void
}

export class Summary extends Component<SummaryProps> {

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.props.updateSummary(event);
	}

	render() {
		return <div className='summary'>
			<div className='summary-body'>
				<h2>Summary</h2>
				<form>
					<textarea value={this.props.summary} onChange={this.handleChange}/>
				</form>
			</div>

		</div>;
	}
}