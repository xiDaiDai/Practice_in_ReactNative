import React, {
  Component,
  PropTypes
} from "react";
import {
  View,
  Text,
  Image,
  Navigator,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
} from "react-native";


const SQUARE_DIMENSIONS = 20;


class DotView extends Component {

  static defaultProps = {
    title: 'title',
    backHidden: true,
    actionHidden: true,

  }
  static propTypes = {
    backFunc: PropTypes.func,
    onSeekStart: PropTypes.func,
    backHidden: PropTypes.bool,
    actionHidden: PropTypes.bool,
    length: PropTypes.number,
    position: PropTypes.number,
    progress: PropTypes.number,
  }

  constructor(props) {
    super(props);
    this.state = {
      bg: 'blue',
      top: 0,
      left: 0,
      onmove: false

    };
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        this.props.onSeekStart
        this._top = this.state.top;
        this._left = this.state.left;
        this.setState({
          bg: 'red',
          onmove: true
        });

      },
      onPanResponderMove: (evt, gestureState) => {

        console.log(gestureState.dx);
        let currentLeft = (this._left + gestureState.dx) < 0 ? 0 : this._left + gestureState.dx;
        let left = currentLeft > this.props.length ? this.props.length : currentLeft;
        console.log('left :' + left);
        this.setState({
          top: this._top,
          left: left
        })
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        let currentLeft = (this._left + gestureState.dx) < 0 ? 0 : this._left + gestureState.dx;
        let left = currentLeft > this.props.length ? this.props.length : currentLeft;

        this.setState({
          bg: 'blue',
          top: this._top,
          left: left,
          onmove: false
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
          left: this.state.onmove ? this.state.left : this.props.position,
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
