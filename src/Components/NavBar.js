import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setPage } from './../redux/page/pageActions';

class NavBar extends Component {
    render() {
        const pages = ['Forecast', 'Favorites'];
        const { pageName } = this.props.page;
        const pageLinks = pages.map((page, index) => {
            const isSelectedPage = pageName === page;
            const className = isSelectedPage ? 'active no-select' : 'no-select';
            return (
                <span key={index} onClick={() => {this.props.setPage(page)}} className={className}>{page}</span>
            );
        })
        return (
            <div>
                <div className="navbar">
                    <h1 className="company-name no-select">Real Fake Weather</h1>
                    <div className="navbar-links">
                        {pageLinks}
                    </div>
                </div>
                <hr style={{ marginTop: 0, marginBottom: '2rem' }} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        page: state.page
    };
};

const mapDispatchToProps = dispatch => ({
    setPage: setPage(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
