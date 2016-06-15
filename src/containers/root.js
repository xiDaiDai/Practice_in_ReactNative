import React, {
	Component
} from 'react';
import ReactNative from 'react-native';
import {
	Provider
} from 'react-redux';
import App from './app';
import configureStore from "../stores/configure-store";

const store = configureStore();

class Root extends Component {
	render() {
		return (
			<Provider store = {store} >
					<App/> 
			</Provider>
		);
	}
}

export default Root;