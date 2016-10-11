import React, {
  Component,
  PropTypes
} from 'react';

import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';

export default class NavigationBar extends Component {

  static defaultProps = {
    title: '',
    titleColor: '#232325',
    titleSize: 18,
    backHidden: false,
    actionHidden: true,
    barColor: 'white',
    barHeight: Platform.OS == 'android'?50:64,
    iconWidth: 25,
    iconHeight: 25,
    actionWidth: 25,
    actionHeight: 25,
    backText:'',
    actionText:''

  }
  static propTypes = {
    title: PropTypes.string,
    titleColor: PropTypes.string,
    titleSize: PropTypes.number,
    backFunc: PropTypes.func,
    actionFunc: PropTypes.func,
    backHidden: PropTypes.bool,
    actionHidden: PropTypes.bool,
    backIcon: PropTypes.number,
    actionIcon: PropTypes.number,
    barColor: PropTypes.string,
    barHeight: PropTypes.number,
    iconWidth: PropTypes.number,
    iconHeight: PropTypes.number,
    actionWidth: PropTypes.number,
    actionHight: PropTypes.number,
    backText:PropTypes.string,
    actionText:PropTypes.string,
  }

  render() {
    return (
      <View style = {[styles.navBar,{backgroundColor:this.props.barColor,height:this.props.barHeight}]}>
        {this.props.backHidden?
          <View style={[styles.buttonWrapper,{height:this.props.barHeight,width:this.props.barHeight}]}/>:
        <View style={{flex:1}}>
        <TouchableOpacity style={[styles.buttonWrapper,{height:this.props.barHeight}]} onPress={this.props.backFunc}>
          <Image style={{height:this.props.iconHeight,width:this.props.iconWidth}} source={this.props.backIcon}></Image>
          <Text style={{fontSize:16,color:'#232325'}}>{this.props.backText}</Text>
        </TouchableOpacity>
        </View>
      }
        <Text style={[styles.title,{color:this.props.titleColor,fontSize:this.props.titleSize}]} numberOfLines={1}>{this.props.title}</Text>
    {
      this.props.actionHidden ? <View style={[{backgroundColor:'blue',flex:1,height:this.props.barHeight,width:this.props.barHeight}]}/> :
        <View style={{flex:1}}>
        <TouchableOpacity style={[styles.buttonWrapper,{height:this.props.barHeight,width:this.props.barHeight}]} onPress={this.props.actionFunc}>
          <Image style={[styles.icon,{height:this.props.actionHeight,width:this.props.actionWidth}]} source={this.props.actionIcon}></Image>
          <Text style={{fontSize:16,color:'#232325'}}>{this.props.actionText}</Text>
        </TouchableOpacity>
        </View>}
      </View>)
  }
}

const styles = StyleSheet.create({
  navBar: {
    justifyContent: 'center',
    opacity: 1,
    flexDirection: 'row'
  },
  buttonWrapper: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection:'row',
    paddingLeft:10,
    paddingRight:10,
    backgroundColor:'blue'
  },
  icon: {

  },
  title: {
    textAlign: 'center',
    alignSelf: 'center',
    flex: 1
  },
});

