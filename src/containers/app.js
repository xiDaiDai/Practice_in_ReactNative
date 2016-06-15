import React, {
	Component
} from "react";
import {
	Navigator,
	StyleSheet
} from "react-native";
import MoviesScreen from './moviesScreen';
import MovieScreen from '../components/movieScreen';


class App extends Component {

	render() {
		let initialRoute = {
			name: 'movies',
			component: MoviesScreen
		}
		return (<Navigator
              style={styles.container}
              initialRoute={initialRoute}
              configureScene={() => Navigator.SceneConfigs.PushFromRight}
              renderScene={(route,navigator)=>this.renderScene(route,navigator)}/>);
	}



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