import React, {Component} from 'react';
import {VisualizationSetting} from './VisualizationSetting';

interface VisualizationSettingsProps {
	// eslint-disable-next-line
	schema: Promise<Record<string, any>>
}

export class VisualizationSettings extends Component<VisualizationSettingsProps> {
	render() {
		return <div className='visualization-settings'>
			<h2>Visualization settings</h2>
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
