import './PersonalSidebar.css'
import propTypes from 'prop-types'
import { useState, useEffect } from 'react'

PersonalSidebar.propTypes = {
    sidebarOpened: propTypes.bool.isRequired,
    sidebarSetFunct: propTypes.func.isRequired,
    watched: propTypes.array.isRequired,
    favorited: propTypes.array.isRequired
}

function PersonalSidebar(props) {
    return (
        <div className="sidebar" 
            style={{width: props.sidebarOpened ? "35vw" : "", }}>
            <div id="sidebar-content">
                <h2>Watched Movies</h2>
                {
                    Object.keys(props['watched'][0]).length == 0 ? <p>No movies watched</p> :
                    Object.entries(props['watched'][0]).map((movie, index) => {
                        return (
                            <p key={index}>{movie[1]}&nbsp;({movie[0]})</p>
                        );
                    })
                }
                <h2>Favorited Movies</h2>
                {
                    Object.keys(props['favorited'][0]).length == 0 ? <p>No movies favorited</p> :
                    Object.entries(props['favorited'][0]).map((movie, index) => {
                        return (
                            <p key={index}>{movie[1]}&nbsp;({movie[0]})</p>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default PersonalSidebar;