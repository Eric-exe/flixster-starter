import "./BrowseMode.css";
import propTypes from "prop-types";
import { useState } from "react";

const GENRE_TO_ID = {
    "Action": 28,
    "Adventure": 12,
    "Animation": 16,
    "Comedy": 35,
    "Crime": 80,
    "Documentary": 99,
    "Drama": 18,
    "Family": 10751,
    "Fantasy": 14,
    "History": 36,
    "Horror": 27,
    "Music": 10402,
    "Mystery": 9648,
    "Romance": 10749,
    "Science Fiction": 878,
    "TV Movie": 10770,
    "Thriller": 53,
    "War": 10752,
    "Western": 37,
};

// default values, used if no date or rating is selected
const MIN_DATE = "0000-01-01";
const MAX_DATE = "9999-12-31";
const MIN_RATING = -1;
const MAX_RATING = 11;

BrowseMode.propTypes = {
    searchMode: propTypes.bool.isRequired,
    apiSetFunct: propTypes.func.isRequired,
};

function BrowseMode(props) {
    const [genreModalOpened, setGenreModalOpened] = useState(false);

    const handleSortChange = (event) => {
        props.apiSetFunct((oldApiReqData) => {
            return {
                ...oldApiReqData,
                "filterMode": true,
                "page": 1,
                "sortMode": event.target.value,
            };
        });
    };

    const handleGenreChange = (event) => {
        props.apiSetFunct((oldApiReqData) => {
            let newGenreSet = oldApiReqData["genres"];
            if (newGenreSet === undefined) newGenreSet = new Set();
            if (event.target.checked) {
                newGenreSet.add(event.target.value);
            } else {
                newGenreSet.delete(event.target.value);
            }
            return {
                ...oldApiReqData,
                "filterMode": true,
                "page": 1,
                "genres": newGenreSet
            };
        });
    };

    const openGenreModal = () => {
        setGenreModalOpened(true);
    };

    const closeGenreModal = () => {
        setGenreModalOpened(false);
    };

    const updateRange = (min, max, value, isMin, valueID) => {
        // sanity check: when users empty in empty values, use default min/max
        if (value == "") {
            value = isMin ? min : max;
        }
        props.apiSetFunct((oldApiReqData) => ({
            ...oldApiReqData,
            "filterMode": true, 
            "page": 1,
            [valueID]: isMin ? [value, oldApiReqData[valueID][1]] : [oldApiReqData[valueID][0], value]
        }));
    };          

    const updateMinDate = (event) => {
        updateRange(MIN_DATE, MAX_DATE, event.target.value, true, "dateRange");
    };

    const updateMaxDate = (event) => {
        updateRange(MIN_DATE, MAX_DATE, event.target.value, false, "dateRange");
    };

    const updateMinRating = (event) => {
        updateRange(MIN_RATING, MAX_RATING, event.target.value, true, "ratingRange");
    };

    const updateMaxRating = (event) => {
        updateRange(MIN_RATING, MAX_RATING, event.target.value, false, "ratingRange");
    };

    return (
        <div
            className="center-v browse-bar"
            style={{ display: props.searchMode ? "none" : "block" }}
        >
            {
                props.searchMode ? 
                <></> :
                <span className="center-v">
                    <label htmlFor="sort-dropdown">Sort by: &nbsp;</label>
                    <select id="sort-dropdown" onChange={handleSortChange}>
                    <option disabled selected>-- Select --</option>
                    <option value="popularity.desc">Popularity Descending</option>
                    <option value="popularity.asc">Popularity Ascending</option>
                    <option value="title.asc">A-Z</option>
                    <option value="title.desc">Z-A</option>
                    <option value="primary_release_date.desc">Latest Release</option>
                    <option value="primary_release_date.asc">Earliest Release</option>
                    <option value="vote_average.desc">Rating Descending</option>
                    <option value="vote_average.asc">Rating Ascending</option>
                    </select>
                </span>
            }

            <button className="button" onClick={openGenreModal}>
                Genres
            </button>

            <span className="center-v browse-item">
                <span className="nowrap">
                    Rating Range:&nbsp;
                </span>
                <span className="nowrap">
                    <input type="number" min="0" max="10" onChange={updateMinRating}></input>
                    &nbsp;-&nbsp;
                    <input type="number" min="0" max="10" onChange={updateMaxRating}></input>
                </span>
            </span>

            <span className="center-v browse-item nowrap">
                <span className="nowrap">
                    Release Date:&nbsp;
                </span>
                <span className="nowrap">
                    <input type="date" onChange={updateMinDate}></input>
                    &nbsp;-&nbsp;
                    <input type="date" onChange={updateMaxDate}></input>
                </span>
            </span>

            <div
                className="modal"
                style={{ display: genreModalOpened ? "block" : "none" }}
            >
                <div className="browse-modal-content">
                    <div>
                        <div className="close" onClick={closeGenreModal}>
                            &times;
                        </div>
                    </div>

                    {
                        props.searchMode ? 
                        <></> :
                        <section>
                            <h3 className="genre-text">Genres</h3>
                            {Object.entries(GENRE_TO_ID).map((genre, index) => {
                                return (
                                    <div key={index}>
                                        <input 
                                            type="checkbox" 
                                            id={"genre-" + genre[1]} 
                                            name={genre[1]} 
                                            value={genre[1]} 
                                            onChange={handleGenreChange}
                                        />
                                        <label htmlFor={"genre-" + genre[1]} className="genre-text">{genre[0]}</label>
                                        <br/>
                                    </div>
                                );
                            })}
                        </section>
                    }
                </div>
            </div>
        </div>
    );
}

export default BrowseMode;
