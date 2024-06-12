import './BrowseMode.css';
import propTypes from 'prop-types';
import { useState } from 'react';

const GENRE_TO_ID = {
    'Action': 28,
    'Adventure': 12,
    'Animation': 16,
    'Comedy': 35,
    'Crime': 80,
    'Documentary': 99,
    'Drama': 18,
    'Family': 10751,
    'Fantasy': 14,
    'History': 36,
    'Horror': 27,
    'Music': 10402,
    'Mystery': 9648,
    'Romance': 10749,
    'Science Fiction': 878,
    'TV Movie': 10770,
    'Thriller': 53,
    'War': 10752,
    'Western': 37
}

BrowseMode.propTypes = {
    searchMode: propTypes.bool.isRequired,
}

function BrowseMode(props) {
    const [genres, setGenres] = useState([]);
    const [genreModalOpened, setGenreModalOpened] = useState(false);

    const openGenreModal = () => {
        setGenreModalOpened(true);
    }

    const closeGenreModal = () => {
        setGenreModalOpened(false);
    }

    const updateMinDate = (event) => {
        console.log(event.target.value);
    }

    return (
        <div className='center-v browse-bar' style={{display: (props.searchMode ? 'none' : 'flex')}}>
            <button className='button' onClick={openGenreModal}>Genres</button>

            <div className='center-v browse-item'>
                Rating Range:&nbsp;
                <input type='number' min='0' max='10'></input> 
                &nbsp;-&nbsp;
                <input type='number' min='0' max='10'></input>
            </div>

            <div className='center-v browse-item'>
                Release Date:&nbsp;
                <input type='date' onChange={updateMinDate}></input> 
                &nbsp;-&nbsp;
                <input type='date'></input>
            </div>

            <div className='modal' style={{display: (genreModalOpened ? 'block' : 'none')}}>
                <div className='browse-modal-content'>

                    <div>
                        <div className='close' onClick={closeGenreModal}>&times;</div>
                    </div>

                    <section>
                        <h3 className='genre-text'>Genres</h3>
                        {
                            Object.entries(GENRE_TO_ID).map((genre, index) => {
                                return (
                                    <>
                                        <input key={index} type='checkbox' id={'genre-' + genre[1]} name={genre[1]} value={genre[1]}/>
                                        <label htmlFor={'genre-' + genre[1]} className='genre-text'>{genre[0]}</label><br/>
                                    </>
                                );
                            })
                        }
                    </section>
                </div>
            </div>
        </div>
    );
}

export default BrowseMode;