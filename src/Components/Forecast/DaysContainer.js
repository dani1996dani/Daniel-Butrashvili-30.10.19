import React, { Component } from 'react';
import DayCard from './DayCard';

class DaysContainer extends Component{

    componentDidUpdate(oldProps){
        if (this.props.currentConditions !== oldProps.currentConditions){
            this.forceUpdate();
        }
    }

    render(){
        const { DailyForecasts } = this.props.forecast;
        if (!DailyForecasts || DailyForecasts === undefined){
            return null;
        }
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayCards = DailyForecasts.map((dailyForecast, index) => {
            let dayTitle;
            if (index === 0){
                dayTitle = 'Today';
            } else {
                const forecastDate = new Date(dailyForecast.Date);
                const forecastDayIndex = forecastDate.getDay();
                dayTitle = dayNames[forecastDayIndex];
            }
            return (<DayCard key={index} dayTitle={dayTitle} dailyForecast={dailyForecast} isToday={index === 0}/>)
        })
        
        return (
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', flex: 1, marginTop: 60 ,justifyContent: 'center'}}>
                {dayCards}
            </div>
        );
    }
}

export default DaysContainer;