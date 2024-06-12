import { useEffect, useState } from "react";
import "./App.css";
import BrowseMode from "./components/BrowseMode/BrowseMode";
import SearchMode from "./components/SearchMode/SearchMode";
import MovieList from "./components/Movie/MovieList/MovieList";
import api from "./api";

const DEFAULT_API_REQ_DATA = {
    search: "",
    page: 1,
    filters: 0, // if not 0, there is at least 1 filter, handle that
    genres: [],
    dateRange: [Date(-8640000000000000), Date(8640000000000000)],
    ratingRange: [0, 10],
};

const SORT_MODES = {
    None: 0,
    RatingDesc: 1,
    RatingAsc: 2,
    "A-Z": 3,
    "Z-A": 4,
    Latest: 5,
    Earliest: 6,
};

function App() {
    const [movieData, setMovieData] = useState([]);
    const [apiReqData, setApiReqData] = useState(DEFAULT_API_REQ_DATA);
    const [searchMode, setSearchMode] = useState(false); // [false: now playing, true: search
    const [sortMode, setSortMode] = useState(0);

    const { fetchPageData, fetchSearchData } = api();
    // =================================================================================
    // handle when user requests new data
    useEffect(() => {
        if (apiReqData["search"] == "") {
            if (apiReqData["filters"] == 0) {
                setSearchMode(false);
                fetchPageData(
                    apiReqData["page"],
                    apiReqData["page"] != 1,
                    setMovieData
                );
            } else {
                console.log("HI");
            }
        } else {
            setSearchMode(true);
            fetchSearchData(
                apiReqData["search"],
                apiReqData["page"],
                apiReqData["page"] != 1,
                setMovieData
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiReqData]);

    // sort movie data based on sort mode
    useEffect(() => {
        switch (sortMode) {
            case SORT_MODES["None"]:
                break;

            case SORT_MODES["RatingDesc"]:
                setMovieData((oldData) =>
                    [...oldData].sort(
                        (a, b) => b["vote_average"] - a["vote_average"]
                    )
                );
                break;

            case SORT_MODES["RatingAsc"]:
                setMovieData((oldData) =>
                    [...oldData].sort(
                        (a, b) => a["vote_average"] - b["vote_average"]
                    )
                );
                break;

            case SORT_MODES["A-Z"]:
                setMovieData((oldData) =>
                    [...oldData].sort((a, b) =>
                        a["title"].localeCompare(b["title"])
                    )
                );
                break;

            case SORT_MODES["Z-A"]:
                setMovieData((oldData) =>
                    [...oldData].sort((a, b) =>
                        b["title"].localeCompare(a["title"])
                    )
                );
                break;

            case SORT_MODES["Latest"]:
                setMovieData((oldData) =>
                    [...oldData].sort(
                        (a, b) =>
                            new Date(b["release_date"]) -
                            new Date(a["release_date"])
                    )
                );
                break;

            case SORT_MODES["Earliest"]:
                setMovieData((oldData) =>
                    [...oldData].sort(
                        (a, b) =>
                            new Date(a["release_date"]) -
                            new Date(b["release_date"])
                    )
                );
                break;

            default:
                break;
        }
    }, [sortMode]);

    // =================================================================================

    // helper functions
    const loadMore = () => {
        setApiReqData({
            search: apiReqData["search"],
            page: apiReqData["page"] + 1,
            filters: apiReqData["filters"],
            genres: [],
            dateRange: apiReqData["dateRange"],
            ratingRange: apiReqData["ratingRange"],
        });
    };

    const updateSearchMode = (mode) => {
        setSearchMode(mode);
    };

    const handleSortChange = (event) => {
        setSortMode(SORT_MODES[event.target.value]);
    };

    // =================================================================================
    return (
        <>
            <header>
                <div>
                    <h1>Flixster</h1>
                </div>
            </header>
            <main>
                <div id="filters">
                    <div className="flex center-v">
                        <div
                            className={
                                "button " + (searchMode ? "" : "button-active")
                            }
                            onClick={() => {
                                updateSearchMode(false);
                                setApiReqData(DEFAULT_API_REQ_DATA);
                            }}
                        >
                            Now Playing
                        </div>
                        <div
                            className={
                                "button " + (searchMode ? "button-active" : "")
                            }
                            onClick={() => updateSearchMode(true)}
                        >
                            Search
                        </div>
                    </div>

                    <div className="center-v">
                        <label htmlFor="sort-dropdown">Sort by: &nbsp;</label>
                        <select id="sort-dropdown" onChange={handleSortChange}>
                            <option value="None">None</option>
                            <option value="RatingDesc">Rating Descending</option>
                            <option value="RatingAsc">Rating Ascending</option>
                            <option value="A-Z">A-Z</option>
                            <option value="Z-A">Z-A</option>
                            <option value="Latest">Latest Release</option>
                            <option value="Earliest">Earliest Release</option>
                        </select>
                    </div>

                    <BrowseMode searchMode={searchMode} />

                    <SearchMode
                        searchMode={searchMode}
                        apiSetFunct={setApiReqData}
                    />
                </div>

                <MovieList movies={movieData} />

                <button id="load-button" onClick={loadMore}>
                    Load More
                </button>
            </main>

            <footer>Flixster</footer>
        </>
    );
}

export default App;
