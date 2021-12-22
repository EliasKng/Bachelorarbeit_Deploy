import {Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import React, {Component} from 'react';

// const dateFormatter = (item: moment.MomentInput) => moment(item).format('MMM YY');
interface VisualizationProps {
	data: [Record<string, any>],
}

export class Visualization extends Component<VisualizationProps> {
	render() {
		const data = this.props.data;

		return <div className='visualization'>
			<ResponsiveContainer width="100%" height="100%">
				<BarChart data={data}>
					<XAxis dataKey="x"/>
					<YAxis/>
					<Tooltip/>
					<Bar dataKey="count" fill="rgba(106, 110, 229)"/>
				</BarChart>
			</ResponsiveContainer>
		</div>;
	}
}