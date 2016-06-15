import {
    errorOnReceivingMoving,
    retrievedMovies,
    retrievedMoreMovies
} from '../actions/index'

let API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/';
let API_KEYS = [
    '7waqfqbprs7pajbz28mqf6vz',
];

const getUrlForQuery = (pageNumber: number, queryNumber: number): string => {
    let apiKey = API_KEYS[queryNumber % API_KEYS.length];

    return (
        API_URL + 'lists/movies/in_theaters.json?apikey=' + apiKey +
        '&page_limit=10&page=' + pageNumber
    );

}

class MovieService {

    constructor() {
        this.queryNumber = 0;
        this.pageNumber = 1;
    }

    fetchMovies(dispatch) {


        let url = getUrlForQuery(this.pageNumber, this.queryNumber);
        fetch(url)
            .then((response) => response.json())
            .catch((error) => {
                dispatch(errorOnReceivingMoving());
            })
            .then((responseData) => {
                dispatch(retrievedMovies(responseData));
            }).done();
    }

    fetchNextPageMovies(dispatch) {
        this.pageNumber += 1;
        let url = getUrlForQuery(this.pageNumber, this.queryNumber);
        fetch(url)
            .then((response) => response.json())
            .catch((error) => {
                dispatch(errorOnReceivingMoving());
            })
            .then((responseData) => {
                dispatch(retrievedMoreMovies(responseData));
            }).done();
    }


}

export default new MovieService();