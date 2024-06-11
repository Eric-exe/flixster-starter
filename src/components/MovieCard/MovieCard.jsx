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
            <div className="movie-card-info">
                <img src={props.movieImgSrc} alt={props.movieImgAlt}/>
                <h4 className="text">{props.movieTitle}</h4>
                <p className="text">Rating: {props.movieRating}</p>
            </div>
        </div>
    )
}

export default MovieCard;