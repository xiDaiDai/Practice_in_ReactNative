'use strict';
import {
	requireNativeComponent,
	View
} from 'react-native';
import {
	PropTypes
} from 'react';

const iface = {
	name: 'WebView',
	propTypes: {
		...View.propTypes,
		url: PropTypes.string,
		html: PropTypes.string,
	},
};

module.exports = requireNativeComponent('RCTWebView', iface);