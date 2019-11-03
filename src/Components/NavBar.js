import React, { Component } from 'react';
import { connect } from 'react-redux';
import ToggleButton from 'react-toggle-button';

import { setPage } from './../redux/page/pageActions';
import { themes, temperatureUnits, pageNames } from './../enums';
import { setTheme } from './../redux/theme/themeActions';
import { setTemperatureUnit } from './../redux/temperatureUnit/temperatureUnitActions';


class NavBar extends Component {
    render() {
        const pages = [pageNames.Forecast, pageNames.Favorites];
        const { textColor } = this.props.theme;
        const { pageName } = this.props.page;
        const pageLinks = pages.map((page, index) => {
            const isSelectedPage = pageName === page;
            const className = isSelectedPage ? 'active no-select' : 'no-select';
            return (
                <span style={{ color: textColor }} key={index} onClick={() => { this.props.setPage(page) }} className={className}>{page}</span>
            );
        })
        return (
            <div>
                <div className="navbar">
                    <h1 style={{ color: textColor }} className="company-name no-select">Real Fake Weather</h1>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="navbar-links">
                            {pageLinks}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                            <ToggleButton
                                value={this.props.theme.theme !== themes.light}

                                inactiveLabel={'Light'}
                                activeLabel={'Dark'}
                                colors={{
                                    activeThumb: {
                                        base: 'rgb(62,130,247)',
                                    },
                                    inactiveThumb: {
                                        base: 'rgb(250,250,250)',
                                    },
                                    active: {
                                        base: 'rgb(65,66,68)',
                                        hover: 'rgb(95,96,98)',
                                    },
                                    inactive: {
                                        base: 'rgb(200,200,200)',
                                        hover: 'rgb(150,150,150)',
                                    }
                                }}
                                onToggle={(value) => {
                                    const theme = value ? themes.light : themes.dark;
                                    this.props.setTheme(theme);
                                }}
                            />
                            <ToggleButton
                                value={this.props.temperatureUnit.unit !== temperatureUnits.C}

                                inactiveLabel={'C°'}
                                activeLabel={'F°'}
                                colors={{
                                    activeThumb: {
                                        base: 'rgb(62,130,247)',
                                    },
                                    inactiveThumb: {
                                        base: 'rgb(250,250,250)',
                                    },
                                    active: {
                                        base: 'rgb(65,66,68)',
                                        hover: 'rgb(95,96,98)',
                                    },
                                    inactive: {
                                        base: 'rgb(200,200,200)',
                                        hover: 'rgb(150,150,150)',
                                    }
                                }}
                                onToggle={(value) => {
                                    const temperatureUnit = value ? temperatureUnits.C : temperatureUnits.F;
                                    this.props.setTemperatureUnit(temperatureUnit);
                                }}
                            />
                        </div>
                    </div>
                </div>
                <hr style={{ marginTop: 0, marginBottom: '2rem' }} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        page: state.page,
        theme: state.theme,
        temperatureUnit: state.temperatureUnit,
    };
};

const mapDispatchToProps = dispatch => ({
    setPage: setPage(dispatch),
    setTheme: setTheme(dispatch),
    setTemperatureUnit: setTemperatureUnit(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
