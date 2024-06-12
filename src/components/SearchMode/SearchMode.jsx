import './SearchMode.css';
import propTypes from 'prop-types';
import { useState } from 'react';

SearchMode.propTypes = {
    searchMode: propTypes.bool.isRequired,
    apiSetFunct: propTypes.func.isRequired,
};

function SearchMode(props) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const search = () => {
        props.apiSetFunct({
        search: searchQuery,
        page: 1,
        filters: 0,
        genres: [],
        dateRange: [Date(-8640000000000000), Date(8640000000000000)],
        ratingRange: [0, 10],
        });
    };

  return (
        <div
        className="center-v"
        style={{ display: props.searchMode ? "block" : "none" }}
        >
            <input
                type="text"
                placeholder="Search"
                onChange={handleSearchChange}
            />
            <button className="button" onClick={search}>
                Search
            </button>
        </div>
    );
}

export default SearchMode;
