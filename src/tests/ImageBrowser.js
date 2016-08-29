import React, {
  Component
} from 'react';
import {
  TouchableHighlight,
  TouchableWithoutFeedback,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ListView,
  ScrollView,
  Platform,
} from 'react-native';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

var images = ["16082211242723.jpg", "16081917114966.jpg", "16081915320364.jpg",
  "16081916411579.png", "16081910482475.jpg", "16081917375464.jpg", "16081917543225.png",
  "16081917231867.jpg", "16081917293119.png", "16081917302251.png"
];


export default class DynamicPhotoView extends Component {
  constructor(props) {
    super(props);

    // images = this.props.images;
    this.state = {
      currentPage: 1,
      modalVisible: false,
    }
  }

  componentDidMount() {
    console.log(images.length);
  }

  createThumbRow = (uri, i) => {
    return (
      <View style={styles.container2}>
        <Image style={styles.photo} source={{uri:this.state.url}}/>
      </View>);
  }

  getcurrentIndex = (event) => {

    this.setState({
      currentPage: parseInt(parseInt(event.nativeEvent.contentOffset.x) / parseInt(width)) + 1,
    });

  }



  render() {

    return (
      <View style={styles.container}>

        <ScrollView
          automaticallyAdjustContentInsets={false}
          onScroll={(event) => this.getcurrentIndex(event)}
          scrollEventThrottle={200}
          style={styles.scrollView}
          horizontal={true}
          pagingEnabled={true}>

          {images.map((uri, i) => this.createThumbRow(uri, i))}
        </ScrollView>
        <View style={styles.titleView}>

          <TouchableHighlight style={styles.back_touchable} onPress={() => {}}>
             <Image source = {require('../images/dis.png')} style={{marginLeft: 20, height:30,width:30}} />
          </TouchableHighlight>
          <Text style={styles.index}>{this.state.currentPage + "/" + images.length}</Text>
          <Text style={styles.saveText} onPress={() => {}}>保存图片</Text>
        </View>



      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height,
    width: width,
    // backgroundColor: 'yellow'//'#F5FCFF',
  },
  scrollView: {
    backgroundColor: 'black',
    height: height,
    width: width,
  },
  titleView: {
    position: 'absolute',
    width: width,
    marginTop: -height + 20,
    marginLeft: 0,
    height: 30,
    justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor: 'white',
    flexDirection: 'row',
  },
  index: {
    flex: 1,
    fontSize: 20,
    color: '#f1f1f1',
    textAlign: 'center',
  },
  saveText: {
    marginRight: 20,
    flex: 1,
    fontSize: 16,
    color: '#bbbbbd',
    textAlign: 'right',
  },
  saveView: {
    marginTop: 5,
    width: width,
    height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalText: {
    fontSize: 16,
    color: 'rgb(23,23,24)',
  },
  touchableHighlight: {
    flex: 1,
    width: width,
    alignItems: 'center',
    justifyContent: 'center'
  },
  back_touchable: {
    flex: 1,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  container2: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
    height: height,
    width: width,
    padding: 5,
  },
  photo: {
    flex: 1,
    height: height,
    width: width - 10,
    backgroundColor: 'black',
    resizeMode: 'contain',
  },
});
