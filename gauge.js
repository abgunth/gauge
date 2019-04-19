import * as React from 'react';
import * as utils from './src/utils';
import SupportGauge from './src/core';

export default class GaugeBox extends React.Component{

	render()  {  
		let width = 600;
		return (
			<div className='wrapper' style={{width:width, height:width/2}}>
				<Gauge fill='#000' value={78} target={90} min={0} max={100} width={width} height={width/2}/>
			</div>
		);
	};
};

export class Gauge extends React.Component {
	render() {

		// Scale values
		const inputs = {
			value: {
				scaled: utils.scale1(this.props.min, this.props.max, this.props.value),
				raw: this.props.value
			},
			target: {
				scaled: utils.scale1(this.props.min, this.props.max, this.props.target),
				raw: this.props.target
			},
			min: this.props.min,
			max: this.props.max
		};

		// Arcs definition
		const sectionsProps = [
			{ fill: this.props.fill, value: inputs.value.scaled },
			{ fill: '#EEEEEE', value: 1 - inputs.value.scaled }
		];

		return (
			<SupportGauge
				width={this.props.width}
				height={this.props.height}
				sections={sectionsProps}
				data={inputs}
			/>
		);
	};
};