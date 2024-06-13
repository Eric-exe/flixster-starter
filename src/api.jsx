const api = () => {
    const fetchData = async (url, key, useKey, funct, concat) => {
        try {
            const response = await fetch(url, {
                method: "get",
                headers: new Headers({
                    Authorization: "Bearer " + import.meta.env.VITE_APP_API_KEY,
                    accept: "application/json",
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            if (useKey) {
                funct(concat ? (oldData) => [...oldData, ...data[key]] : data[key]);
            } else {
                funct(concat ? (oldData) => [...oldData, ...data] : data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchPageData = async (data, concat, funct) => {
        fetchData(
            `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${data["page"]}`,

            "results",
            true,
            funct,
            concat
        )
    };

    const fetchSearchData = async (data, concat, funct) => {
        fetchData(
            `https://api.themoviedb.org/3/search/movie?query=` +
            `${data["search"]}` + 
            `&page=${data["page"]}` + 
            `&language=en-US`,

            "results",
            true,
            funct,
            concat
        );
    };

    const fetchMovieData = async (query, funct) => {
        await fetchData(
            `https://api.themoviedb.org/3/movie/${query}?language=en-US`,

            "",
            false,
            funct,
            false
        );
    };

    const fetchTrailerData = async (query, funct) => {
        await fetchData(
            `https://api.themoviedb.org/3/movie/${query}/videos?language=en-US`,

            "results",
            true,
            funct,
            false
        );
    };

    const fetchFilteredData = async (data, concat, funct) => {
        let genresString = "";
        for (const genreID of data["genres"].entries()) {
            genresString += genreID + "%7C";
        }

        await fetchData(
            `https://api.themoviedb.org/3/discover/movie?` +
            `&language=en-US&page=${data["page"]}` + 
            `&primary_release_date.gte=${data["dateRange"][0]}` + 
            `&primary_release_date.lte=${data["dateRange"][1]}` + 
            `&vote_average.gte=${data["ratingRange"][0]}` + 
            `&vote_average.lte=${data["ratingRange"][1]}` + 
            `&sort_by=${data["sortMode"]}` + 
            `&with_genres=${genresString}`,

            "results",
            true,
            funct,
            concat
        );
    };

    return {
        fetchPageData,
        fetchSearchData,
        fetchMovieData,
        fetchTrailerData,
        fetchFilteredData
    };
};

export default api;
