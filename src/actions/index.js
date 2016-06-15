import * as type from '../constants/type';

import movieService from '../middleware/movieService'

export const fetchMovies = (): Object => {
  return {
    type: type.FETCHING_MOVIES
  }
}

export const fetchNextPageMovies = (): Object => {
  return {
    type: type.FETCHING_NEXT_PAGE_MOVIES
  }
}

export const searchMovies = (): Function => {
  return (dispatch) => {
    dispatch(fetchMovies());
    movieService.fetchMovies(dispatch);
  };
};


export const getNextPageMoives = (): Function => {
  return (dispatch) => {
    dispatch(fetchNextPageMovies());
    movieService.fetchNextPageMovies(dispatch);
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

export const retrievedMoreMovies = (data: Object): Object => {
  return {
    type: type.RECEIVED_MORE_DATA,
    data
  };
};