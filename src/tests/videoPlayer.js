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
} from "react-native";

// import Video from 'react-native-video';
// import {
//   Video
// } from 'react-native-media-kit';
import MyVideoPlayer from "./MyVideoPlayer";

const width = Dimensions.get('window').width;


class VideoPlayer extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }



  render() {


      return (
        <View style={styles.container}>
         /*<Video source={{uri: "http://renjk-video.oss-cn-hangzhou.aliyuncs.com/record/video/29198_20160725112904/1469524585.m3u8"}} // Can be a URL or a local file.
                   rate={1.0}                   // 0 is paused, 1 is normal.
                   volume={1.0}                 // 0 is muted, 1 is normal.
                   muted={false}                // Mutes the audio entirely.
                   paused={false}               // Pauses playback entirely.
                   resizeMode="cover"           // Fill the whole screen at aspect ratio.
                   repeat={true}                // Repeat forever.
                   playInBackground={false}     // Audio continues to play when app entering background.
                   playWhenInactive={false}     // [iOS] Video continues to play when control or notification center are shown.
                   style={styles.backgroundVideo} />*/
        </View>
      );
    }
    //upgrade react native version to 0.28+
    /*<Video
              style={{width: width, height: width / (16/9)}}
              src={'http://renjk-video.oss-cn-hangzhou.aliyuncs.com/record/video/29198_20160725112904/1469524585.m3u8'}
              autoplay={false}
              preload={'none'}
              loop={false}
              controls={true}
              muted={false}
              poster={'http://static.yoaicdn.com/shoppc/images/cover_img_e1e9e6b.jpg'}
            />*/

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
  },

});

export default VideoPlayer;
