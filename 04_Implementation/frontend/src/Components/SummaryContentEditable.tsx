import React, {Component} from 'react';
import ContentEditable from 'react-contenteditable';

interface SummaryProps {
	summary: string,
	updateSummary: (event: Event) => void
}

export class SummaryContentEditable extends Component<SummaryProps> {

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
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
				/>
			</div>;
	};
}

