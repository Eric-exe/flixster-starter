import './PersonalSidebar.css'
import propTypes from 'prop-types'
import MovieList from '../Movie/MovieList'
import { useState, useEffect } from 'react'

PersonalSidebar.propTypes = {
    sidebarOpened: propTypes.bool.isRequired,
    sidebarSetFunct: propTypes.func.isRequired,
    watchedFavorited: propTypes.array.isRequired
}

function PersonalSidebar(props) {
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