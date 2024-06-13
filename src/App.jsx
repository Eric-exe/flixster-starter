import { useEffect, useState } from "react";
import "./App.css";
import BrowseMode from "./components/BrowseMode/BrowseMode";
import SearchMode from "./components/SearchMode/SearchMode";
import MovieList from "./components/Movie/MovieList/MovieList";
import api from "./api";

const DEFAULT_API_REQ_DATA = {
    'search': "",
    'page': 1,
    'filters': 0, // if not 0, there is at least 1 filter, handle that
    'genres': new Set(),
    'dateRange': ["0000-01-01", "9999-12-31"],
    'ratingRange': [-1, 11],
    'sortMode': "",
};

function App() {
    const [movieData, setMovieData] = useState([]);
    const [apiReqData, setApiReqData] = useState(DEFAULT_API_REQ_DATA);
    const [searchMode, setSearchMode] = useState(false); // [false: now playing, true: search

    const { fetchPageData, fetchSearchData, fetchFilteredData } = api();
    // =================================================================================
    // handle when user requests new data
    useEffect(() => {
        if (apiReqData["search"] == "") {
            if (apiReqData["filters"] == 0) {
                fetchPageData(
                    apiReqData["page"],
                    apiReqData["page"] != 1,
                    setMovieData
                );
            } else {
                fetchFilteredData(
                    apiReqData["page"],
                    apiReqData["genres"],
                    apiReqData["dateRange"],
                    apiReqData["ratingRange"],
                    apiReqData["sortMode"],
                    apiReqData["page"] != 1,
                    setMovieData
                )
            }
        } else {
            fetchSearchData(
                apiReqData["search"],
                apiReqData["page"],
                apiReqData["page"] != 1,
                setMovieData
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiReqData]);

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
            sortMode: apiReqData["sortMode"]
        });
    };

    const updateSearchMode = (mode) => {
        setSearchMode(mode);
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

                    <BrowseMode 
                        searchMode={searchMode} 
                        apiSetFunct={setApiReqData}
                    />

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
