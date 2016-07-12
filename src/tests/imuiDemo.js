import React, {
  Component
} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  PixelRatio,
  ListView,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';


var datas = [{
  isMe: false,
  talkContent: '最近在学习React Native！',
}, {
  isMe: true,
  talkContent: '听说是个跨平台开发原生App的开源引擎',
}, {
  isMe: false,
  talkContent: '感觉编不下去对话了呀.......感觉编不下去对话了呀......感觉编不下去对话了呀......',
}, {
  isMe: true,
  talkContent: '无语！',
}, {
  isMe: false,
  talkContent: '自说自话，好难！随便补充点字数吧，嗯 就酱紫 :) ',
}, {
  isMe: true,
  talkContent: '感觉编不下去对话了呀......感觉编不下去对话了呀..',
}, {
  isMe: false,
  talkContent: 'GG,思密达编不下去了！',
}, ];


export default class FarmChildView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputContentText: '',
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
    this.listHeight = 0;
    this.footerY = 0;
  }

  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(datas)
    });
  }
  renderEveryData(eData) {
    return (
      <View style={eData.isMe==false?styles.everyRowRight:styles.everyRow}>
          <Image
            source={eData.isMe==false? null:require('../images/mine.png')}
            style={eData.isMe==false?null:styles.talkImg}
          />
          <View style={{flex:1}}>
          <View style={eData.isMe==false?styles.talkViewRight:styles.talkView}>
            <Text style={eData.isMe==false?styles.talkTextRight:styles.talkText  }>
                  {eData.talkContent}
            </Text>
          </View>
          </View>
          <Image
            source={eData.isMe==false? require('../images/mine.png') :null}
            style={eData.isMe==false?styles.talkImgRight:null}
          />
        </View>
    );
  }

  myRenderFooter(e) {
    return <View onLayout = {
      (e) => {
        this.footerY = e.nativeEvent.layout.y;
        if (this.listHeight && this.footerY && this.footerY > this.listHeight) {
          var scrollDistance = this.listHeight - this.footerY;
          this.refs._listView.scrollTo({
            y: -scrollDistance
          });
        }
      }
    }
    />
  }

  pressSendBtn() {
    if (this.state.inputContentText.trim().length <= 0) {
      Alert.alert('提示', '输入的内容不能为空');
      return;
    }
    datas.push({
      isMe: false,
      talkContent: this.state.inputContentText,
    });

    this.refs._textInput.clear();
    this.setState({
      inputContentText: '',
      dataSource: this.state.dataSource.cloneWithRows(datas)
    })
  }

  render() {
    return (
      <View style={ styles.container }>
              <View style={styles.topView}>
                <Text style={{fontSize:20,marginTop:15,color:'#f00'}}>React Native</Text>
              </View>


              <ListView
                ref='_listView'
                onLayout={(e)=>{this.listHeight = e.nativeEvent.layout.height;}}
                dataSource={this.state.dataSource}
                renderRow={this.renderEveryData.bind(this)}
                renderFooter={this.myRenderFooter.bind(this)}
              />


              <View style={styles.bottomView}>

                <View style={styles.searchBox}>
                  <TextInput
                      ref='_textInput'
                      onChangeText={(text) =>{this.state.inputContentText=text}}
                      placeholder=' 请输入对话内容'
                      returnKeyType='done'
                      style={styles.inputText}
                  />
                </View>

                <TouchableHighlight
                  underlayColor={'#AAAAAA'}
                  activeOpacity={0.5}
                  onPress={this.pressSendBtn.bind(this)}
                >
                  <View style={styles.sendBtn}>
                    <Text style={ styles.bottomBtnText }>
                          发送
                    </Text>
                  </View>
                </TouchableHighlight>

              </View>
            </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE'
  },
  topView: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    height: 52,
    padding: 5
  },
  bottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    height: 52,
    padding: 5
  },
  sendBtn: {
    alignItems: 'center',
    backgroundColor: '#FF88C2',
    padding: 10,
    borderRadius: 5,
    height: 40,
  },
  bottomBtnText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },



  searchBox: {
    height: 40,
    flexDirection: 'row',
    flex: 1, // 类似于android中的layout_weight,设置为1即自动拉伸填充
    borderRadius: 5, // 设置圆角边
    backgroundColor: 'white',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  inputText: {
    flex: 1,
    backgroundColor: 'transparent',
    fontSize: 20,
    marginLeft: 5
  },
  everyRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  everyRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  talkView: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 55,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  talkViewRight: {
    flex: 1,
    backgroundColor: '#90EE90',
    padding: 10,
    borderRadius: 5,
    marginLeft: 55,
    marginRight: 5,
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
  talkText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  talkTextRight: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  talkImg: {
    height: 40,
    width: 40,
    marginLeft: 10,
    marginBottom: 10
  },
  talkImgRight: {
    height: 40,
    width: 40,
    marginRight: 10,
    marginBottom: 10
  },
});
