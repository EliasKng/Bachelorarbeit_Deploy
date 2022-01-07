import React, {Component} from 'react';
import DropdownMenu from './DropdownMenu';

// eslint-disable-next-line
interface VisualizationSettingProps {
	title: string,
	entries: string[],
	attributeName: string,
	// eslint-disable-next-line @typescript-eslint/ban-types
	onChange: Function,
	highlighted: boolean,
}

export class VisualizationSetting extends Component<VisualizationSettingProps> {
	constructor(props) {
		super(props);
		this.changeSetting = this.changeSetting.bind(this);
	}
	render() {
		if (this.props.highlighted) {
			return <div className='visualization-setting highlight'>
				<h3>{this.props.title}</h3>
				<DropdownMenu options={this.props.entries} onChange={this.changeSetting}/>
			</div>;
		}
		return <div className='visualization-setting'>
			<h3>{this.props.title}</h3>
			<DropdownMenu options={this.props.entries} onChange={this.changeSetting}/>
		</div>;
	}
	changeSetting(event: Event) {
		this.props.onChange(this.props.attributeName, event);
	}
}