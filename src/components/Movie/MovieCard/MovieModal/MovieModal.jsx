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
    movieGenres: propTypes.array.isRequired,
    modalOpened: propTypes.bool.isRequired
}

function MovieModal(props) {
    const [movieData, setMovieData] = useState([])
    const [trailerData, setTrailerData] = useState([])

    const { fetchMovieData, fetchTrailerData } = api();

    useEffect(() => {
        fetchMovieData(props.movieID, setMovieData);
        fetchTrailerData(props.movieID, setTrailerData);
    }, [props.movieID]);

    let tagline = "";
    let genres = [];
    let runTime = -1;
    let trailerID = "";

    if (movieData !== undefined) {
        if (Object.prototype.hasOwnProperty.call(movieData, 'tagline')) tagline = movieData['tagline'];
        if (Object.prototype.hasOwnProperty.call(movieData, 'genres')) genres = movieData['genres'];
        if (Object.prototype.hasOwnProperty.call(movieData, 'runtime')) runTime = movieData['runtime'];
        if (trailerData.length >= 1) trailerID = trailerData[0]['key'];
    }

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