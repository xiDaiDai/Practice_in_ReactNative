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
  Modal,
  TouchableHighlight
} from "react-native";

class FetchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }

  componentDidMount() {
    this.get(global.LOGIN_URL + params, HttpConfig.JSON)
      .then((responseData) => {
        if (responseData.includes("status")) {
          // console.log("含有status字符串");
          let responseDa = JsonUtil.stringToJson(responseData);
          // Toast.show(responseData.status, "center");
          console.log(responseDa.status);
          console.log(responseDa);
          if (responseDa.status === 0) {
            dispatch(loginSuccess(responseDa));
          } else {
            dispatch(loginFail(responseDa));
            // ToastAndroid.show(responseData.description, 2000)
            Toast.show(responseDa.description, "center");
          }
        }

      }).catch((err) => {
        dispatch(loginError());
        // ToastAndroid.show("网络异常", 2000)
        Toast.show(err.message, "center");
      }).done();
  }

  post(url, data, hdata) {
    var fetchOptions = {
      method: 'POST',
      headers: hdata,
      body: data
    };
    return new Promise(function(resolve, reject) {
      fetch(url, fetchOptions)
        .then((response) => {
          resolve(response.text())
        })
        .catch((item) => {
          reject(item)
        });
    });
  }

  //get请求
  get(url, hdata) {
    var fetchOptions = {
      method: 'GET',
      headers: hdata
    };
    return new Promise(function(resolve, reject) {
      fetch(url, fetchOptions)
        .then((response) => {
          resolve(response.text())
        })
        .catch((item) => {
          reject(item)
        });
    });
  }
  render() {
    return (
      <View style={{flex:1,backgroundColor:'#F5FCFF'}}>
        <TouchableHighlight
              style={{height:50}}
              onPress={() => {}}
              underlayColor="#a9d9d4"
              >
          <Text style={{fontSize:20,color:'#000',flex:1,textAlign:'center'}}>click to show</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },

});

export default FetchPage;
