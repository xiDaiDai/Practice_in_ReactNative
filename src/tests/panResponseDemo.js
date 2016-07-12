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
  Animated,
  PanResponder
} from "react-native";

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const SQUARE_DIMENSIONS = 100;


class PanResponderDemo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bg: 'blue',
      top: 0,
      left: 0,

    };
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
        this._top = this.state.top;
        this._left = this.state.left;
        this.setState({
          bg: 'red'
        });
        // gestureState.{x,y}0 现在会被设置为0
      },
      onPanResponderMove: (evt, gestureState) => {
        // 最近一次的移动距离为gestureState.move{X,Y}
        console.log(gestureState.dx)
          // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
        this.setState({
          top: this._top + gestureState.dy,
          left: this._left + gestureState.dx
        })
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // 一般来说这意味着一个手势操作已经成功完成。

        this.setState({
          bg: 'blue',
          top: 0,
          left: 0
        })
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
        // 默认返回true。目前暂时只支持android。
        return true;
      },
    });
  }


  render() {
    return (
      <View style={styles.container}>
        <View {...this._panResponder.panHandlers} style={{
          width: SQUARE_DIMENSIONS,
        height: SQUARE_DIMENSIONS,
        backgroundColor: this.state.bg,
        top: this.state.top,
        left: this.state.left
      }
  }/>
      </View>
    );
  }


}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  square: {

  }
});

export default PanResponderDemo;
