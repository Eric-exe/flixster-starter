import './BrowseMode.css';
import propTypes from 'prop-types';

BrowseMode.propTypes = {
    searchMode: propTypes.bool.isRequired,
}

function BrowseMode(props) {
    return (
        <div className='center-v' style={{display: (props.searchMode ? 'none' : 'block')}}>
            Genres:
        </div>
    );
}

export default BrowseMode;