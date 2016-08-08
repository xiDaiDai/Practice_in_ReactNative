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
	DeviceEventEmitter,
	ScrollView
} from 'react-native';
import AndroidToast from '../tests/Toast';
import ImagePickerModule from '../tests/ImagePicker';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
import PanResponder from '../tests/panResponseDemo';
import IMUI from '../tests/imuiDemo';
import VectorIcon from '../tests/VectorIcon';
import WebView from '../tests/webviewDemo';
import VideoPlayer from '../tests/videoPlayer';
import ModalPage from '../tests/modalPage';
import FetchPage from '../tests/FetchPage';
import ProgressTest from '../tests/ProgressTest';

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
			<View style={{flex:1,flexDirection:'column',backgroundColor:'#fff',padding:10,alignItems:'center'}}>
				<ScrollView>
					<TouchableHighlight onPress={()=>this.onClick()}>
				 		 <Text style={{textAlign:'center',
				 		 fontSize:20,color:'#fff',width:WINDOW_WIDTH-20,padding:5,
				 		 margin:5,backgroundColor:'#ff8c00'}}>
				 		   call Android Toast and Emit the toastShowEvent
				 		 </Text>
					</TouchableHighlight>
					<TouchableHighlight onPress={()=>this.onClickCallBack()}>
				 		 <Text style={{textAlign:'center',
				 		 fontSize:20,color:'#fff',width:WINDOW_WIDTH-20,padding:5,
				 		 margin:5,backgroundColor:'#ff8c00'}}>
				 		   call Android with callBack
				 		 </Text>
					</TouchableHighlight>

					<TouchableHighlight onPress={()=>this.onClickPromise()}>
				 		 <Text style={{textAlign:'center',
				 		 fontSize:20,color:'#fff',width:WINDOW_WIDTH-20,padding:5,
				 		 margin:5,backgroundColor:'#ff8c00'}}>
				 		  call Android with Promise
				 		 </Text>
					</TouchableHighlight>

					<TouchableHighlight onPress={()=>this.onClickPickerImage()}>
				 		 <Text style={{textAlign:'center',
				 		 fontSize:20,color:'#fff',width:WINDOW_WIDTH-20,padding:5,
				 		 margin:5,backgroundColor:'#ff8c00'}}>
				 		  call Android imagePicker
				 		 </Text>
					</TouchableHighlight>
					<TouchableHighlight onPress={()=>this.onShowWebview()}>
				 		 <Text style={{textAlign:'center',
				 		 fontSize:20,color:'#fff',width:WINDOW_WIDTH-20,padding:5,
				 		 margin:5,backgroundColor:'#00ced1'}}>
				 		  ShowWebview
				 		 </Text>
					</TouchableHighlight>
					<TouchableHighlight onPress={()=>this.onShowPanResponder()}>
				 		 <Text style={{textAlign:'center',
				 		 fontSize:20,color:'#fff',width:WINDOW_WIDTH-20,padding:5,
				 		 margin:5,backgroundColor:'#ffa07a'}}>
				 		  ShowPanResponder
				 		 </Text>
					</TouchableHighlight>
					<TouchableHighlight onPress={()=>this.onShowIMUI()}>
				 		 <Text style={{textAlign:'center',
				 		 fontSize:20,color:'#fff',width:WINDOW_WIDTH-20,padding:5,
				 		 margin:5,backgroundColor:'#cd5c5c'}}>
				 		  ShowIMUI
				 		 </Text>
					</TouchableHighlight>
					<TouchableHighlight onPress={()=>this.onShowVectorIcon()}>
				 		 <Text style={{textAlign:'center',
				 		 fontSize:20,color:'#fff',width:WINDOW_WIDTH-20,padding:5,
				 		 margin:5,backgroundColor:'#ff2822'}}>
				 		  ShowVectorIcon
				 		 </Text>
					</TouchableHighlight>
					<TouchableHighlight onPress={()=>this.onShowVideo()}>
				 		 <Text style={{textAlign:'center',
				 		 fontSize:20,color:'#fff',width:WINDOW_WIDTH-20,padding:5,
				 		 margin:5,backgroundColor:'#ff2822'}}>
				 		  ShowVideo
				 		 </Text>
					</TouchableHighlight>
					<TouchableHighlight  onPress={()=>this.onShowModal()}>
				 		 <Text style={{textAlign:'center',
				 		 fontSize:20,color:'#fff',width:WINDOW_WIDTH-20,padding:5,
				 		 margin:5,backgroundColor:'#a9a9a9'}}>
				 		  ShowModal
				 		 </Text>
					</TouchableHighlight>
					<TouchableHighlight onPress={()=>this.fetchTest()}>
				 		 <Text style={{textAlign:'center',
				 		 fontSize:20,color:'#fff',width:WINDOW_WIDTH-20,padding:5,
				 		 margin:5,backgroundColor:'#a9a9a9'}}>
				 		  Promise
				 		 </Text>
					</TouchableHighlight>
					<TouchableHighlight onPress={()=>this.progressBar()}>
				 		 <Text style={{textAlign:'center',
				 		 fontSize:20,color:'#fff',width:WINDOW_WIDTH-20,padding:5,
				 		 margin:5,backgroundColor:'#a9a9a9'}}>
				 		  ProgressBarAndroid
				 		 </Text>
					</TouchableHighlight>
					<TouchableHighlight>
				 		 <Text style={{textAlign:'center',
				 		 fontSize:20,color:'#fff',width:WINDOW_WIDTH-20,padding:5,
				 		 margin:5,backgroundColor:'#a9a9a9'}}>
				 		  ......
				 		 </Text>
					</TouchableHighlight>
					<TouchableHighlight>
				 		 <Text style={{textAlign:'center',
				 		 fontSize:20,color:'#fff',width:WINDOW_WIDTH-20,padding:5,
				 		 margin:5,backgroundColor:'#a9a9a9'}}>
				 		  ......
				 		 </Text>
					</TouchableHighlight>
				</ScrollView>
      </View>
		);
	}

	progressBar() {
		this.props.navigator.push({
			component: ProgressTest,
		})
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

	onShowPanResponder() {
		this.props.navigator.push({
			component: PanResponder,
		})
	}

	onShowIMUI() {
		this.props.navigator.push({
			component: IMUI,
		})
	}

	onShowVectorIcon() {
		this.props.navigator.push({
			component: VectorIcon,
		})
	}

	onShowWebview() {
		this.props.navigator.push({
			component: WebView,
		})
	}

	onShowVideo() {
		this.props.navigator.push({
			component: VideoPlayer,
		})
	}

	onShowModal() {
		this.props.navigator.push({
			component: ModalPage,
		})
	}

	fetchTest() {
		this.props.navigator.push({
			component: FetchPage,
		})
	}
}



export default Test;
