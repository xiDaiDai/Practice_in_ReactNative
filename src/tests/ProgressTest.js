import React, {
  Component,
  PropTypes
} from "react";
import {
  View,
  Image,
  Navigator,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableHighlight,
  ProgressBarAndroid,
} from "react-native";

import DotView from './SeekPoint';

class ModalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0
    }
  }

  static defaultProps = {
    title: 'title',
    backHidden: true,
    actionHidden: true,

  }
  static propTypes = {

    backFunc: PropTypes.func,
    actionFunc: PropTypes.func,
    backHidden: PropTypes.bool,
    actionHidden: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number,
    progress: PropTypes.number,
  }

  componentDidMount() {
    let counter = 0;
    setInterval(() => {
      this.setState({
        position: counter++
      })
    }, 1000);
  }

  render() {
    return (
      <View style={styles.container}>
      <View style={{}}>
         <ProgressBarAndroid
         progress={0.8}
         indeterminate={false}
         style={{width:300,height:20}}
         styleAttr="Horizontal"/>
         <DotView
          length={300}
          position={this.state.position}
          onSeekStart={()=>{this.startSeek()}}
          style={{}}></DotView>
        </View>
      </View>
    );
  }

  startSeek() {

  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  },

});

export default ModalPage;
