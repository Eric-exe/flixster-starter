const api = () => {
    const fetchData = async (url) => {
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
            return await response.json();
        } catch (error) {
            console.error(error);
        }
    };

    const fetchPageData = async (page, concat, funct) => {
        await fetchData(
            `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`
        )
        .then((data) => {
            if (concat) {
                funct((oldData) => [...oldData, ...data['results']]);
            }
            else {
                funct(data['results']);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const fetchSearchData = async (query, page, concat, funct) => {
        await fetchData(
            `https://api.themoviedb.org/3/search/movie?query=${query}&page=${page}&language=en-US`
        )
        .then((data) => {
            console.log(data);
            if (concat) {
                funct((oldData) => [...oldData, ...data['results']]);
            }
            else {
                funct(data['results']);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };  

    const fetchMovieData = async (query, funct) => {
        await fetchData(
            `https://api.themoviedb.org/3/movie/${query}?language=en-US`
        )
        .then ((data) => {
            funct(data);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const fetchTrailerData = async(query, funct) => {
        await fetchData(
            `https://api.themoviedb.org/3/movie/${query}/videos?language=en-US`
        )
        .then((data) => {
            funct(data['results']);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return { 
        fetchPageData, 
        fetchSearchData, 
        fetchMovieData, 
        fetchTrailerData
    };
};

export default api;