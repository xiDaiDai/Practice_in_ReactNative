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
  type: 'pic',
  isMe: false,
  image: 'http://ww2.sinaimg.cn/large/610dc034jw1f5s5382uokj20fk0ncmyt.jpg'
}, {
  type: 'text',
  isMe: true,
  talkContent: 'react native是什么',
}, {
  type: 'text',
  isMe: false,
  talkContent: '欢迎来到侏罗纪公园，里面有各种啤酒，烤串，鱼雷世界',
}, {
  type: 'pic',
  isMe: true,
  image: 'http://ww2.sinaimg.cn/large/610dc034jw1f5s5382uokj20fk0ncmyt.jpg'
}, {
  type: 'text',
  isMe: false,
  talkContent: '顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶的顶顶顶顶顶顶顶顶顶顶',
}, {
  type: 'text',
  isMe: true,
  talkContent: '快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快',
}, {
  type: 'pic',
  isMe: false,
  image: 'http://gold.xitu.io/favicons/apple-touch-icon-180x180.png'
}, ];


export default class IMUI extends Component {
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
            source={eData.isMe==false? null:{uri:'http://avatars1.githubusercontent.com/u/9985454?v=3&u=2d366f81a3ff39f4439e7cec24ab9fa0cdb48b22&s=140'}}
            style={eData.isMe==false?null:styles.avatarLeft}
          />
          <View style={{flex:1}}>
          <View style={eData.isMe==false?styles.talkViewRight:styles.talkViewLeft}>
            {eData.type!='pic'?
            (<Text style={eData.isMe==false?styles.talkTextRight:styles.talkTextLeft}>
                  {eData.talkContent}
            </Text>):(<Image
            source={{uri:eData.image}}
            style={styles.contentImg}/>)}
          </View>
          </View>
          <Image
            source={eData.isMe==false? {uri:'http://tp2.sinaimg.cn/1831355877/50/5651946296/1'} :null}
            style={eData.isMe==false?styles.avatarRight:null}
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
                      placeholder=' 请输入内容'
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
    padding: 5,
    marginBottom: 10
  },
  sendBtn: {
    alignItems: 'center',
    backgroundColor: '#fff',
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
  talkViewLeft: {
    flex: 1,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 55,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  talkViewRight: {
    flex: 1,
    backgroundColor: '#90EE90',
    padding: 5,
    borderRadius: 5,
    marginLeft: 55,
    marginRight: 5,
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
  talkTextLeft: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  talkTextRight: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  avatarLeft: {
    height: 50,
    width: 50,
    marginLeft: 10,
    marginBottom: 10,
    borderRadius: 25
  },
  avatarRight: {
    height: 50,
    width: 50,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 25
  },

  contentImg: {
    height: 100,
    width: 80,
  },
});
