import React from 'react';
import ReactDOM from 'react-dom';
import Home from './controllers/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
import GlobalStyle from "./components/GlobalStyle"
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Provider } from 'react-redux';
import store from './redux/store';

function getLibrary(provider) {
	const library = new Web3Provider(provider)
	library.pollingInterval = 12000
	return library
}

ReactDOM.render(
	<React.StrictMode>
		<GlobalStyle />
		<Provider store={store}>
			<Web3ReactProvider getLibrary={getLibrary}>
				<Router>
					<Switch>
						<Route path="/">
							<Home />
						</Route>
					</Switch>
				</Router>
			</Web3ReactProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);