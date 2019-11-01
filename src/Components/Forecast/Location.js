import React, { Component } from 'react';

class Location extends Component {

    state = {
        favorite: false
    }

    toggleFavorite = () => {
        this.setState({
            favorite: !this.state.favorite
        });
    }

    render() {
        const { location } = this.props;
        const { favorite } = this.state;
        const iconName = favorite ? 'star' : 'hollowStar';
        const title = favorite ? 'Remove from favorites' : 'Add to favorites';
        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <p className='city-title' style={{ margin: 0 }}>{location.locationName}</p>
                <p className='country-title' style={{ margin: 0 }}>{location.locationCountryName}</p>
                <img
                    style={{ height: 32, marginTop: 8, cursor: 'pointer' }}
                    onClick={this.toggleFavorite}
                    title={title}
                    alt='favorite-location'
                    src={require(`./../../assets/icons/${iconName}.png`)}
                />
            </div>
        );
    }
}

export default Location;