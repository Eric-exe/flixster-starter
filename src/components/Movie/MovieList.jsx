import './MovieList.css'
import MovieCard from './MovieCard'
import PropTypes from 'prop-types'

MovieList.propTypes = {
    movies: PropTypes.array.isRequired,
    watched: PropTypes.array.isRequired,
    favorited: PropTypes.array.isRequired
}

function MovieList(props) {
    let movies = props.movies;

    let badLink = 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/144694078/original/42073354247a976027d92a56ded126bc59235d60/send-you-a-random-png.png';
    return (
        <>
            <section className="movie-card-container">
            {
                movies.map((movie, index) => {
                    return (
                        <MovieCard
                            key={index}
                            movieID={movie['id'].toString()}
                            movieImgSrc={movie['poster_path'] == null ? 
                                badLink
                                : 'https://image.tmdb.org/t/p/w1280' + movie['poster_path']}
                            movieBackdropSrc={movie['backdrop_path'] == null ?
                                badLink
                                : 'https://image.tmdb.org/t/p/w1280' + movie['backdrop_path']}
                            movieImgAlt={'Image of ' + movie['title']}
                            movieTitle={movie['title']}
                            movieRating={movie['vote_average']}
                            movieOverview={movie['overview']}
                            movieReleaseDate={movie['release_date']}
                            watched={props.watched}
                            favorited={props.favorited}
                        />
                    );
                })
            }
            </section>
        </>
    );
}

export default MovieList;
