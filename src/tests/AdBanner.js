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
  ScrollView,
  Animated
} from "react-native";


const width = Dimensions.get('window').width;


class AdBanner extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
           <ScrollView style={{height:50}}>
            <Animated.View>
              <View style={{height:50,backgroundColor:'red',justifyContent:'center'}}>
                <Text style={{fontSize:18}}>aaaasdfsdfd89999999999aaa</Text>
              </View>
               <View style={{height:50,backgroundColor:'red',justifyContent:'center'}}>
                <Text style={{fontSize:18}}>aa4564564546464546465656a</Text>
              </View>
               <View style={{height:50,backgroundColor:'red',justifyContent:'center'}}>
                <Text style={{fontSize:18}}>asdfdhhhhhhhhhhhhhhhhhhhh</Text>
              </View>
               <View style={{height:50,backgroundColor:'red',justifyContent:'center'}}>
                <Text style={{fontSize:18}}>aaaaddddddddddddddddddffaaaaa</Text>
              </View>
               <View style={{height:50,backgroundColor:'red',justifyContent:'center'}}>
                <Text style={{fontSize:18}}>aaaaaaaaweeeeeeeeeeeeeeeeaaaaa</Text>
              </View>
               <View style={{height:50,backgroundColor:'red',justifyContent:'center'}}>
                <Text style={{fontSize:18}}>aaaaaaaaerwerwerweraaaaaaaaa</Text>
              </View>
               <View style={{height:50,backgroundColor:'red',justifyContent:'center'}}>
                <Text style={{fontSize:18}}>aaaaaaaaaadddddd</Text>
              </View>
              </Animated.View>
           </ScrollView>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
  },

});

export default AdBanner;
