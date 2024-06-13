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
    modalOpened: propTypes.bool.isRequired,
    watchedFavorited: propTypes.array.isRequired // [watched set, watched funct, favorited set, favorited funct]
}

function MovieModal(props) {
    // data returned from their respective API requests, 
    const [movieData, setMovieData] = useState({});
    const [trailerData, setTrailerData] = useState([]);

    // modal info from above API request
    const [tagline, setTagline] = useState("");
    const [genres, setGenres] = useState([]);
    const [runTime, setRunTime] = useState(-1);
    const [trailerID, setTrailerID] = useState("");

    // local watched/favorited, handles button color
    const [isWatched, setIsWatched] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);

    const { fetchMovieData, fetchTrailerData } = api();

    // update movie data whenever movieID is updated 
    // to reflect new movie info
    useEffect(() => {
        fetchMovieData(props.movieID, setMovieData);
        fetchTrailerData(props.movieID, setTrailerData);

        // update watched / favorited
        setIsWatched(props.watchedFavorited[0].has(props.movieID));
        setIsFavorited(props.watchedFavorited[2].has(props.movieID));
    }, [props.movieID]);

    // update movie info when api data is updated
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


    const updateItem = (itemSet, itemFunct, item, toRemove) => {
        let oldSet = itemSet;
        if (toRemove) {
            if (oldSet.has(item)) {
                oldSet.delete(item);
            }
        }
        else {
            oldSet.add(item);
        }
        itemFunct(oldSet);
    }

    // update global watched/favorited set when local values are updated
    useEffect(() => {
        updateItem(props.watchedFavorited[0], props.watchedFavorited[1], props.movieID, !isWatched);
    }, [isWatched]);

    useEffect(() => {
        updateItem(props.watchedFavorited[2], props.watchedFavorited[3], props.movieID, !isFavorited);
    }, [isFavorited]);

    const setWatched = () => {
        setIsWatched((oldIsWatched) => !oldIsWatched);
    }

    const setFavorited = () => {
        setIsFavorited((oldIsFavorited) => !oldIsFavorited);
    }

    return (
        <div className='modal-content modal-background-img' style={{background: 'url("' + props.backdropSrc + '") no-repeat'}}>
            <div className='movie-content'>
                <div>
                    <div className='close' onClick={props.closeModal}>&times;</div>
                </div>
                <h1>{props.movieTitle}</h1>
                <section className='flex'>
                    <div className='modal-left'>
                        <img className='modal-movie-img' src={props.movieImgSrc} alt={props.movieImgAlt}/>
                        <div className='flex-center'>
                            <button className={'button modal-button ' + (isWatched ? 'background-green' : '')} onClick={setWatched}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="center-v" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                </svg>
                                &nbsp;{'Watch' + (isWatched ? 'ed' : '')}
                            </button>
                        </div>
                        <div className='flex-center'>
                            <button className={'button modal-button ' + (isFavorited ? 'background-red' : '')} onClick={setFavorited}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="center-v" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                                </svg>
                                &nbsp;{'Favorite' + (isFavorited ? 'd' : '')}
                            </button>
                        </div>
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