import "./MovieCard.css";
import MovieModal from "./MovieModal";
import PropTypes from "prop-types";
import { useState } from "react";

MovieCard.propTypes = {
    movieID: PropTypes.string.isRequired,
    movieData: PropTypes.object.isRequired,
    watched: PropTypes.array.isRequired,
    favorited: PropTypes.array.isRequired,
};

function MovieCard(props) {
    const [modalOpened, setModalOpened] = useState(false);

    const openModal = () => {
        setModalOpened(true);
    };

    const closeModal = () => {
        setModalOpened(false);
    };

    return (
        <div className="movie">
            <div className="movie-card" onClick={openModal}>
                <div className="movie-card-info">
                    <img src={props["movieData"]["poster_path"]} alt={props["movieData"]["img_alt"]} />
                    <h4 className="text">{props["movieData"]["title"]}</h4>
                    <p className="text">Rating: {props["movieData"]["vote_average"]}</p>
                </div>
            </div>

            <div className="modal" style={{ display: modalOpened ? "block" : "none" }}>
                <MovieModal
                    movieID={props["movieID"]}
                    modal={[modalOpened, closeModal]}
                    movieData={props["movieData"]}
                    watched={props["watched"]}
                    favorited={props["favorited"]}
                />
            </div>
        </div>
    );
}

export default MovieCard;
