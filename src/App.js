import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';

import { NavBar, ConnectedRoot } from './Components';
import { store } from './redux';

class App extends Component {

	render() {
		return (
			<Provider
				store={store}>
				<div className="App">
					<ConnectedRoot />
				</div>
			</Provider>
		);
	}
}

export default App;
