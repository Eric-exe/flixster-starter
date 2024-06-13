import { useEffect, useState } from "react";
import "./App.css";
import BrowseMode from "./components/BrowseMode/BrowseMode";
import SearchMode from "./components/SearchMode/SearchMode";
import MovieList from "./components/Movie/MovieList/MovieList";
import api from "./api";

const DEFAULT_API_REQ_DATA = {
    'search': "",
    'page': 1,
    'filterMode': false,
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

    useEffect(() => {
        console.log(apiReqData);
        if (apiReqData["search"] == "") {
            if (apiReqData["filterMode"]) {
                fetchFilteredData(apiReqData, apiReqData["page"] != 1, setMovieData);
            } else {
                fetchPageData(apiReqData, apiReqData["page"] != 1, setMovieData);
            }
        } else {
            fetchSearchData(apiReqData, apiReqData["page"] != 1, setMovieData);
        }
    }, [apiReqData]);

    const loadMore = () => {
        setApiReqData({
            search: apiReqData["search"],
            page: apiReqData["page"] + 1,
            filterMode: apiReqData["filterMode"],
            genres: [],
            dateRange: apiReqData["dateRange"],
            ratingRange: apiReqData["ratingRange"],
            sortMode: apiReqData["sortMode"]
        });
    };

    const updateSearchMode = (mode) => {
        setSearchMode(mode);
    };

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
