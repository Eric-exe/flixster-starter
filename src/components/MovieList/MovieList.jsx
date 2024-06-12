import './MovieList.css'
import MovieCard from '../MovieCard/MovieCard'
import PropTypes from 'prop-types'

MovieList.propTypes = {
    movies: PropTypes.array.isRequired,
}

function MovieList(props) {
    let movies = props.movies;

    return (
        <>
            <section className="movie-card-container">
            {
                movies.map((movie) => {
                    return (
                        <MovieCard
                            key={movie['id']}
                            movieID={movie['id'].toString()}
                            movieImgSrc={movie['poster_path'] == null ? 
                                'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/144694078/original/42073354247a976027d92a56ded126bc59235d60/send-you-a-random-png.png'
                                : 'https://image.tmdb.org/t/p/w1280' + movie['poster_path']}
                            movieBackdropSrc={movie['backdrop_path'] == null ?
                                'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/144694078/original/42073354247a976027d92a56ded126bc59235d60/send-you-a-random-png.png'
                                : 'https://image.tmdb.org/t/p/w1280' + movie['backdrop_path']}
                            movieImgAlt={'Image of ' + movie['title']}
                            movieTitle={movie['title']}
                            movieRating={movie['vote_average']}
                            movieOverview={movie['overview']}
                            movieReleaseDate={movie['release_date']}
                            movieGenres={movie['genre_ids']}
                        />
                    );
                })
            }
            </section>
        </>
    );
}

export default MovieList;
