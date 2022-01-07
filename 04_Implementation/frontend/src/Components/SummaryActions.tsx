import React, {Component} from 'react';
import {Button} from '@mui/material';

// eslint-disable-next-line
interface SummaryActionProps {
}

export class SummaryAction extends Component<SummaryActionProps> {
	constructor(props) {
		super(props);
	}

	render() {
		return <div className='visualization-settings-actions'>
			<Button variant='contained'>Test</Button>
			<Button variant='contained'>Test</Button>
		</div>;
	}

}