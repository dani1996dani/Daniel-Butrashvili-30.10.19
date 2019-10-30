import React, { Component } from 'react';

class NavBar extends Component {
    render() {
        return (
            <div>
                <div className="navbar">
                    <h1 className="company-name no-select">Real Fake Weather</h1>
                    <div className="navbar-links">
                        <a className="active no-select" href="#home">Home</a>
                        <a className="no-select" href="#contact">Contact</a>
                    </div>
                </div>
                <hr style={{ marginTop: 0, marginBottom: '2rem' }} />
            </div>
        );
    }
}

export default NavBar;
