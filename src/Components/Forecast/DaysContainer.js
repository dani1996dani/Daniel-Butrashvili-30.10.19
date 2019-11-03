import React, { Component } from 'react';
import { connect } from 'react-redux';

import DayCard from './DayCard';


class DaysContainer extends Component {

    render() {
        const { didError, theme, isMetric, forecast, imperialForecast } = this.props;
        if (didError) {
            return (
                <p style={{ color: theme.textColor }}>The Forecast is unavailable. Check your internet connection or try again later</p>
            );
        }
        const forecastSystem = isMetric ? forecast : imperialForecast;
        const { DailyForecasts } = forecastSystem;
        if (!DailyForecasts || DailyForecasts === undefined) {
            return null;
        }
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayCards = DailyForecasts.map((dailyForecast, index) => {
            let dayTitle;
            if (index === 0) {
                dayTitle = 'Today';
            } else {
                const forecastDate = new Date(dailyForecast.Date);
                const forecastDayIndex = forecastDate.getDay();
                dayTitle = dayNames[forecastDayIndex];
            }
            return (
                <DayCard
                    key={index}
                    dayTitle={dayTitle}
                    dailyForecast={dailyForecast}
                    isToday={index === 0}
                    isMetric
                />
            )
        })

        return (
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', flex: 1, marginTop: 60, justifyContent: 'center' }}>
                {dayCards}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        theme: state.theme,
        temperatureUnit: state.temperatureUnit
    };
};

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(DaysContainer);