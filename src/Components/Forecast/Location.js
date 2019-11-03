import React, { Component } from 'react';
import { connect } from 'react-redux';

class Location extends Component {

    state = {
        favorite: false
    }

    toggleFavorite = () => {
        const { isFavorite, location } = this.props;
        const { locationKey } = location;
        if (isFavorite){
            this.props.onUnFavorite(locationKey);
        } else {
            this.props.onFavorite();
        }
    }

    render() {
        const { location, isFavorite } = this.props;
        const { textColor } = this.props.theme;
        const iconName = isFavorite ? 'Star' : 'HollowStar';
        const title = isFavorite ? 'Remove from favorites' : 'Add to favorites';
        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <p className='city-title' style={{ margin: 0, color: textColor }}>{location.locationName}</p>
                <p className='country-title' style={{ margin: 0, color: textColor }}>{location.locationCountryName}</p>
                <img
                    style={{ height: 32, marginTop: 8, cursor: 'pointer' }}
                    onClick={this.toggleFavorite}
                    title={title}
                    alt='favorite-location'
                    src={require(`./../../assets/icons/${this.props.theme.theme}${iconName}.png`)}
                />
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        theme: state.theme,
    };
};

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Location);