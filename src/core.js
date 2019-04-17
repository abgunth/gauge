import * as React from 'react';
import * as d3 from 'd3';

import Radial from './arcs';
import { Needle, TargetNeedle} from './needles';
import * as utils from './utils';

export default class SupportGauge extends React.Component {

    componentDidMount() {
        d3.selection.prototype.moveToFront = function() {
            return this.each(function() {
                this.parentNode.appendChild(this);
            });
        };
        d3.select('#arcs').moveToFront();
        d3.select('#needleGlob').moveToFront();
        d3.select('#targetneedleGlob').moveToFront();
    };

    render() {

        const margin = { left: this.props.width / 10, right: this.props.width / 10, bottom: this.props.height / 10, top: this.props.height / 5 };

        const figureWidth = Math.round(this.props.width - (margin.left + margin.right));
        const figureHeight = Math.round(this.props.height - (margin.top + margin.bottom));

        const radius = figureWidth / 2;
        const chartInset = radius / 5;
        const arcWidth = radius / 3;

        const transformToCenter = `translate(${margin.left + figureWidth / 2 }, ${figureHeight + margin.top})`;

        const needlesLength = radius - chartInset + chartInset / 4;

        const textTransform = () => {return `translate(0, -50)`;};

        return (
            <div id='svgContainer'>
                <svg className='gauge' viewBox={'0 0 ' + this.props.width + ' ' + this.props.height} width='100%' height='100%'>
                    <Radial
                        transform={transformToCenter}
                        width={figureWidth}
                        height={figureHeight}
                        innerRadius={radius - chartInset - arcWidth}
                        outerRadius={radius - chartInset}
                        startAngle={utils.scaleAdjustedRad(0)}
                        endAngleBg={utils.scaleAdjustedRad(1)}
                        endAngleFg={utils.scaleAdjustedRad(this.props.sections[0].value)}/>
                    <Needle
                        width={this.props.width}
                        length={needlesLength}
                        needleWidth={needlesLength / 20}
                        transform={transformToCenter}
                        rotate={utils.scaleAdjustedDeg(this.props.data.value.scaled)}
                        rawValue={this.props.data.value.raw}
                        angle={utils.scaleRad(this.props.data.value.scaled)}
                        radius={radius / 20}
                        textTransform={textTransform()}/>
                    <TargetNeedle
                        width={this.props.width}
                        length={needlesLength}
                        needleWidth={needlesLength / 50}
                        transform={transformToCenter}
                        rotate={utils.scaleAdjustedDeg(this.props.data.target.scaled)}
                        rawValue={this.props.data.target.raw}
                        angle={utils.scaleRad(this.props.data.target.scaled)}
                        target={this.props.target}
                        value={this.props.data.target.scaled}
                        textTransform={textTransform()}/>
                    <text
                        x={margin.left + chartInset + arcWidth / 2}
                        y={figureHeight + margin.top + margin.top / 5}
                        fontFamily='Open Sans, Arial, sans-serif'
                        fontSize={this.props.width/25+'px'}
                        fill='#000'
                        textAnchor='middle'>
                        {utils.shorterNumbers(this.props.data.min)}
                    </text>
                    <text
                        x={margin.left + 2 * radius - chartInset - arcWidth / 2 }
                        y={figureHeight + margin.top + margin.top / 5}
                        fontFamily='Open Sans, Arial, sans-serif'
                        fontSize={this.props.width/25+'px'}
                        fill='#000'
                        textAnchor='middle'>
                        {utils.shorterNumbers(this.props.data.max)}
                    </text>
                </svg>
            </div>
        );
    };
};
