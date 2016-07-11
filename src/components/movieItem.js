'use strict';

import React, {
  Component,
  PropTypes
} from 'react'
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View
} from 'react-native';


class MovieItem extends Component {

  render() {
    var TouchableElement = TouchableNativeFeedback;
    return (

      <TouchableElement
          onPress={this.props.onSelect}>
          <View style={styles.row}>
             <Image
              source={{uri:this.props.movie.posters.thumbnail}}
              style={styles.cellImage}
            />
            <View style={styles.textContainer}>
            <Text style={styles.movieYear} numberOfLines={1}>
                {this.props.movie.year}
              </Text>
              <Text style={styles.movieTitle} numberOfLines={2}>
                {this.props.movie.title}
              </Text>
              
            </View>
           
          </View>
        </TouchableElement>

    );
  }
}

MovieItem.propTypes = {
  movie: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
}


var styles = StyleSheet.create({
  textContainer: {
    flex: 1,
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
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 5,
  },
  cellImage: {
    backgroundColor: '#dddddd',
    height: 93,
    marginRight: 10,
    width: 60,
  },
  cellBorder: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: StyleSheet.hairlineWidth,
    marginLeft: 4,
  },
});

export default MovieItem;