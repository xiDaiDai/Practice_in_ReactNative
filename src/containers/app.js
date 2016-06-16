import React, {
	Component
} from "react";
import {
	View,
	Text,
	Image,
	Navigator,
	StyleSheet,
	Dimensions
} from "react-native";
import MoviesScreen from './moviesScreen';
import MovieScreen from '../components/movieScreen';
import TabNavigator from 'react-native-tab-navigator';
import Test from './Test';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;


class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedTab: 'home'
		};

	}

	render() {
		let initialRoute = {
			name: 'movies',
			component: MoviesScreen
		}

		return (<TabNavigator
				tabBarStyle={{ height: 50,}}>
				  <TabNavigator.Item

				    selected={this.state.selectedTab === 'home'}
				    onPress={() => this.setState({ selectedTab: 'home' })}
				    title="DISCOVERY"
				    renderIcon={() => <Image  style={{height:30,width:30}} source={require('../images/dis.png')} />}
    				renderSelectedIcon={() => <Image  style={{height:30,width:30}} source={require('../images/dis.png')} />}
				     >
				    <Navigator
		              style={styles.container}
		              initialRoute={initialRoute}
		              configureScene={() => Navigator.SceneConfigs.PushFromRight}
		              renderScene={(route,navigator)=>this.renderScene(route,navigator)}/>
				  </TabNavigator.Item>
				  <TabNavigator.Item
					  selected={this.state.selectedTab === 'profile'}
					  onPress={() => this.setState({ selectedTab: 'profile' })}
					  renderIcon={() => <Image style={{height:30,width:30}} source={require('../images/mine.png')} />}
    				  renderSelectedIcon={() => <Image style={{height:30,width:30}} source={require('../images/mine.png')}/>}
				      title="MINE">
				    <View style={{flex:1,backgroundColor:'#fff',justifyContent:'center',alignItems:'center'}}>
				    	   <Test/>
				    </View>
				  </TabNavigator.Item>
				</TabNavigator>);
	}

	// 



	renderScene(route, navigator) {
		let Component = route.component;
		return <Component navigator={navigator} route={route} {...route.params}/>
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	}
});

export default App;