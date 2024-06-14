import './PersonalSidebar.css'
import propTypes from 'prop-types'
import MovieList from '../Movie/MovieList/MovieList'
import api from '../../api'
import { useState, useEffect } from 'react'

PersonalSidebar.propTypes = {
    sidebarOpened: propTypes.bool.isRequired,
    sidebarSetFunct: propTypes.func.isRequired,
    watchedFavorited: propTypes.array.isRequired
}

function PersonalSidebar(props) {
    const [watchedMovies, setWatchedMovies] = useState([]);
    const [favoritedMovies, setFavoritedMovies] = useState([]);

    // handle watched movie updates
    useEffect(() => {
        let 
    }, [props.watchedFavorited[0]]);

    return (
        <div className="sidebar" 
            style={{width: props.sidebarOpened ? "35vw" : "", }}>
            <div id="sidebar-content">
                <h3>Watched Movies</h3>
                <h3>Favorited Movies</h3>
            </div>
        </div>
    );
}

export default PersonalSidebar;