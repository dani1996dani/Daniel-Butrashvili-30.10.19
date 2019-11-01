import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ForecastContainer, FavoritesContainer } from './../Components';

class ConnectedRoot extends Component {

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
        page: state.page
    };
};

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedRoot);