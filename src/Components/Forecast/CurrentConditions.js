import React, { Component } from 'react';

class CurrentConditions extends Component{
    render(){
        const { currentConditions, didError } = this.props;
        if (didError)
            return (
                <p className='current-conditions-title'>Real Time Weather is Unavailable</p>
            );
        if (!currentConditions || currentConditions === undefined){
            return null;
        }
        const { Temperature, WeatherText } = currentConditions;
        if (!Temperature || Temperature === undefined || !WeatherText || WeatherText === undefined)
            return null;
        const valueToShow = Math.round(Temperature.Metric.Value);
        return(
            <div>
                <p className='current-conditions-title'>Real Time Weather</p>
                <p className='current-conditions-degrees'>{valueToShow}° {Temperature.Metric.Unit}</p>
                <p>{WeatherText}</p>
            </div>
        );
    }
}

export default CurrentConditions;