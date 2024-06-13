import './MovieModal.css'
import propTypes from 'prop-types'
import { useState, useEffect } from 'react'
import api from '../../../../api'

MovieModal.propTypes = {
    movieID: propTypes.string.isRequired,
    backdropSrc: propTypes.string.isRequired,
    closeModal: propTypes.func.isRequired,
    movieTitle: propTypes.string.isRequired,
    movieImgSrc: propTypes.string.isRequired,
    movieImgAlt: propTypes.string.isRequired,
    movieOverview: propTypes.string.isRequired,
    movieReleaseDate: propTypes.string.isRequired,
    movieRating: propTypes.number.isRequired,
    modalOpened: propTypes.bool.isRequired
}

function MovieModal(props) {
    const [movieData, setMovieData] = useState({});
    const [trailerData, setTrailerData] = useState([]);

    const [tagline, setTagline] = useState("");
    const [genres, setGenres] = useState([]);
    const [runTime, setRunTime] = useState(-1);
    const [trailerID, setTrailerID] = useState("");

    const { fetchMovieData, fetchTrailerData } = api();

    useEffect(() => {
        fetchMovieData(props.movieID, setMovieData);
        fetchTrailerData(props.movieID, setTrailerData);
    }, [props.movieID]);

    useEffect(() => {
        if (Object.keys(movieData).length === 0) {
            return;
        }
        setTagline(movieData['tagline']);
        setGenres(movieData['genres']);
        setRunTime(movieData['runtime']);
    }, [movieData]);

    useEffect(() => {
        if (trailerData.length == 0) {
            return;
        }
        setTrailerID(trailerData[0]['key']);
    }
    , [trailerData]);


    return (
        <div className='modal-content modal-background-img' style={{background: 'url("' + props.backdropSrc + '")'}}>
            <div className='movie-content'>
                <div>
                    <div className='close' onClick={props.closeModal}>&times;</div>
                </div>
                <h1>{props.movieTitle}</h1>
                <section className='flex'>
                    <div>
                        <img className='modal-movie-img' src={props.movieImgSrc} alt={props.movieImgAlt}/>
                    </div>

                    <div className='movie-stat'>
                        <h3><b>{tagline}</b></h3>
                        <p><b>Overview: </b>{props.movieOverview}</p>               
                        <p><b>Release Date: </b>{props.movieReleaseDate}</p>
                        <p><b>Rating: </b>{props.movieRating}</p>
                        <p>
                            <b>Genres: </b> 
                            {
                                genres.map((genre) => {
                                    return (genre['name'] + ' ')
                                })
                            }
                        </p>

                        <p>
                            <b>Runtime: </b> {runTime} minutes
                        </p>
                        {
                            trailerID.length >= 1 && props.modalOpened ? 
                                <iframe src={"https://www.youtube.com/embed/" + trailerID}></iframe> : 
                                <p>Trailer not available</p>
                        }
                    </div>
                </section>
            </div>
        </div>
    )
}

export default MovieModal;