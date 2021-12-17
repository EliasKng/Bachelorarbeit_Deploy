import React, {Component} from 'react';
import {VisualizationSetting} from './VisualizationSetting';

interface VisualizationSettingsProps {
	// eslint-disable-next-line
	schema: Record<string, any>
}

export class VisualizationSettings extends Component<VisualizationSettingsProps> {
	render() {
		console.log('InVisSettings:');
		console.log(this.props.schema);
		return <div className='visualization-settings'>
			<h2>{this.props.schema??'Visualization Settings'}</h2>
			<VisualizationSetting title='x-Axis' entries={['Segment', 'Country', 'Product', 'Discount Band']}/>
			<VisualizationSetting title='y-Axis' entries={[
				'Units Sold',
				'Manufacturing Price',
				'Sale Price',
				'Gross Sales',
				'Discounts',
				'Sales',
				'COGS',
				'Profit',
				'Month',
				'Year',
			]}/>
			<VisualizationSetting title='Aggregate' entries={['sum', 'mean', 'count', 'min', 'max']}/>
		</div>;
	}
}
