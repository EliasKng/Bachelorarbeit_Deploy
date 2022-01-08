import React, {Component} from 'react';
import {Button} from '@mui/material';
import MenuButton from './MenuButton';

// eslint-disable-next-line
interface ActionButtonsProps {
	buttons: ActionButtonProperty[]
	addSummaryStatement: (string) => void,
}

export interface ActionButtonProperty {
	propertyName: string,
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
			<MenuButton addSummaryStatement={this.props.addSummaryStatement}></MenuButton>
		</div>;
	}
}