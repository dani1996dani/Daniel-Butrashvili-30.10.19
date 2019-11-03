import React, { Component } from 'react';
import { connect } from 'react-redux';

class CurrentConditions extends Component {

    render() {
        const { currentConditions, didError, isMetric } = this.props;
        const { textColor } = this.props.theme;
        if (didError)
            return (
                <p style={{ color: textColor }} className='current-conditions-title'>Real Time Weather is Unavailable</p>
            );
        if (!currentConditions || currentConditions === undefined) {
            return null;
        }
        const { Temperature, WeatherText } = currentConditions;
        if (!Temperature || Temperature === undefined || !WeatherText || WeatherText === undefined)
            return null;
        const measurementObject = isMetric ? Temperature.Metric : Temperature.Imperial;
        const valueToShow = Math.round(measurementObject.Value);
        return (
            <div>
                <p style={{ color: textColor }} className='current-conditions-title'>Real Time Weather</p>
                <p style={{ color: textColor }} className='current-conditions-degrees'>{valueToShow}° {measurementObject.Unit}</p>
                <p style={{ color: textColor }}>{WeatherText}</p>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        theme: state.theme,
    };
};

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentConditions);