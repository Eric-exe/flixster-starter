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
            const json = await response.json();
            return json['results'];
        } catch (error) {
            console.error(error);
        }
    };

    const fetchPageData = async (page, concat, funct) => {
        const data = await fetchData(
            `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`
        );

        if (!data) return;
        if (concat) {
            funct((oldData) => [...oldData, ...data]);
        }
        else {
            funct(data);
        }
    };

    const fetchSearchData = async (query, page, concat, funct) => {
        const data = await fetchData(
            `https://api.themoviedb.org/3/search/movie?query=${query}&page=${page}&language=en-US`
        );
        if (!data) return;
        if (concat) {
            funct((oldData) => [...oldData, ...data]);
        }
        else {
            funct(data);
        }
    };  

    const fetchMovieData = async (query, funct) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${query}?language=en-US`, {
                method: "get",
                headers: new Headers({
                    Authorization: "Bearer " + import.meta.env.VITE_APP_API_KEY,
                    accept: "application/json",
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const json = await response.json();
            funct(json);
        }
        catch (error) {
            console.log(error);
        }
    }

    const fetchTrailerData = async(query, funct) => {
        const data = await fetchData(
            `https://api.themoviedb.org/3/movie/${query}/videos?language=en-US`
        );
        if (!data) return;
        funct(data);
    }

    return { 
        fetchPageData, fetchSearchData, fetchMovieData, fetchTrailerData
    };
};

export default api;