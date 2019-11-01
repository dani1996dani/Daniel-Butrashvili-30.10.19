import React, { Component } from 'react';
import DayCard from './DayCard';

class DaysContainer extends Component{
    render(){
        console.log('days forecast is:' ,this.props.forecast);
        const { DailyForecasts } = this.props.forecast;
        
        return (
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                <DayCard dayTitle={'Today'} />
                <DayCard dayTitle={'Test 1'}/>
                <DayCard dayTitle={'Test 2'}/>
                <DayCard dayTitle={'Test 3'}/>
                <DayCard dayTitle={'Test 4'}/>
            </div>
        );
    }
}

export default DaysContainer;