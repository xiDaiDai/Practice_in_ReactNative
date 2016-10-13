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
const maxHeight = 100;
class StuffDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.Value(0), // inits to zero
      scrollEnabled:true
    };
    this._y=0;
  }

  componentWillMount(){
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => {return false;},
      onStartShouldSetPanResponderCapture: (evt, gestureState) => {return true;},
      onMoveShouldSetPanResponder: (evt, gestureState) => {return true;},
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {return true},
      onPanResponderGrant: (evt, gestureState) => {},
      onPanResponderMove:  (evt,gestureState)=>{
        if(this._y==0&&gestureState.dy>0){
          this.setState({
              scrollEnabled:false
          });
        }else{
          this.setState({
              scrollEnabled:true
          });
        }
        this.top = gestureState.dy<=0?0:gestureState.dy>=maxHeight?maxHeight:gestureState.dy;
        this.state.pan.setValue(this.top);

      },

      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // if(this._y==0)
         Animated.timing(
           this.state.pan,
           {toValue:0,
            duration: 3*this.top}
         ).start();


       },
      onPanResponderTerminate: (evt, gestureState) => {},
      onShouldBlockNativeResponder: (evt, gestureState) => {return false;},
    });
  }

  componentDidMount(){

  }

  render() {
    return (

                <ScrollView
                  ref='scrollview'
                  style={{flex:1}}
                  onScroll={(event)=>{this.onScroll(event)}}
                  scrollEventThrottle={10}
                  scrollEnabled={this.state.scrollEnabled}
                  >
                  <View {...this._panResponder.panHandlers} style={[styles.container]}>
                  {this.renderTopContent()}
                  {this.renderText()}
                  </View>
                </ScrollView>


            );
  }


  renderTopContent(){
    return (
      <View style={{marginBottom:10,alignItems:'center'}}>
      {this.renderScaleImage()}
      </View>);
  }

  renderText(){
    return(
      <Animated.View style={[{marginLeft:10,marginRight:10},{
              transform: [   // Array order matters
                {translateY: this.state.pan.interpolate({
                  inputRange: [0, maxHeight],
                  outputRange: [0, 50],
                })},
              ]}]}>
        <Text style={{fontSize:18,color:'black',lineHeight:30}}>TITLE</Text>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Image style={styles.icon} source={{uri:'https://assets.renjk.com/mem/16100120504523.jpg'}}/>
          <Text style={{fontSize:15,color:'#656568',marginLeft:10}}>NICKNAME</Text>
          <Text style={{fontSize:15,color:'#bbbbbb',flex:1,textAlign:'right'}}>TIME</Text>
        </View>
        <View style={{flex:1,backgroundColor:'#f1f1f1',justifyContent:'center',alignItems:'center'}}>
          <Text style={{fontSize:20}}>CONTENT</Text>
          <Text style={{fontSize:20}}>CONTENT</Text>
          <Text style={{fontSize:20}}>CONTENT</Text>
          <Text style={{fontSize:20}}>CONTENT</Text>
          <Text style={{fontSize:20}}>CONTENT</Text>
          <Text style={{fontSize:20}}>CONTENT</Text>
          <Text style={{fontSize:20}}>CONTENT</Text>
          <Text style={{fontSize:20}}>CONTENT</Text>
          <Text style={{fontSize:20}}>CONTENT</Text>
          <Text style={{fontSize:20}}>CONTENT</Text>
          <Text style={{fontSize:20}}>CONTENT</Text>
          <Text style={{fontSize:20}}>CONTENT</Text>
          <Text style={{fontSize:20}}>CONTENT</Text>
          <Text style={{fontSize:20}}>CONTENT</Text>
          <Text style={{fontSize:20}}>CONTENT</Text>
          <Text style={{fontSize:20}}>CONTENT</Text>
          <Text style={{fontSize:20}}>CONTENT</Text>
          <Text style={{fontSize:20}}>CONTENT</Text>
          <Text style={{fontSize:20}}>CONTENT</Text>
          <Text style={{fontSize:20}}>CONTENT</Text>
          <Text style={{fontSize:20}}>CONTENT</Text>
          <Text style={{fontSize:20}}>CONTENT</Text>
          <Text style={{fontSize:20}}>CONTENT</Text>
        </View>
      </Animated.View>
      );
  }

  renderScaleImage(){
     return (
            <Animated.Image
                style={[{height:200, width: width},{
                transform: [   // Array order matters
                {scale: this.state.pan.interpolate({
                      inputRange: [0, maxHeight],
                      outputRange: [1, 1.5],
                   })}]}]}
                source={{uri:'http://img.bizhi.sogou.com/images/2014/02/12/517391.jpg'}}
                >
            </Animated.Image>
        );
  }

  onScroll(event) {
    let y = event.nativeEvent.contentOffset.y;
    maxHeight <= y ? this.setState({show: 1}) : this.setState({show: y/maxHeight})
    this._y =y;
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
    width: 40,
    height: 40,
    marginLeft: 2.5,
    borderRadius:20
  },
});


export default StuffDetailView;

