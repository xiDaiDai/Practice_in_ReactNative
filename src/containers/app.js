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
import codePush from "react-native-code-push";

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
import Icon from 'react-native-vector-icons/FontAwesome';


class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedTab: 'home'
		};

	}


	componentDidMount() {
		codePush.sync();
	}

	render() {
		let initialRoute = {
			name: 'movies',
			component: MoviesScreen
		}

		return (<TabNavigator
				tabBarStyle={{ height: 55,}}>
				  <TabNavigator.Item

				    selected={this.state.selectedTab === 'home'}
				    onPress={() => this.setState({ selectedTab: 'home' })}
				    title="Top100"
				    renderIcon={() => <Icon name="heartbeat" size={30} color="#444"/>}
    				renderSelectedIcon={() => <Icon name="heartbeat" size={30} color="#f00"/>}
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
					  renderIcon={() => <Icon name="chrome" size={30} color="#444"/>}
						renderSelectedIcon = {() => <Icon name="chrome" size={30} color="#f00"/>} title = "CodePush" >
				    <Navigator
		              style={styles.container}
		              initialRoute={{component: Test}}
		              configureScene={() => Navigator.SceneConfigs.PushFromRight}
		              renderScene={(route,navigator)=>this.renderScene(route,navigator)}/>
				  </TabNavigator.Item>
				</TabNavigator>);
	}

	// <Image style={{height:30,width:30}} source={require('../images/mine.png')} />



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
