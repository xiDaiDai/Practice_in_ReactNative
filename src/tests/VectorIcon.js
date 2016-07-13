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

import Icon from 'react-native-vector-icons/FontAwesome';

class VectorIcon extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }



  render() {


    return (
      <View style={styles.container}>
        <Icon name="automobile" size={50} color="#f00" style={{margin:10}}/>
        <Icon.Button name="facebook" backgroundColor="#3b5998">
          <Text style={{fontFamily: 'Arial', fontSize: 15}}>Login with Facebook</Text>
        </Icon.Button>
        <Icon name="android" size={30} color="#0f0" style={{margin:10}}/>
        <Icon name="apple" size={30} color="#000" style={{margin:10}}/>
        <Icon name="chrome" size={30} color="#120" style={{margin:10}}/>
        <Icon name="github" size={30} color="#f60" style={{margin:10}}/>
        <Icon name="linux" size={30} color="#60f" style={{margin:10}}/>
        <Icon name="qq" size={30} color="#f00" style={{margin:10}}/>
        <Icon name="twitter" size={30} color="#f0f" style={{margin:10}}/>
        <Icon name="windows" size={30} color="#ee8" style={{margin:10}}/>
        <Icon name="wechat" size={30} color="#0f0" style={{margin:10}}/>

      </View>
    );
  }


}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },

});

export default VectorIcon;
