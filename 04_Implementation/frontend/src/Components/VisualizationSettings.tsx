import React, {Component} from 'react';
import {VisualizationSetting} from './VisualizationSetting';

interface VisualizationSettingsProps {
	// eslint-disable-next-line
	apiSchema: Record<string, any>,
	changeSetting: (attribute: string, value: string) => void
}

export class VisualizationSettings extends Component<VisualizationSettingsProps> {
	constructor(props) {
		super(props);
		this.changeSetting = this.changeSetting.bind(this);
	}

	render() {
		const schema = this.props.apiSchema;
		if (schema) {
			const xAxisSchema = schema.IndexRowName;
			const yAxisSchema = schema.ValueRowName;
			const aggregateSchema = schema.Aggregate;
			return <div className='visualization-settings'>
				<h2>Visualization Settings</h2>
				<VisualizationSetting
					title='x-Axis'
					entries={xAxisSchema.enum}
					attributeName={xAxisSchema.title}
					onChange={this.changeSetting}
				/>
				<VisualizationSetting
					title='y-Axis'
					entries={yAxisSchema.enum}
					attributeName={yAxisSchema.title}
					onChange={this.changeSetting}
				/>
				<VisualizationSetting
					title='Aggregate'
					entries={aggregateSchema.enum}
					attributeName={aggregateSchema.title}
					onChange={this.changeSetting}
				/>
			</div>;
		}
		return <div className='visualization-settings'>
			<h2>Loading ...</h2>
		</div>;
	}

	changeSetting(settingName: string, event: Event): void {
		this.props.changeSetting(settingName, event ? event['value'] : undefined);
	}
}
