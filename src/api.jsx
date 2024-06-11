import React, { useState, useEffect } from "react";

const api = () => {
    const [movieData, setMovieData] = useState([]);

    const fetchData = async (url) => {
        try {
            const response = await fetch(url, {
                method: "get",
                headers: new Headers({
                    Authorization: "Bearer " + import.meta.env.VITE_APP_API_KEY,
                    accept: "application/json",
                }),
            });
            const json = await response.json();
            return json["results"];
        } catch (error) {
            console.error(error);
        }
    };

    const fetchPageData = async (page, concat) => {
        const data = await fetchData(
            `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`
        );
        if (!data) return;
        if (concat) {
            setMovieData((oldData) => [...oldData, ...data]);
        }
        else {
            setMovieData(data);
        }
    };

    const fetchSearchData = async (query, page, concat) => {
        const data = await fetchData(
            `https://api.themoviedb.org/3/search/movie?query=${query}&page=${page}&language=en-US`
        );
        if (!data) return;
        if (concat) {
            setMovieData((oldData) => [...oldData, ...data]);
        }
        else {
            setMovieData(data);
        }
    };  

    return { 
        movieData,
        fetchPageData, fetchSearchData 
    };
};

export default api