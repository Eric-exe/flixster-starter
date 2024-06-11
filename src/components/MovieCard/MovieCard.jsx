import './MovieCard.css'
import PropTypes from "prop-types"

MovieCard.propTypes = {
    movieImgSrc: PropTypes.string.isRequired,
    movieImgAlt: PropTypes.string.isRequired,
    movieTitle: PropTypes.string.isRequired,
    movieRating: PropTypes.number.isRequired,
}

function MovieCard(props) {
    return (
        <div className="movie-card">
            <img src={props.movieImgSrc} alt={props.movieImgAlt}/>
            <div className="movie-card-info">
                <p><b>{props.movieTitle}</b></p>
                <p>Rating: {props.movieRating}</p>
            </div>
        </div>
    )
}

export default MovieCard;