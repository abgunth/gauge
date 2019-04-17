import * as d3 from 'd3';

// Scaling
export function scale1(rangeMinimum, rangeMaximum, value) {
    let scaledValue = 1 / (rangeMaximum - rangeMinimum) * (value - rangeMinimum);
    return scaledValue;
};

export function scaleAdjustedDeg(value) {
    let scaledValue = 
        (160 * (value - 1) + 170); // Transform value to degree scale from 10deg to 170deg
    return scaledValue;
};

export function scaleRad(value) {
    let scaledValue = 
        scaleAdjustedDeg(value)
        * Math.PI / 180; // Transform to radian
    return scaledValue;
}

export function scaleAdjustedRad(value) {
    let scaledValue =
        scaleRad(value) 
        - 90 * Math.PI / 180; // shift -90deg
    return scaledValue;
};

// Display
export function shorterNumbers(num) {
    if (num == null) 
        return '-'; 
    if (num < 1000)
        return Math.round(num);
    var units = ['k', 'M', 'B', 'T', 'P'],
        decimal;
    for(var i=units.length-1; i>=0; i--) {
        decimal = Math.pow(1000, i+1);
        if(num >= decimal) {
            if (precisionRound((+(num / decimal)),1) * 10 > 100 )
                return Math.round(+(num / decimal)) + units[i];
            else {
                return precisionRound((+(num / decimal)),1) + units[i];
            };
        };
    };
    return num;
};

function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
};

// Transitions

export function arcTween(transition, newAngle, arc) {
    transition.attrTween('d', d => {
        const interpolate = d3.interpolate(d.endAngle, newAngle);
        const newArc = d;
        return t => {
            newArc.endAngle = interpolate(t);
            return arc(newArc);
        };
    });
};

// Draw arc path for text animation

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
};
  
export function describeArc(x, y, radius, startAngle, endAngle){
    startAngle = - (180 - startAngle); // Adapt angle to flow
    endAngle = - (180 - endAngle);
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var d = [
        'M', start.x, start.y, 
        'A', radius, radius, 0, 0, 1, end.x, end.y
    ].join(' ');

    return d;       
}