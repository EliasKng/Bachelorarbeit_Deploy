import React, {Component} from 'react';
import DropdownMenu from './DropdownMenu';

// eslint-disable-next-line
interface VisualizationSettingProps {
	title: string,
	entries: string[],
}

export class VisualizationSetting extends Component<VisualizationSettingProps> {
	render() {
		return <div className='visualization-setting'>
			<h3>y-Axis</h3>
			<DropdownMenu/>
		</div>;
	}
}