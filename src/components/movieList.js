import React, {
	Component
} from "react"
import {
	connect
} from "react-redux";
import MovieItem from './movieItem';
import MovieScreen from './movieScreen';
import {
	StyleSheet,
	View,
	Text,
	ListView,
	Platform,
	ProgressBarAndroid,
	ToastAndroid
} from "react-native";

class MovieList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2,
			}),
		};

	}

	render() {
		let {
			movies
		} = this.props;
		let content = <ListView ref = "listview"
		dataSource = {this.state.dataSource.cloneWithRows(movies)}
		renderRow = {(item) => this.renderRow(item)}
		enableEmptySections={true}
		automaticallyAdjustContentInsets = {false}
		keyboardDismissMode = "on-drag"
		keyboardShouldPersistTaps = {true}
		showsVerticalScrollIndicator = {false}/>;
		return (<View style={styles.container}>{content}</View>)
	}

	renderRow(movie) {
		// ToastAndroid.show(movie.title, 3000);
		return (
			<MovieItem
		            onSelect={()=>this.selectMovie(movie)}
		            movie={movie}/>
		);
	}

	selectMovie(movie) {
		ToastAndroid.show(movie.title, 3000);
		this.props.navigator.push({
			name: 'movie',
			component: MovieScreen,
			movie: movie

		});

	}


}


var styles = StyleSheet.create({
	container: {
		flex: 1
	},
	scrollSpinner: {
		marginVertical: 20,
	},
	rowSeparator: {
		backgroundColor: 'rgba(0, 0, 0, 0.1)',
		height: 1,
		marginLeft: 4,
	},
	rowSeparatorHide: {
		opacity: 0.0,
	},
});


export default MovieList;