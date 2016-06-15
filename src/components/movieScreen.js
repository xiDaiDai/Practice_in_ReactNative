'use strict';

import React, {
	Component
} from 'react'
import {
	Image,
	Platform,
	StyleSheet,
	Text,
	View
} from 'react-native';


class MovieScreen extends Component {

	render() {
		return (
			<View style={{flex:1,justifyContent:'center',backgroundColor:'#eee'}}>
          <View style={styles.row}>
		<Image
              source={{uri:this.props.route.movie.posters.original}}
            
              style={styles.cellImage}
            />
            <View style={styles.textContainer}>
              <Text style={styles.movieTitle} numberOfLines={2}>
                {this.props.route.movie.title}
              </Text>
              <Text style={styles.movieYear} numberOfLines={1}>
                {this.props.route.movie.year}
              </Text>

              <Text style={styles.movieTitle}>
                {this.props.route.movie.synopsis}
              </Text>
            </View>
          </View>
      </View>
		);
	}
}


var styles = StyleSheet.create({
	textContainer: {
		flex: 1,
		alignItems: 'center',
		padding: 10
	},
	movieTitle: {
		flex: 1,
		fontSize: 16,
		fontWeight: '500',
		marginBottom: 2,
	},
	movieYear: {
		color: '#999999',
		fontSize: 12,
	},
	row: {
		alignItems: 'center',
		backgroundColor: '#eee',
		flexDirection: 'column',
		padding: 5,
	},
	cellImage: {
		backgroundColor: '#dddddd',
		height: 186,
		marginRight: 10,
		width: 120,
	},
	cellBorder: {
		backgroundColor: 'rgba(0, 0, 0, 0.1)',
		height: StyleSheet.hairlineWidth,
		marginLeft: 4,
	},
});

export default MovieScreen;