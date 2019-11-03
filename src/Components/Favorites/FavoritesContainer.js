import React, { Component } from 'react';
import { connect } from 'react-redux';
import Favorite from './Favorite';
import { setPage } from './../../redux/page/pageActions';
import { setNewLocation } from './../../redux/location/locationActions';
import { temperatureUnits, pageNames } from './../../enums';
class FavoritesContainer extends Component {

    onFavoriteClick = (locationKey, locationName, countryName) => {
        this.props.setNewLocation(locationKey, locationName, countryName);
        this.props.setPage(pageNames.Forecast);
    }

    getFavoriteViews = () => {
        const { favorites, temperatureUnit } = this.props;
        console.log();
        const isMetric = temperatureUnit.unit === temperatureUnits.C;
        if (!favorites || favorites === undefined || favorites.length === 0)
            return (
                <div>
                    <p style={{ color: this.props.theme.textColor }}>You did not select any favorite locations yet.</p>
                    <p style={{ color: this.props.theme.textColor }}>Tap the star near the location to add it to your favorites list.</p>
                </div>
            );
        const favoriteViews = this.props.favorites.map((favoriteLocation, index) => {
            const { locationKey, locationName, countryName } = favoriteLocation;
            return (
                <Favorite
                    key={index}
                    locationName={locationName}
                    locationKey={locationKey}
                    onClick={() => { this.onFavoriteClick(locationKey, locationName, countryName); }}
                    textColor={this.props.theme.textColor}
                    isMetric={isMetric}
                />
            );
        })

        return favoriteViews;
    }
    render() {

        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1 style={{ marginBottom: 30, color: this.props.theme.textColor }}>Your Favorite Locations</h1>
                {this.getFavoriteViews()}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        page: state.page,
        favorites: state.favorites,
        theme: state.theme,
        temperatureUnit: state.temperatureUnit
    };
};

const mapDispatchToProps = dispatch => ({
    setPage: setPage(dispatch),
    setNewLocation: setNewLocation(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesContainer);