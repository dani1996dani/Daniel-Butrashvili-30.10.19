import React, { Component } from 'react';
import { connect } from 'react-redux';
import {SearchBar} from './../Search';



class ForecastContainer extends Component {

    state = {
        value: ''
    }

    componentDidMount() {
        console.log('state', this.props.location);
    }

    onValueChange = (value) => {
        console.log('forecast value CHANGE:', value);
    }

    onValueSelect = (value) => {
        console.log('forecast value SELECT:', value);
    }

    render() {
        
        return (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <SearchBar
                    onValueChange={this.onValueChange}
                    onValueSelect={this.onValueSelect}
                 />
                <h1>Tel Aviv</h1>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        location: state.location,
    };
};

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ForecastContainer);