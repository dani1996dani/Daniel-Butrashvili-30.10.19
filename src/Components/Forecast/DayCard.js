import React, { Component } from 'react';

class DayCard extends Component {
    render() {
        return (
            <div style={{ maxWidth: 250, padding: 8, margin: 8 }}>
                <div className="card">
                    <div className="card-body">
                        <p className="day-card-weekday">Today</p>
                        <p className="day-card-temp">22°<span className='day-card-unit'>C</span></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default DayCard;