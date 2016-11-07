'use strict';

import {requireNativeComponent,View} from 'react-native';
import React,{PropTypes} from 'react';

var iface = {
  name: 'CountDownView',
  propTypes: {
    start: PropTypes.bool,
    ...View.propTypes,
  },
};

export default requireNativeComponent('RCTCountDownView', iface);
