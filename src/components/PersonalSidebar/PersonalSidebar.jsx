import "./PersonalSidebar.css";
import propTypes from "prop-types";

PersonalSidebar.propTypes = {
    sidebarOpened: propTypes.bool.isRequired,
    sidebarSetFunct: propTypes.func.isRequired,
    watched: propTypes.array.isRequired,
    favorited: propTypes.array.isRequired,
};

function PersonalSidebar(props) {
    const createParagraphItems = (obj) => {
        return Object.entries(obj).map((keyValuePair, index) => {
            return (<p key={index}>{keyValuePair[1]}&nbsp;</p>);
        });
    }

    return (
        <div className="sidebar" style={{ width: props["sidebarOpened"] ? "35vw" : "" }}>
            <div id="sidebar-content">
                <h2>Watched Movies</h2>
                    { createParagraphItems(props["watched"][0]) }
                <hr/>
                <h2>Favorited Movies</h2>
                    { createParagraphItems(props["favorited"][0]) }
                <hr/>
            </div>
        </div>
    );
}

export default PersonalSidebar;
