import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { Provider } from 'react-redux';

import { NavBar, ForecastContainer } from './Components';
import { HOST, API_KEY } from './settings';
import { store } from './redux';


class App extends Component {

	componentDidMount() {
		// axios.get(`${HOST}currentconditions/v1/215854/?apikey=${API_KEY}`, {}).then((res) => {
		// 	const { data } = res;
		// 	console.log('data', data);
		// }).catch((err) => {

		// })
	}

	render() {
		return (
			<Provider
				store={store}>
				<div className="App">
					<NavBar />
					<h1>Tel Aviv</h1>
					<ForecastContainer />
				</div>
			</Provider>
		);
	}
}

export default App;
