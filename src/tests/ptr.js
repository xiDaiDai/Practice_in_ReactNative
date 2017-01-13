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

const pullHeight=120;
const {height,width} = Dimensions.get('window');
class ActionDetail extends Component {
   constructor(props) {
    super(props);
    this.yValue = 0;  //scrowview滑过的y值
    this.state = {
      pan: new Animated.ValueXY({x:0,y:0}),
      marginTop:-pullHeight,
      indicatorMsg:'下拉刷新'
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
     // ToastAndroid.show(gestureState.dy+'',2000);
     let dy = gestureState.dy;
     switch(true){
       case (0>=dy&&dy<pullHeight):
        this.setState({indicatorMsg:'下拉刷新'});
       break;
       case (dy>=pullHeight):
        this.setState({indicatorMsg:'松开刷新'});
        // ToastAndroid.show('松开刷新',1000);
       break;
     }
     if(gestureState.dy<pullHeight){
       Animated.timing(this.state.pan,{toValue: {x: 0, y: 0}}).start();
     }else{
       this.onRefresh();
     }
  }

  onScroll(event){
    let y = event.nativeEvent.contentOffset.y;
    this.yValue = y;
  }

  onRefresh(){
    this.setState({indicatorMsg:'加载中...'});
    Animated.sequence([ // One after the other
              Animated.delay(1500),
              Animated.timing(this.state.pan,{toValue: {x: 0, y: 0}})
              ]).start(this.setState({indicatorMsg:'下拉刷新'}));
  }

  render() {
      return (
      <View style={styles.mainContainer} {...this._panResponder.panHandlers}>
        <View style={{position:'absolute',top:0,left:0,right:0,height:pullHeight,width:width,backgroundColor:'orange',alignItems:'center',justifyContent:'center'}}>
                <Text>{this.state.indicatorMsg}</Text>
        </View>
        <Animated.View
                  style={[styles.icon,{
                  transform: [
                  {translateY: this.state.pan.y.interpolate({
                        inputRange: [-1, 0, pullHeight,pullHeight+1],
                        outputRange: [0, 0, pullHeight,pullHeight],
                     })},
                  ]}]}>
          <ScrollView bounces={false} ref='scrollview' style={{flex:1,height:height+300}}
            onScroll={(event)=>{this.onScroll(event)}}>
           <View style={{flex:1,backgroundColor:'white'}}>
                    <Text style={{fontSize:30}}>content</Text>
                    <Text style={{fontSize:30}}>content</Text>
                    <Text style={{fontSize:30}}>content</Text>
                    <Text style={{fontSize:30}}>content</Text>
                    <Text style={{fontSize:30}}>content</Text>
                    <Text style={{fontSize:30}}>content</Text>
                    <Text style={{fontSize:30}}>content</Text>
                    <Text style={{fontSize:30}}>content</Text>
                    <Text style={{fontSize:30}}>content</Text>
           </View>
          </ScrollView>
        </Animated.View>
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
  alignItems: 'center',
  flex:1,
  backgroundColor:'white'
  },

  headView:{
  height:height+300,
  width:width,
  backgroundColor:'white',
  justifyContent: 'center',
  alignItems:'center'
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

