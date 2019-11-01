import React, { Component } from 'react';
import { connect } from 'react-redux';

class FavoritesContainer extends Component{
    render(){
        return (
            <h1>FAVORITES</h1>
        );
    }
}


const mapStateToProps = state => {
    return {
        page: state.page
    };
};

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesContainer);