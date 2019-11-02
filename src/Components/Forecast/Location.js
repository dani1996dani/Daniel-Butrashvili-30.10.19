import React, { Component } from 'react';

class Location extends Component {

    state = {
        favorite: false
    }

    toggleFavorite = () => {
        const { isFavorite, location } = this.props;
        const { locationKey, locationName } = location;
        if (isFavorite){
            this.props.onUnFavorite(locationKey);
        } else {
            // this.props.onFavorite(locationKey, locationName);
            this.props.onFavorite();
        }
    }

    render() {
        // console.log('isFavorite, ', this.props.isFavorite);
        const { location, isFavorite } = this.props;
        // const { favorite } = this.state;
        const iconName = isFavorite ? 'star' : 'hollowStar';
        const title = isFavorite ? 'Remove from favorites' : 'Add to favorites';
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