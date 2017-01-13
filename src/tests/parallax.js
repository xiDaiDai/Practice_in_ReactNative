import React, {
  Component,
} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  Alert,
  PanResponder,
  Animated,
  ToastAndroid
} from 'react-native';


const {height,width} = Dimensions.get('window');
class ActionDetail extends Component {
   constructor(props) {
    super(props);
    this.yValue = 0;  //scrowview滑过的y值
    this.state = {
      pan: new Animated.ValueXY({x:0,y:0}),
      marginTop:-60,
    };
  }



  componentWillMount(){
   this._panResponder = PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => {return false;},
      onStartShouldSetPanResponder: (evt, gestureState) => {return false;},
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {return this.yValue<=0&&gestureState.dy>0?true:false;},
      onMoveShouldSetPanResponder: (evt, gestureState) => {return false;},
      onPanResponderGrant: (evt, gestureState)=>{},
      onPanResponderMove: Animated.event([null, {dx: this.state.pan.x, dy: this.state.pan.y},]),
      onPanResponderRelease: (evt, gestureState)=>this._handlePanResponderEnd(evt, gestureState),
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderTerminate: (evt, gestureState)=>this._handlePanResponderEnd(evt, gestureState),
    });
  }

  _handlePanResponderEnd(evt, gestureState){
     Animated.timing(this.state.pan,{toValue: {x: 0, y: 0}}).start();
  }

  onScroll(event){
    let y = event.nativeEvent.contentOffset.y;
    this.yValue = y;
  }

  render() {
      let translateY = myStyleSheet.icon.height/2;
      return (
      <View style={styles.mainContainer}>
           <ScrollView bounces={false} ref='scrollview' style={{flex:1}}
            onScroll={(event)=>{this.onScroll(event)}}>
              <View style={{flex:1,marginTop:this.state.marginTop}} {...this._panResponder.panHandlers} >
              <Animated.Image
                  source={{uri:'http://testassets.renjk.com/health/16113016114322.jpg'}}
                  style={[styles.icon,{
                  transform: [
                  {translateY: this.state.pan.y.interpolate({
                        inputRange: [-1, 0, 60,61],
                        outputRange: [0, 0, 60,60],
                     })},
                  {scaleY: this.state.pan.y.interpolate({
                        inputRange: [-1, 0, height/2, height/2+1],
                        outputRange: [1, 1, 1.2, 1.2],
                     })},
                  {scaleX: this.state.pan.y.interpolate({
                        inputRange: [-1, 0, height/2, height/2+1],
                        outputRange: [1, 1, 1.2, 1.2],
                     })},
                  ]}]}/>
                <Animated.View style={[{
                  transform: [
                  {translateY: this.state.pan.y.interpolate({
                        inputRange: [-1, 0, 60,61],
                        outputRange: [0, 0, 60,60],
                     })},
                  ]}]}>
                  <View style={[styles.headView]}>

                  </View>
                </Animated.View>
              </View>
           </ScrollView>
        </View>
      );
    }

}


export default ActionDetail;
const myStyleSheet = {
  mainContainer : {
    flex:1,
    backgroundColor:'white'
  },
   container : {
    flex:1,
    backgroundColor:'white'
  },
  iconWrapper : {
  justifyContent: 'center',
  alignItems: 'center',
  },

  icon : {
  height: 600*height/1334,
  width: width,
  },

  headView:{
  height:height*2,
  width:width,
  backgroundColor:'orange',
  justifyContent: 'center',
  },
  headText:{
  fontSize:44*width/750,
  color:'black',
  marginLeft:5,
  marginRight:5,
  },
  bodyView : {
    marginLeft:5,
    marginRight:5,
    flex:1,
  },
  bodyText : {
   fontSize:32*width/750,
   color:'black',
   marginLeft:5,
   marginRight:5,
   marginBottom:70*height/1334,
   marginTop:64*height/1334,
  },
};
var styles = StyleSheet.create(myStyleSheet);

