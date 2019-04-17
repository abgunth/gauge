import * as React from 'react';

import * as utils from './utils';

export class Needle extends React.Component {

    render() {
        return (
            <g transform={this.props.transform} id='needleGlob'>
                <g id='needle'>
                    <animateTransform
                        attributeName='transform'
                        attributeType='XML'
                        type='rotate'
                        from={utils.scaleAdjustedDeg(0)}
                        to={this.props.rotate}
                        begin='0s'
                        dur='2s'
                        repeatCount='0'
                        fill='freeze'
                    />
                    <line
                        x1='0' x2={-this.props.length} y1='0' y2='0' 
                        className='needle'
                        stroke='#929292'
                        strokeWidth={this.props.needleWidth}
                    />
                </g>
                <g id='needle_textElem'>
                    <path 
                        id='motionPathNeedle' 
                        fill='none' 
                        d={utils.describeArc(0, 0, (this.props.length + this.props.length/8), 
                            this.props.rotate, 
                            utils.scaleAdjustedDeg(0)) //TODO: Tidy
                        }
                    />
                    <text
                        id='needle_text'
                        x='0'
                        y='0'
                        fill='#000'
                        fontFamily='Open Sans, Arial, sans-serif'
                        fontSize={this.props.width/25+'px'}
                        textAnchor='middle'>
                        {utils.shorterNumbers(this.props.rawValue)}
                    </text>
                    <animateMotion 
                        xlinkHref='#needle_text'
                        dur='2s'
                        begin='0s'
                        fill='freeze'
                        repeatCount='0'>
                        <mpath xlinkHref='#motionPathNeedle'/>
                    </animateMotion>
                </g>
                <circle
                    className='needle-center'
                    cx='0'
                    cy='0'
                    r={this.props.radius}
                    fill='#929292'
                />
            </g>
        );
    };
};

export class TargetNeedle extends React.Component {

    render() {
        return (
            <g transform={this.props.transform} id='targetneedleGlob'>
                <g id='targetNeedle'>
                    <animateTransform
                        attributeName='transform'
                        attributeType='XML'
                        type='rotate'
                        from={utils.scaleAdjustedDeg(0)}
                        to={this.props.rotate}
                        begin='0s'
                        dur='2s'
                        repeatCount='0'
                        fill='freeze'
                    />
                    <line
                        x1='0' x2={-this.props.length} y1='0' y2='0' 
                        strokeDasharray={this.props.needleWidth * 2}
                        stroke='#929292'
                        strokeWidth={this.props.needleWidth}
                    />
                </g>
                <g id='targetNeedle_textElem'>
                    <path id='motionPathTargetNeedle' fill='none' stroke='none'  d={utils.describeArc(0, 0, (this.props.length + this.props.length/8), this.props.rotate, utils.scaleAdjustedDeg(0))}/>
                    <text
                        id='target_needle_text'
                        x='0'
                        y='0'
                        fill='#000'
                        fontFamily='Open Sans, Arial, sans-serif'
                        fontSize={this.props.width/25+'px'}
                        textAnchor='middle'>
                       {utils.shorterNumbers(this.props.rawValue)}
                    </text>
                    <animateMotion 
                        xlinkHref='#target_needle_text'
                        dur='2s'
                        begin='0s'
                        fill='freeze'
                        repeatCount='0'>
                        <mpath xlinkHref='#motionPathTargetNeedle' />
                    </animateMotion>
                </g>
            </g>
        );
    };
};