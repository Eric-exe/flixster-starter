import './MovieCard.css'
import MovieModal from './MovieModal'
import PropTypes from "prop-types"
import { useState } from "react"
 
MovieCard.propTypes = {
    movieID: PropTypes.string.isRequired,
    movieImgSrc: PropTypes.string.isRequired,
    movieBackdropSrc: PropTypes.string.isRequired,
    movieImgAlt: PropTypes.string.isRequired,
    movieTitle: PropTypes.string.isRequired,
    movieRating: PropTypes.number.isRequired,
    movieOverview: PropTypes.string.isRequired,
    movieReleaseDate: PropTypes.string.isRequired,
    watched: PropTypes.array.isRequired,
    favorited: PropTypes.array.isRequired
}

function MovieCard(props) {
    const [modalOpened, setModalOpened] = useState(false);

    const openModal = () => {
        setModalOpened(true);
    }

    const closeModal = () => {
        setModalOpened(false);
    }

    return (
        <div className="movie">
            <div className='movie-card' onClick={openModal}>
                <div className='movie-card-info'>
                    <img src={props.movieImgSrc} alt={props.movieImgAlt}/>
                    <h4 className='text'>{props.movieTitle}</h4>
                    <p className='text'>Rating: {props.movieRating}</p>
                </div>
            </div>

            <div className='modal' style={{display: modalOpened ? 'block' : 'none'}}>
                <MovieModal
                    movieID={props.movieID}
                    closeModal={closeModal}
                    movieTitle={props.movieTitle}
                    backdropSrc={props.movieBackdropSrc}
                    movieImgSrc={props.movieImgSrc}
                    movieImgAlt={props.movieImgAlt}
                    movieOverview={props.movieOverview}
                    movieReleaseDate={props.movieReleaseDate}
                    movieRating={props.movieRating}
                    modalOpened={modalOpened}
                    watched={props.watched}
                    favorited={props.favorited}
                />
            </div>
        </div>
    );
}

export default MovieCard;