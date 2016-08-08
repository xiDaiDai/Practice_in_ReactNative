import React, {
  Component
} from "react";
import {
  View,
  Image,
  Navigator,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableHighlight,
  ProgressBarAndroid
} from "react-native";

import DotView from './SeekPoint';

class ModalPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
      <View style={{}}>
         <ProgressBarAndroid
         progress={0.8}
         indeterminate={false}
         style={{width:300,height:20}}
         styleAttr="Horizontal"/>
         <DotView style={{}}></DotView>
        </View>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  },

});

export default ModalPage;
