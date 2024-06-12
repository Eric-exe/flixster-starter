import { useEffect, useState } from 'react';
import './App.css';
import MovieList from './components/MovieList/MovieList';
import api from './api';

function App() {
  const [movieData, setMovieData] = useState([]);
  const [apiReqData, setApiReqData] = useState({'search': 'now-playing', 'page': 1});
  const [searchQuery, setSearchQuery] = useState('');
  // const [sortMode, setSortMode] = useState(0);
  // 0 -> sort pop desc, 1 -> sort pop asc, 2 -> sort alpha

  const { fetchPageData, fetchSearchData } = api();

  useEffect(() => {
    if (apiReqData['search'] == 'now-playing') { 
      fetchPageData(apiReqData['page'], (apiReqData['page'] != 1), setMovieData);
    }
    else {
      fetchSearchData(searchQuery, apiReqData['page'], (apiReqData['page'] != 1), setMovieData);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiReqData]);

  // helper functions
  const loadMore = () => {
    let searchMode = apiReqData['search'];
    let page = apiReqData['page'];
    setApiReqData({'search': searchMode, 'page': page + 1});
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const search = () => {
    if (searchQuery == '') {
      setApiReqData({'search': 'now-playing', 'page': 1});
    }
    else {
      setApiReqData({'search': searchQuery, 'page': 1});
    }
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
            <button onClick={search}>Search</button>
          </span>

          <div>
            <label htmlFor="sort-dropdown">Sort: &nbsp;</label>
            <select name="sort-dropdown" id="sort-dropdown">
              <option value="a">Popularity Descending</option>
              <option value="b">Popularity Ascending</option>
              <option value="c">A-Z</option>
            </select>
          </div>
        </span>

        <span>
          <aside>Hello</aside>
          <MovieList movies={movieData} />
        </span>
        <button id="load-button" onClick={loadMore}>
          Load More
        </button>
      </main>

      <footer>Flixster</footer>
    </>
  );
}

export default App;
