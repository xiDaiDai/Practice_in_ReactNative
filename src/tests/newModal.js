import React, {
  Component
} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class ShareComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    }
  }

  setModalVisible = (visible) => {
    this.setState({
      modalVisible: visible,
    });
  }


  doShare(type) {

  }

  doComplain() {

  }


  render() {
    return (
     <View style={{flex:1,backgroundColor:'#F5FCFF'}}>
      <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(false)}
        >
        <TouchableOpacity style={{flex:1}} activeOpacity={1} onPress={()=>{this.handlerCancel()}}>
          <View style={{flex:1,backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
          </View>
        </TouchableOpacity>
        <View style={styles.modal_view}>
          <View style={styles.modal_content_view}>
            <View style={styles.modal_title_view}>
              <Text style={styles.modal_title}>分享到</Text>
            </View>
            <View style={styles.modal_subview}>
              <View style={styles.modal_subShare_view}>
                <TouchableOpacity style={styles.sharelogo_view} onPress={()=>{this.doShare('weixin')}}>
                  <View style={styles.sharelogo_view}>
                    <Image style={styles.sharelogo} source={require('../images/stuff_unliked.png')}/>
                    <Text style={styles.sharelogo_text}></Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sharelogo_view} onPress={()=>{this.doShare('weixin_circle')}}>
                  <View style={styles.sharelogo_view}>
                    <Image style={styles.sharelogo} source={require('../images/stuff_weibo.png')}/>
                    <Text style={styles.sharelogo_text}></Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sharelogo_view} onPress={()=>{this.doShare('sina')}}>
                  <View style={styles.sharelogo_view}>
                    <Image style={styles.sharelogo} source={require('../images/stuff_wechat.png')}/>
                    <Text style={styles.sharelogo_text}></Text>
                  </View>
                </TouchableOpacity>
              </View>
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
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal_view: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modal_content_view: {
    height: 206,
    width: width,
    backgroundColor: 'white'
  },
  modal_title_view: {
    height: 41,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1'
  },
  modal_title: {
    fontSize: 14,
    color: '#989898'
  },
  modal_subview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 5
  },
  modal_subShare_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 0,
    marginRight: 0,
    alignItems: 'center',
    flex: 2
  },
  sharelogo_view: {
    width: width / 5,
    height: 70,
    alignItems: 'center'
  },
  sharelogo_text: {
    marginTop: 5,
    fontSize: 12,
    color: '#5E5E5E'
  },
  share_total_view: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: 10,
    width: width
  },
  share_button_view: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 39,
    width: width - 40,
    borderRadius: 5,
    backgroundColor: '#eeeeee'
  },
  share_touchable: {
    height: 39,
    width: width - 80,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sharelogo: {
    width: 45,
    height: 45,
  },

});

export default ShareComponent;
