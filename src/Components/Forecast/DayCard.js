import React, { Component } from 'react';
import { connect } from 'react-redux'; 

class DayCard extends Component {

    isDayTime = () => {
        const { currentConditions, isToday } = this.props;
        if (!currentConditions || currentConditions === undefined)
            return true;
        if (currentConditions.IsDayTime === undefined)
            return true;
        if (!isToday)
            return true;
        return currentConditions.IsDayTime;
    }

    getDayTitle = () => {
        const { dayTitle, isToday } = this.props;
        if (!isToday)
            return dayTitle;
        const isDayTime = this.isDayTime();
        if (isDayTime){
            return 'Today';
        }
        return 'Tonight';
    }

    render() {
        const { dailyForecast } = this.props;
        const { Temperature, Day, Night } = dailyForecast;
        const { Minimum, Maximum } = Temperature;
        const maxValue = Math.round(Maximum.Value);
        const minValue = Math.round(Minimum.Value);

        const iconNumber = this.isDayTime() ? Day.Icon : Night.Icon;

        const dayTitle = this.getDayTitle();
        return (
            <div style={{ width: 220, padding: 8, margin: 8 }}>
                <div className="card">
                    <div className="card-body">
                        <p className="day-card-weekday">{dayTitle}</p>
                        <p className="day-card-max-degrees">{maxValue}<span className='day-card-min-degrees'> / {minValue} {Maximum.Unit}°</span></p>
                        <img style={{ height: 64 }} alt='weather-icon' src={require(`./../../assets/icons/${iconNumber}.png`)} />
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        currentConditions: state.currentConditions
    };
};

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(DayCard);

