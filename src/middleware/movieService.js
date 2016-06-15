import {
    errorOnReceivingMoving,
    retrievedMovies
} from '../actions/index'

var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/';
var API_KEYS = [
    '7waqfqbprs7pajbz28mqf6vz',
    // 'y4vwv8m33hed9ety83jmv52f', Fallback api_key
];

const getUrlForQuery = (pageNumber: number, queryNumber: number): string => {
    var apiKey = API_KEYS[queryNumber % API_KEYS.length];

    return (
        API_URL + 'lists/movies/in_theaters.json?apikey=' + apiKey +
        '&page_limit=20&page=' + pageNumber
    );

}

class MovieService {

    constructor() {
        this.queryNumber = 0;
    }

    fetchMovies(dispatch) {
        this.queryNumber += 1;
        var pageNumber = 1;
        var url = getUrlForQuery(pageNumber, this.queryNumber);
        fetch(url)
            .then((response) => response.json())
            .catch((error) => {
                dispatch(errorOnReceivingMoving());
            })
            .then((responseData) => {
                dispatch(retrievedMovies(responseData));
            }).done();


    }


}

export default new MovieService();