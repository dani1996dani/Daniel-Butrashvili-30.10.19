import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';

import { NavBar, ConnectedRoot } from './Components';
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
					<ConnectedRoot />
				</div>
			</Provider>
		);
	}
}

export default App;
