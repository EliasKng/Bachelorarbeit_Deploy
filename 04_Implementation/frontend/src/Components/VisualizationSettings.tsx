import React, {Component} from 'react';
import {VisualizationSetting} from './VisualizationSetting';

interface VisualizationSettingsProps {
	// eslint-disable-next-line
	apiSchema: Record<string, any>
}

export class VisualizationSettings extends Component<VisualizationSettingsProps> {
	render() {
		const schema = this.props.apiSchema;
		if (schema) {
			const xAxisEntries = schema.IndexRowNames.enum;
			const yAxisEntries = schema.ValueRowNames.enum;
			const aggregateEntries = schema.Aggregates.enum;
			return <div className='visualization-settings'>
				<h2>Visualization Settings</h2>
				<VisualizationSetting title='x-Axis' entries={xAxisEntries}/>
				<VisualizationSetting title='y-Axis' entries={yAxisEntries}/>
				<VisualizationSetting title='Aggregate' entries={aggregateEntries}/>
			</div>;
		}
		return <div className='visualization-settings'>
			<h2>Loading ...</h2>
		</div>;
	}
}
