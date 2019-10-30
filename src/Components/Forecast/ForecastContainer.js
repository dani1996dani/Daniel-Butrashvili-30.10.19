import React, {Component } from 'react';
import { connect } from 'react-redux';

class ForecastContainer extends Component {

    componentDidMount(){
        console.log('state', this.props.location);
    }

    render(){
        return (
            <div>

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