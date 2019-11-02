import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ForecastContainer, FavoritesContainer } from './../Components';
import { setFavoritesArray } from './../redux/favorites/favoritesActions';

class ConnectedRoot extends Component {

    componentDidMount = () => {
        this.initFavorites();
    }

    initFavorites = () => {
        const cachedFavorites = this.getFavoritesFromCache();
        this.props.setFavoritesArray(cachedFavorites);
    }

    //move to connectedRoot
    getFavoritesFromCache = () => {
        const savedFavorites = localStorage.getItem('favorites');
        if (!savedFavorites || savedFavorites === undefined)
            return [];
        const savedArray = JSON.parse(savedFavorites);
        this.setState({
            favorites: savedArray
        })
        return savedArray;
    }

    getCurrentPage = () => {
        switch (this.props.page.pageName) {
            case 'Forecast':
                return (<ForecastContainer />);
            case 'Favorites':
                return (<FavoritesContainer />)
            default: return null;
        }
    }

    render() {
        return this.getCurrentPage();
    }
}


const mapStateToProps = state => {
    return {
        page: state.page,
        favorites: state.favorites
    };
};

const mapDispatchToProps = dispatch => ({
    setFavoritesArray: setFavoritesArray(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedRoot);