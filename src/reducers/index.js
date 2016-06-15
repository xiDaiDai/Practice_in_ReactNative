import React from 'react';
import {
  combineReducers
} from "redux";
import * as types from "../constants/type";

const initialState = {
  isLoading: false,
  isLoadingTail: false,
  hasMoviesToDisplay: false,
  movies: []
}

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCHING_MOVIES:

      return {
        ...state,
        isLoading: true,
      };

    case types.FETCHING_NEXT_PAGE_MOVIES:

      return {
        ...state,
        isLoadingTail: true,
      };

    case types.ERROR_GETTING_MOVIES:
      return {
        ...state,
        isLoading: false,
        isLoadingTail: false,
        movies: []
      };

    case types.RECEIVED_DATA:
      return {
        ...state,
        isLoading: false,
        isLoadingTail: false,
        hasMoviesToDisplay: action.data.total != action.data.movies.length,
        movies: action.data.movies
      };

    default:
      return state;
  }
};

/*const rootReducer = combineReducers({
  movieData: movieReducer
});*/

export default movieReducer;