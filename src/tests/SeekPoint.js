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


const SQUARE_DIMENSIONS = 20;


class DotView extends Component {

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
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        this._top = this.state.top;
        this._left = this.state.left;
        this.setState({
          bg: 'red'
        });
      },
      onPanResponderMove: (evt, gestureState) => {
        console.log(gestureState.dx)
        this.setState({
          top: this._top,
          left: this._left + gestureState.dx
        })
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {

        this.setState({
          bg: 'blue',
          top: this._top,
          left: this._left + gestureState.dx
        })
      },
      onPanResponderTerminate: (evt, gestureState) => {},
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return true;
      },
    });
  }


  render() {
    return ( < View style = {
        {
          width: SQUARE_DIMENSIONS,
          height: SQUARE_DIMENSIONS,
          backgroundColor: this.state.bg,
          top: this.state.top,
          left: this.state.left,
          borderRadius: 10,
          position: 'absolute'
        }
      } {...this._panResponder.panHandlers
      }
      />
    )
  }


}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default DotView;
