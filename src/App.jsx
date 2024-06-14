import { useEffect, useState } from "react";
import "./App.css";
import BrowseMode from "./components/BrowseMode/BrowseMode";
import SearchMode from "./components/SearchMode/SearchMode";
import PersonalSidebar from "./components/PersonalSidebar/PersonalSidebar"
import MovieList from "./components/Movie/MovieList";
import api from "./api";

const DEFAULT_API_REQ_DATA = {
    "search": "", 
    "page": 1,
    "filterMode": false,
    "genres": new Set(),
    "dateRange": ["0000-01-01", "9999-12-31"],
    "ratingRange": [-1, 11],
    "sortMode": "",
};

function App() {
    // API data should have all keys mentioned in DEFAULT_API_REQ_DATA
    // whenever this object updates, an API request is made
    const [apiReqData, setApiReqData] = useState(DEFAULT_API_REQ_DATA);

    // stores the result of API request, updating in MovieList
    const [movieData, setMovieData] = useState([]);

    // [false: now playing, true: search]
    const [searchMode, setSearchMode] = useState(false); 
    const [sidebarOpened, setSidebarOpened] = useState(false);

    const { fetchPageData, fetchSearchData, fetchFilteredData } = api();

    // global liked/favorite across sorts/filters
    // stored as a object {movieID: movieTitle}
    const [moviesWatched, setMoviesWatched] = useState({});
    const [moviesFavorited, setMoviesFavorited] = useState({});

    useEffect(() => {
        // determine search mode
        if (apiReqData["search"] == "") {
            // if in browsing mode, determine if in filter mode
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

    const changeSidebar = () => {
        setSidebarOpened((oldState) => !oldState);
    }

    return (
        <>
            <header>
                <div id="title-text" className="background-green">
                    <h1>
                        Flixster&nbsp;
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                            <path d="M9 6a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                            <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/>
                        </svg>
                    </h1>
                </div>
            </header>
            <main>
                <div className="sticky-bar background-green">
                    <div className="flex center-v">
                        <div
                            className={"button " + (searchMode ? "" : "button-active")}
                            onClick={() => {
                                updateSearchMode(false);
                                setApiReqData(DEFAULT_API_REQ_DATA);
                            }}
                        >
                            Now Playing
                        </div>
                        <div
                            className={"button " + (searchMode ? "button-active" : "")}
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

                    <div className="flex right">
                        <div>
                            <div className="button" onClick={changeSidebar}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>


                <div id="main-body">
                    <div id="movie-body" style={{marginRight: (sidebarOpened ? "35vw" : "")}}>
                        <MovieList 
                            movies={movieData} 
                            watched={[moviesWatched, setMoviesWatched]}
                            favorited={[moviesFavorited, setMoviesFavorited]}
                        />

                        <button 
                            className="button" 
                            id="load-button" 
                            onClick={loadMore} 
                            style={{margin: "auto"}}>
                            Load More
                        </button>
                    </div>
                    <PersonalSidebar
                        sidebarOpened={sidebarOpened}
                        sidebarSetFunct={setSidebarOpened}
                        watched={[moviesWatched, setMoviesWatched]}
                        favorited={[moviesFavorited, setMoviesFavorited]}
                    />
                </div>
            </main>

            <footer className="background-green">
                
                <span className="margin-h">
                    Flixster
                </span>
                <span className="margin-h">
                    <a href="https://google.com" style={{color: "white"}}>About</a>
                </span>
                <span className="margin-h">
                    <a href="https://google.com" style={{color: "white"}}>Contact</a>
                </span>
            </footer>
        </>
    );
}

export default App;
