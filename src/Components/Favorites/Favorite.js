import React, { Component } from 'react';

import { getCurrentConditionsForLocation } from './../../redux/currentConditions/currentConditionsActions';
class Favorite extends Component {

    state = {
        currentConditions: null,
        didError: false
    }

    componentDidMount = () => {
        const { locationKey } = this.props;
        getCurrentConditionsForLocation(locationKey).then((conditions) => {
            this.setState({
                currentConditions: conditions,
                didError: false,
            });
        }).catch((err) => {
            this.setState({
                currentConditions: 'N/A',
                didError: true
            })
        })
    }

    getCurrentDegrees = () => {
        const { currentConditions, didError } = this.state;
        if (didError)
            return 'N/A';
        if (!currentConditions)
            return '';
        const { Temperature } = currentConditions;
        if (!Temperature || Temperature === undefined)
            return '';
        const { isMetric } = this.props;
        const measurementObject = isMetric ? Temperature.Metric : Temperature.Imperial;
        const valueToShow = Math.round(measurementObject.Value);
        return `${valueToShow}°${measurementObject.Unit}`;
    }

    render() {
        const { locationName, locationKey, textColor } = this.props;
        return (
            <div className='favorite-card' style={{ width: '20%', minWidth: 200 }} onClick={this.props.onClick}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <p  style={{textAlign: 'left', color: textColor}} className='favorite'>{locationName}</p>
                        <p  style={{fontSize: 12, color: 'gray', fontStyle: 'italic', textAlign: 'left', marginLeft: 8}}>ID: {locationKey}</p>
                    </div>
                    <div>
                        <p style={{color: textColor}} className='favorite'>{this.getCurrentDegrees()}</p>
                    </div>
                </div>
                <hr style={{ margin: 0 }} />
            </div>
        )
    }
}

export default Favorite;
