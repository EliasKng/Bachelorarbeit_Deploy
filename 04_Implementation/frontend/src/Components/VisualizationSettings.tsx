import React, {Component} from 'react';
import {VisualizationSetting} from './VisualizationSetting';

interface VisualizationSettingsProps {
	// eslint-disable-next-line
	schema: Promise<Record<string, any>>
}

export class VisualizationSettings extends Component<VisualizationSettingsProps> {
	render() {
		const visSettings = [];
		this.props.schema.then(
			result => {
				const settingProps = [result.IndexRowNames, result.ValueRowNames, result.Aggregates];
				settingProps.forEach(prop => {
					visSettings.push(<VisualizationSetting title={prop.title} entries={prop.enum}/>);
				});
			}
		);
		return <div className='visualization-settings'>
			<h2>Visualization settings</h2>
			{visSettings}
		</div>;
	}
}