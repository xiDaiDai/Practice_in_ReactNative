import React, {
	Component,
	PropTypes,

} from 'react';
import {
	View,
	StyleSheet,
	TouchableHighlight,
	Text,
	Image,
	Dimensions,
	DeviceEventEmitter
} from 'react-native';
import AndroidToast from './Toast';
import ImagePickerModule from './ImagePicker';
const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

class Test extends Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		DeviceEventEmitter.addListener('toastShowEvent', (event) => {
			AndroidToast.showToast('toastShowEvent', AndroidToast.SHORT);
		});
	}


	render() {

		return (
			<View style={{flex:1,flexDirection:'column',backgroundColor:'#fff'}}>
				 
					<TouchableHighlight onPress={()=>this.onClick()}>
				 		 <Text style={{textAlign:'center',
				 		 fontSize:20,color:'#fff',width:WINDOW_WIDTH,padding:5,
				 		 margin:5,backgroundColor:'#e00'}}>
				 		   call Android Toast and Emit the toastShowEvent
				 		 </Text>
					</TouchableHighlight>
					<TouchableHighlight onPress={()=>this.onClickCallBack()}>
				 		 <Text style={{textAlign:'center',
				 		 fontSize:20,color:'#fff',width:WINDOW_WIDTH,padding:5,
				 		 margin:5,backgroundColor:'#e00'}}>
				 		   call Android with callBack
				 		 </Text>
					</TouchableHighlight>

					<TouchableHighlight onPress={()=>this.onClickPromise()}>
				 		 <Text style={{textAlign:'center',
				 		 fontSize:20,color:'#fff',width:WINDOW_WIDTH,padding:5,
				 		 margin:5,backgroundColor:'#e00'}}>
				 		  call Android with Promise
				 		 </Text>
					</TouchableHighlight>

					<TouchableHighlight onPress={()=>this.onClickPickerImage()}>
				 		 <Text style={{textAlign:'center',
				 		 fontSize:20,color:'#fff',width:WINDOW_WIDTH,padding:5,
				 		 margin:5,backgroundColor:'#e00'}}>
				 		  call Android imagePicker
				 		 </Text>
					</TouchableHighlight>
				 
            </View>
		);
	}

	onClick() {
		AndroidToast.showToast('show toast', AndroidToast.SHORT);
	}

	onClickCallBack() {
		AndroidToast.measureLayout((msg) => {
				AndroidToast.showToast('show toast', AndroidToast.SHORT)
			},
			(a, b, c, d) => {
				AndroidToast.showToast(a + 'call back from Android' + b, AndroidToast.SHORT)
			});
	}

	onClickPromise() {

		AndroidToast.measureLayoutPromise('promise').then((message) => {
				AndroidToast.showToast(message, AndroidToast.SHORT);
				return AndroidToast.measureLayoutPromise('promise then');
			}, (message) => AndroidToast.showToast(message, AndroidToast.SHORT))
			.then((dddd) => AndroidToast.showToast(dddd, AndroidToast.SHORT),
				(message) => AndroidToast.showToast(message, AndroidToast.SHORT));


	}

	onClickPickerImage() {
		ImagePickerModule.pickImage().then((url) => AndroidToast.showToast('pic url:' + url, AndroidToast.SHORT),
			() => AndroidToast.showToast("fail", AndroidToast.SHORT));
	}
}



export default Test;