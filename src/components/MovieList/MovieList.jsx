import './MovieList.css'
import MovieCard from '../MovieCard/MovieCard'

function MovieList(props) {
    let movies = []
    movies = props['data']['results'];
    console.log(props['data']['results'])
    
    return (
        <div className="movie-card-container">
        {/* {
            movies.map(movie => {
                return (
                    <MovieCard
                        movieImgSrc=""
                        movieImgAlt=""
                        movieTitle={movie['original_title']}
                        movieRating={0}
                    />
                )
            })
        } */}
        </div>
    )
}

export default MovieList;
