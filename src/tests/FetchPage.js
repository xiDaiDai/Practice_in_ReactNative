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
  Modal,
  TouchableHighlight
} from "react-native";

class FetchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:'#F5FCFF'}}>
        <TouchableHighlight
              style={{height:50}}
              onPress={() => {}}
              underlayColor="#a9d9d4"
              >
          <Text style={{fontSize:20,color:'#000',flex:1,textAlign:'center'}}>click to show</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },

});

export default FetchPage;
