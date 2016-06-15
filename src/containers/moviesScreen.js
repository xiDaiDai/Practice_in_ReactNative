import MovieList from '../components/movieList'
import {
	connect
} from 'react-redux'
import {
	searchMovies,
	getNextPageMoives,
} from '../actions/index'

import React, {
	Component,
	PropTypes

} from 'react';
import {
	View,
	StyleSheet
} from 'react-native';

class MoviesScreen extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.searchMovies();
	}

	render() {
		const {
			movies,
			isLoading
		} = this.props;

		return (
			<View style={styles.container}>
		<MovieList ref="movieList" {...this.props} getNext={()=>this.getNextPageMoives()}>
            </MovieList>

          </View>
		);
	}

	getNextPageMoives() {
		this.props.getNextPageMoives();
	}
}

MoviesScreen.propTypes = {
	movies: PropTypes.array.isRequired,
	isLoading: PropTypes.bool.isRequired,
	hasMoviesToDisplay: PropTypes.bool.isRequired,
	isLoadingTail: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
	return {
		movies: state.movies,
		isLoading: state.isLoading,
		hasMoviesToDisplay: state.hasMoviesToDisplay,
		isLoadingTail: state.isLoadingTail
	};
}


function mapDispatchToProps(dispatch) {
	return {
		searchMovies: () => dispatch(searchMovies()),
		getNextPageMoives: () => dispatch(getNextPageMoives()),
	};
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviesScreen);