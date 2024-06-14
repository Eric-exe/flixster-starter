import "./SearchMode.css";
import propTypes from "prop-types";
import { useState } from "react";

SearchMode.propTypes = {
    searchMode: propTypes.bool.isRequired,
    apiSetFunct: propTypes.func.isRequired,
};

function SearchMode(props) {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // reset api info so that the search query is used
    const search = () => {
        props.apiSetFunct({
            search: searchQuery,
            page: 1,
            filterMode: false,
            genres: new Set(),
            dateRange: ["0000-01-01", "9999-12-31"],
            ratingRange: [-1, 11],
        });
    };

    return (
        <div className="center-v search-mode" style={{ display: props.searchMode ? "block" : "none" }}>
            <input type="text" placeholder="Search" onChange={handleSearchChange} />
            <button className="button" onClick={search}>
                Search
            </button>
        </div>
    );
}

export default SearchMode;
