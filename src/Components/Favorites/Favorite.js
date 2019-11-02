import React, { Component } from 'react';

class Favorite extends Component {
    render() {
        const { locationKey, locationName } = this.props;
        return (
            <div className='favorite-card' style={{ width: '20%', minWidth: 200 }} onClick={this.props.onClick}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <p className='favorite'>{locationName}</p>
                    </div>
                    <div>
                        <p className='favorite'>23°C</p>
                    </div>
                </div>
                <hr style={{ margin: 0 }} />
            </div>
        )
    }
}

export default Favorite;
