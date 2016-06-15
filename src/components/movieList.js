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
			movies,
			loadMoreMovies
		} = this.props;


		let content = <ListView ref = "listview"
		dataSource = {this.state.dataSource.cloneWithRows(movies)}
		renderRow = {(item) => this.renderRow(item)}
		onEndReached={this.props.getNext}
		renderFooter={()=>this.renderFooter()}
		enableEmptySections={true}
		automaticallyAdjustContentInsets = {false}
		keyboardDismissMode = "on-drag"
		keyboardShouldPersistTaps = {true}
		 />;
		return (<View style={styles.container}>{content}</View>)
	}

	renderRow(movie) {
		return (
			<MovieItem
		            onSelect={()=>this.selectMovie(movie)}
		            movie={movie}/>
		);
	}

	renderFooter() {

		if (this.props.isLoadingTail) {
			return (
				<View  style={{alignItems: 'center',justifyContent:'center'}}>
				  <ProgressBarAndroid styleAttr="Inverse"/>
                  <Text style={{fontSize:16,color:'#000'}}>loading......</Text>
                </View>
			);

		}

		return <View style={styles.scrollSpinner} />;

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
});


export default MovieList;