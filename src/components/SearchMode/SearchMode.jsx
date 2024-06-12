import './SearchMode.css';
import propTypes from 'prop-types';

SearchMode.propTypes = {
    searchMode: propTypes.bool.isRequired,
    handleSearchChange: propTypes.func.isRequired,
    search: propTypes.func.isRequired,
}

function SearchMode(props) {
    return (
        <div className='center-v' style={{display: (props.searchMode ? 'block' : 'none')}}>
        <input
            type='text'
            placeholder='Search'
            onChange={props.handleSearchChange}
        />
        <button onClick={props.search}>Search</button>
        </div>
    );
}

export default SearchMode;