import "./MovieList.css";
import MovieCard from "./MovieCard";
import PropTypes from "prop-types";

MovieList.propTypes = {
    movies: PropTypes.array.isRequired,
    watched: PropTypes.array.isRequired,
    favorited: PropTypes.array.isRequired,
};

function MovieList(props) {
    let linkStart = "https://image.tmdb.org/t/p/w1280";
    let badLink =
        "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/144694078/original/42073354247a976027d92a56ded126bc59235d60/send-you-a-random-png.png";

    const handleLink = (object, key) => {
        if (object[key] == null) {
            object[key] = badLink;
        } else {
            object[key] = linkStart + object[key];
        }
    };
    return (
        <>
            <section className="movie-card-container">
                {props["movies"].map((movie, index) => {
                    const updatedMovie = { ...movie }; // tweak movie object to fix url
                    handleLink(updatedMovie, "poster_path");
                    handleLink(updatedMovie, "backdrop_path");
                    updatedMovie["img_alt"] = "Image of " + movie["title"];
                    return (
                        <MovieCard
                            key={index}
                            movieID={movie["id"].toString()}
                            movieData={updatedMovie}
                            watched={props["watched"]}
                            favorited={props["favorited"]}
                        />
                    );
                })}
            </section>
        </>
    );
}

export default MovieList;
