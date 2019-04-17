import * as React from 'react';
import * as d3 from 'd3';

import * as utils from './utils';

export default class Radial extends React.Component {

  componentWillMount() {
    const context = this.setContext();
    this.setBackground(context);
    this.setForeground(context);
  };

  componentDidMount() {
    const context = this.setContext();
    this.setBackground(context);
    this.setForeground(context)
      .transition()
      .ease(d3.easeLinear)
      .duration(2000) // https://bl.ocks.org/nbremer/6f5b472cabe8f85583989a40eef0303c ?
      .call(utils.arcTween, this.props.endAngleFg, this.arc());
  };

  setContext() {
    return d3
      .select('svg')
      .append('g')
      .attr('transform', this.props.transform);
  };
  setBackground(context) {
    return context
      .append('path')
      .classed('arc2', true)
      .datum({ endAngle: this.props.endAngleBg })
      .style('fill', '#EEEEEE')
      .attr('d', this.arc());
  };
  setForeground(context) {
    return context
      .append('path')
      .classed('arc', true)
      .datum({ endAngle: this.props.startAngle })
      .style('fill', '00BFFF')
      .attr('d', this.arc());
  };

  arc() {
    return d3
      .arc()
      .innerRadius(this.props.innerRadius)
      .outerRadius(this.props.outerRadius)
      .startAngle(this.props.startAngle);
  };

  render() {
    return <div id='arcs' class='svgElement' ref='arc'/>;
  };
};

  