import {Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import React, {Component} from 'react';

// const dateFormatter = (item: moment.MomentInput) => moment(item).format('MMM YY');
interface VisualizationProps {
	data: [Record<string, any>],
	schema: Record<string, any>,
	title: string,
}

export class Visualization extends Component<VisualizationProps> {
	render() {
		if (this.props.data && this.props.schema) {
			const data = this.props.data;
			return <div className='visualization'>
				{/*<h3>{this.props.title}</h3>*/}
				<ResponsiveContainer width="100%" height="100%">
					<BarChart data={data}>
						<XAxis dataKey={this.props.schema.fields[0].name}/>
						<YAxis/>
						<Tooltip/>
						<Bar dataKey={this.props.schema.fields[1].name} fill="rgba(106, 110, 229)"/>
					</BarChart>
				</ResponsiveContainer>
			</div>;
		} else {
			return <div className='visualization'>
				<h1>No visualization specified</h1>
			</div>;
		}

	}
}