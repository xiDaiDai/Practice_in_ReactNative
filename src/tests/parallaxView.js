import React, {
  Component
} from "react"
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  Platform,
  TouchableHighlight,
  TextInput,
  ScrollView,
  Animated,
  PanResponder,
  ActivityIndicator,
  InteractionManager,
  ToastAndroid
} from "react-native";
const {height,width} = Dimensions.get('window');

class StuffDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: 0,
      bounceValue: new Animated.Value(0),
      top: 0,
    };
    this._y=0;
  }

  componentWillMount(){
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => {return false},
      onStartShouldSetPanResponderCapture: (evt, gestureState) => {return false},
      onMoveShouldSetPanResponder: (evt, gestureState) => {return gestureState.dy>=0&&this._y==0?true:false;},
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {return gestureState.dy>=0&&this._y==0?true:false},
      onPanResponderGrant: (evt, gestureState) => {this._top = 0;},
      onPanResponderMove: (evt, gestureState) => {
        this._top = gestureState.dy<=0?0:gestureState.dy>=100?100:gestureState.dy;
        this.setAnimateValue((this._top+200)/200);
        this.setState({top:this._top});
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
         this._top = 0;
         this.setAnimateValue(1);
         this.setState({top:0});
          // Animated.timing(
          //   this.state.bounceValue,
          //   {
          //     toValue: 1,
          //     duration: (this._top+200),
          //   },
          // ).start();

      },
      onPanResponderTerminate: (evt, gestureState) => {},
      onShouldBlockNativeResponder: (evt, gestureState) => {return false;},
    });
  }

  render() {

    return (
            <View style={styles.container} {...this._panResponder.panHandlers}>
                <ScrollView
                  ref='scrollview'
                  style={{flex:1}}
                  onScroll={(event)=>{this.onScroll(event)}}
                  scrollEventThrottle={10}
                  >
                  {this.renderTopContent()}
                  {this.renderText()}
                </ScrollView>
              </View>

            );
  }


  renderTopContent(){
    return (
      <View style={{marginBottom:10}}>
      {this.renderScaleImage()}
      </View>);
  }

  renderText(){
    return(
      <View style={{marginTop:this.state.top/2,marginLeft:10,marginRight:10}}>
        <Text style={{fontSize:18,color:'black',margin:10,lineHeight:30}}>title is title</Text>
        <View style={{flexDirection:'row',alignItems:'center',marginLeft:10,marginRight:10}}>
          <Image style={styles.icon} source={{uri:'https://assets.renjk.com/mem/16100120504523.jpg'}}/>
          <Text style={{fontSize:15,color:'#656568',marginLeft:10}}>maoamo</Text>
          <Text style={{fontSize:15,color:'#bbbbbb',flex:1,textAlign:'right'}}>setTime</Text>
        </View>
        <View style={{flex:1}}>
           <Text>
             AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
             AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
             AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
             AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
             AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
             AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
             AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
             AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
             AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
             AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
             AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
             AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
             AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
             AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
             AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
             AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
           </Text>
        </View>
      </View>
      );
  }

  renderScaleImage(){
     return (
            <Animated.Image
                style={[styles.background, {
                    height: 200,
                    transform: [
                    {scale: this.state.bounceValue},
                    ]
                }]}
                source={{uri:'http://img.bizhi.sogou.com/images/2014/02/12/517391.jpg'}}
                >
            </Animated.Image>
        );
  }

  onScroll(event) {
    const MAX = 200;
    let y = event.nativeEvent.contentOffset.y;
    MAX <= y ? this.setState({show: 1}) : this.setState({show: y/200})
    this._y =y;
  }

  setAnimateValue(value){
    this.state.bounceValue.setValue(value);
    Animated.spring(
      this.state.bounceValue,
      {
        toValue: value,
        friction: 0.5,
      }
    ).start();
  }


}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },

  buttonWrapper: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },

  background: {
        height:200,
        width: width,
    },

  icon: {
    width: 30,
    height: 30,
    marginLeft: 2.5,
  },
});


export default StuffDetailView;

