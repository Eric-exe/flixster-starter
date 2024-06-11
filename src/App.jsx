import { useEffect, useState } from "react";
import "./App.css";
import MovieList from "./components/MovieList/MovieList";
import API from "./api";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const {
    movieData,
    fetchPageData,
    fetchSearchData
  } = API();

  useEffect(() => {
    fetchPageData(1, false);
  }, []);


  // helper functions
  const loadMore = () => {
    if (isSearching) fetchSearchData(searchQuery, currentPage + 1, true);
    else fetchPageData(currentPage + 1, true);
    setCurrentPage(currentPage + 1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const search = () => {
    setCurrentPage(1);
    setIsSearching(true);
    fetchSearchData(searchQuery, 1, false);
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
