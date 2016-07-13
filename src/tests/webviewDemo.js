import React, {
  Component
} from "react";
import {
  View,
  Text,
  Image,
  Navigator,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder
} from "react-native";
import RCTWebView from './WebView';
const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;



class WebviewDemo extends Component {

  constructor(props) {
    super(props);
  }



  render() {
    return (
      <View style={styles.container}>
        <RCTWebView url="http://gank.io" style={{width:WINDOW_WIDTH,flex:1,borderWidth:2,borderColor:'#000'}}>

          </RCTWebView>
      </View>
    );
  }


}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

});

export default WebviewDemo;
