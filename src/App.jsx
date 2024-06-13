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
        setApiReqData((oldApiReqData) => ({
            ...oldApiReqData,
            "page": oldApiReqData["page"] + 1,
        }));
    };

    const updateSearchMode = (mode) => {
        setSearchMode(mode);
    };

    return (
        <>
            <header>
                <div>
                    <h1 id='title-text'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                            <path d="M9 6a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                            <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/>
                        </svg>
                    &nbsp;Flixster&nbsp;
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z"/>
                        </svg>
                    </h1>
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

                <button className="button" id="load-button" onClick={loadMore} style={{margin: "10px auto"}}>
                    Load More
                </button>
            </main>

            <footer>
                
                <span className="margin-h">
                    Flixster
                </span>
                <span className="margin-h">
                    <a href="https://google.com" style={{color: 'white'}}>About</a>
                </span>
                <span className="margin-h">
                    <a href="https://google.com" style={{color: 'white'}}>Contact</a>
                </span>
            </footer>
        </>
    );
}

export default App;
