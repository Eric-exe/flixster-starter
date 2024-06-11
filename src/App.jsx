import React, { useState, useEffect } from "react";
import "./App.css";
import MovieList from "./components/MovieList/MovieList";

function App() {
  // =================================================================================
  const [movieData, setMovieData] = useState(null);

  const fetchData = async () => {
    await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`,
      {
        method: "get",
        headers: new Headers({
          Authorization: "Bearer " + import.meta.env.VITE_APP_API_KEY,
          accept: "application/json",
        })
      }
    )
    .then((response) => response.json())
    .then((json) => setMovieData(json))
    .catch((error) => console.error(error));
  }

  useEffect(() => {
    fetchData();
  },[]);
  console.log(movieData);
  // =================================================================================
  return (
    <>
      <header>
        <div>
          <h1>Flixster</h1>
        </div>

        <span id="filters">
          <span>
            <input type="text" placeholder="Search" />
            <button>Button</button>
          </span>

          <div>
            <label htmlFor="sort-dropdown">Sort: &nbsp;</label>
            <select name="sort-dropdown" id="sort-dropdown">
              <option value="a">A</option>
              <option value="b">B</option>
            </select>
          </div>
        </span>
      </header>

      <main>
        <MovieList data={movieData} />
      </main>

      <footer>Flixster</footer>
    </>
  );
}

export default App;
