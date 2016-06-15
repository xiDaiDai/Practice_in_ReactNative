import * as type from '../constants/type';

import movieService from '../middleware/movieService'

export const fetchMovies = (): Object => {
  return {
    type: type.FETCHING_MOVIES
  }
}

export const searchMovies = (): Function => {
  return (dispatch) => {
    dispatch(fetchMovies());
    movieService.fetchMovies(dispatch);
  };
};


export const errorOnReceivingMoving = (): Object => {
  return {
    type: type.ERROR_GETTING_MOVIES,
  };
};

export const retrievedMovies = (data: Object): Object => {
  return {
    type: type.RECEIVED_DATA,
    data
  };
};