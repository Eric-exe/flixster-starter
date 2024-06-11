import React, { useState, useEffect } from "react";
import "./App.css";
import MovieList from "./components/MovieList/MovieList";

function App() {
  // =================================================================================
  const [movieData, setMovieData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const fetchData = async (url) => {
    try {
      const response = await fetch(url, {
        method: "get",
        headers: new Headers({
          Authorization: "Bearer " + import.meta.env.VITE_APP_API_KEY,
          accept: "application/json",
        }),
      })
      const json = await response.json()
      return json['results']
    } 
    catch (error) {
      console.error(error)
    }
  };

  const fetchPageData = async (page) => {
    const data = await fetchData(
      `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`
    )
    if (!data) return
    // if page is 1, then all old data is invalid
    if (page == 1) setMovieData(data)
    else setMovieData((oldData) => [...oldData, ...data])
  }

  const fetchSearchData = async (query, page) => {
    const data = await fetchData(
      `https://api.themoviedb.org/3/search/movie?query=${query}&page=${page}&language=en-US`
    )
    if (!data) return
    if (page == 1) setMovieData(data)
    else setMovieData((oldData) => [...oldData, ...data])
  }

  // initial fetch
  useEffect(() => {
    fetchPageData(currentPage);
  }, []);

  // helper functions
  const loadMore = () => {
    if (isSearching) fetchSearchData(searchQuery, currentPage + 1);
    else fetchPageData(currentPage + 1);
    setCurrentPage(currentPage + 1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const search = () => {
    setMovieData([]);
    fetchSearchData(searchQuery, 1);
    setCurrentPage(1);
    setIsSearching(true);
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
        <span id="filters">
          <span>
            <input
              type="text"
              placeholder="Search"
              onChange={handleSearchChange}
            />
            <button onClick={() => search()}>Search</button>
          </span>

          <div>
            <label htmlFor="sort-dropdown">Sort: &nbsp;</label>
            <select name="sort-dropdown" id="sort-dropdown">
              <option value="a">A</option>
              <option value="b">B</option>
            </select>
          </div>
        </span>

        <span>
          <aside>Hello</aside>
          <MovieList movies={movieData} />
        </span>
        <button id="load-button" onClick={() => loadMore()}>
          Load More
        </button>
      </main>

      <footer>Flixster</footer>
    </>
  );
}

export default App;
