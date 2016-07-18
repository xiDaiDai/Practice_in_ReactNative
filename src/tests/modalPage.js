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

class ModalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:'#F5FCFF'}}>
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {this.setModalVisible(false)}}
        >
          <View style={styles.container}>
              <View style={{borderRadius:5,backgroundColor:'#fff',height:100,width:250,justifyContent:'center',alignItems:'center'}}>
              <Image style={{height:40,width:40}}
              source={require('../images/mine.png')}></Image>
              <Text >any component here</Text>
              <View style={{width:250,flexDirection:'row',justifyContent: 'space-between',marginTop:10}}>
                <Text style={{flex:1,textAlign:'center',fontWeight:'bold'}} onPress={()=>{this.setModalVisible(!this.state.modalVisible)}}>yes</Text>
                <Text style={{flex:1,textAlign:'center',fontWeight:'bold'}} onPress={()=>{this.setModalVisible(!this.state.modalVisible)}}>no</Text>
              </View>
             </View>
          </View>
        </Modal>
        <TouchableHighlight
              style={{position:'absolute',bottom:0,left:0,right:0,height:50}}
              onPress={() => {
              this.setModalVisible(!this.state.modalVisible)}}
              underlayColor="#a9d9d4"
              >
          <Text style={{fontSize:20,color:'#000',flex:1,textAlign:'center'}}>click to show</Text>
        </TouchableHighlight>
      </View>
    );
  }


  setModalVisible(visible) {
    this.setState({
      modalVisible: visible
    });
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

export default ModalPage;
