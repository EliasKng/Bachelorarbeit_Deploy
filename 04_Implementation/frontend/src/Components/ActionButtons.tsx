import React, {Component} from 'react';
import {Button} from '@mui/material';

// eslint-disable-next-line
interface ActionButtonsProps {
	buttons: ActionButtonProperty[]
}

export interface ActionButtonProperty {
	disabled: boolean,
	text: string,
	onClick: () => void,
}

export class ActionButtons extends Component<ActionButtonsProps> {
	constructor(props) {
		super(props);
	}

	render() {
		const buttons = this.props.buttons.map(property => { return (
			<Button variant='contained' color="inherit" disabled={property.disabled} onClick={property.onClick}>
				{property.text}
			</Button>);
		});
		return <div className='visualization-settings-actions'>
			{buttons}
		</div>;
	}
}