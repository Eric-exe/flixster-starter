import { useEffect, useState } from 'react';
import './App.css';
import BrowseMode from './components/BrowseMode/BrowseMode';
import SearchMode from './components/SearchMode/SearchMode';
import MovieList from './components/Movie/MovieList/MovieList';
import api from './api';

function App() {
  const [movieData, setMovieData] = useState([]);
  const [apiReqData, setApiReqData] = useState({ 'search': '', 'page': 1 });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMode, setSearchMode] = useState(false); // [false: now playing, true: search
  const [sortMode, setSortMode] = useState(0);

  const SORT_MODES = {
    'None': 0,
    'RatingDesc': 1,
    'RatingAsc': 2,
    'A-Z': 3,
    'Z-A': 4,
    'Latest': 5,
    'Earliest': 6
  };

  const { fetchPageData, fetchSearchData } = api();
  // =================================================================================
  // handle when user requests new data
  useEffect(() => {
    if (apiReqData['search'] == '') {
      setSearchMode(false);
      fetchPageData(apiReqData['page'], (apiReqData['page'] != 1), setMovieData);
    }
    else {
      setSearchMode(true);
      fetchSearchData(searchQuery, apiReqData['page'], (apiReqData['page'] != 1), setMovieData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiReqData]);

  // sort movie data based on sort mode
  useEffect(() => {
    switch (sortMode) {
      case SORT_MODES['None']:
        break;

      case SORT_MODES['RatingDesc']:
        setMovieData((oldData) =>
          [...oldData].sort((a, b) => b['vote_average'] - a['vote_average']));
        break;

      case SORT_MODES['RatingAsc']:
        setMovieData((oldData) =>
          [...oldData].sort((a, b) => a['vote_average'] - b['vote_average']));
        break;

      case SORT_MODES['A-Z']:
        setMovieData((oldData) =>
          [...oldData].sort((a, b) => a['title'].localeCompare(b['title'])));
        break;

      case SORT_MODES['Z-A']:
        setMovieData((oldData) =>
          [...oldData].sort((a, b) => b['title'].localeCompare(a['title'])));
        break;

      case SORT_MODES['Latest']:
        setMovieData((oldData) =>
          [...oldData].sort((a, b) => new Date(b['release_date']) - new Date(a['release_date'])));
        break;

      case SORT_MODES['Earliest']:
        setMovieData((oldData) =>
          [...oldData].sort((a, b) => new Date(a['release_date']) - new Date(b['release_date'])));
        break;

      default:
        break;
    };
  }, [sortMode]);

  // =================================================================================

  // helper functions
  const loadMore = () => {
    let searchMode = apiReqData['search'];
    let page = apiReqData['page'];
    setApiReqData({ 'search': searchMode, 'page': page + 1 });
  };

  const updateSearchMode = (mode) => {
    setSearchMode(mode);
      // update api req data, handles when button is pressed
      setApiReqData({ 'search': '', 'page': 1 });
    }
  };

  const handleSortChange = (event) => {
    setSortMode(SORT_MODES[event.target.value]);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const search = () => {
    setApiReqData({ 'search': searchQuery, 'page': 1 });
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
        <div id='filters'>
          <div className='flex center-v'>
            <div className={'button ' + (searchMode ? '' : 'button-active')} onClick={() => updateSearchMode(false)}>Now Playing</div>
            <div className={'button ' + (searchMode ? 'button-active' : '')} onClick={() => updateSearchMode(true)}>Search</div>
          </div>

          <div className='center-v'>
            <label htmlFor='sort-dropdown'>Sort by: &nbsp;</label>
            <select id='sort-dropdown' onChange={handleSortChange}>
              <option value='None'>None</option>
              <option value='RatingDesc'>Rating Descending</option>
              <option value='RatingAsc'>Rating Ascending</option>
              <option value='A-Z'>A-Z</option>
              <option value='Z-A'>Z-A</option>
              <option value='Latest'>Latest Release</option>
              <option value='Earliest'>Earliest Release</option>
            </select>
          </div>

          <BrowseMode
            searchMode={searchMode}
          />

          <SearchMode 
            searchMode={searchMode} 
            handleSearchChange={handleSearchChange} 
            search={search} 
          />

        </div>

        <MovieList movies={movieData} />

        <button id='load-button' onClick={loadMore}>
          Load More
        </button>
      </main>

      <footer>Flixster</footer>
    </>
  );
}

export default App;
