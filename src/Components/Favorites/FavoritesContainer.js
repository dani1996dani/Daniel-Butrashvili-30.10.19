import React, { Component } from 'react';
import { connect } from 'react-redux';
import Favorite from './Favorite';
import { setPage } from './../../redux/page/pageActions';
import { setNewLocation } from './../../redux/location/locationActions';

class FavoritesContainer extends Component {

    onFavoriteClick = (locationKey, locationName) => {
        this.props.setNewLocation(locationKey, locationName);
        this.props.setPage('Forecast');
    }

    getFavoriteViews = () => {
        const favoriteViews = this.props.favorites.map((favoriteLocation, index) => {
            const { locationKey, locationName } = favoriteLocation;
            return (
                <Favorite
                    key={index}
                    locationName={locationName}
                    locationKey={locationKey}
                    onClick={() => {this.onFavoriteClick(locationKey, locationName); }}
                 />
            );
        })

        return favoriteViews;
    }
    render() {
        
        return (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <h1>Your Favorite Locations</h1>
                {this.getFavoriteViews()}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        page: state.page,
        favorites: state.favorites,
    };
};

const mapDispatchToProps = dispatch => ({
    setPage: setPage(dispatch),
    setNewLocation: setNewLocation(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesContainer);