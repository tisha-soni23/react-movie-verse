const api_key=import.meta.env.VITE_TMDB_API_KEY;
const URL='https://api.themoviedb.org/3';
export const fetchtrendingMovies=async()=>{
    try{
        const response=await fetch(`${URL}/trending/movie/week?api_key=${api_key}&language=en-US`);
        const data=await response.json();
        return data.results;
    }
    
    catch(error){
        console.log("error Fetching trending movies",error)
        return [];

    }
};
export const fetchPopularMovies=async()=>{
    try{
        const response=await fetch(`${URL}/movie/popular?api_key=${api_key}&language=en-US&page=1`);
        const data=await response.json();
        return data.results;
    }
    
    catch(error){
        console.log("error Fetching trending movies",error)
        return [];

    }
};
export const fetchTopRatedMovies=async()=>{
    try{
        const response=await fetch(`${URL}/movie/top_rated?api_key=${api_key}&language=en-US&page=1`);
        const data=await response.json();
        return data.results;
    }
    
    catch(error){
        console.log("error Fetching trending movies",error)
        return [];

    }
};
export const fetchMoviesByGenre=async(genreid)=>{//why id hass used
    try{
        const response=await fetch(`${URL}/discover/movie?api_key=${api_key}&language=en-US&with_genres=${genreid}&page=1`);
        const data=await response.json();
        return data.results;
    }
    
    catch(error){
        console.log("error Fetching trending movies",error)
        return [];

    }
};
export const fetchGenres=async()=>{
    try{
        const response=await fetch(`${URL}/genre/movie/list?api_key=${api_key}&language=en-US`);
        const data=await response.json();
        return data.genres;
    }
    
    catch(error){
        console.log("error Fetching trending movies",error)
        return [];

    }
};
export const fetchMoviesDetails=async(movieid)=>{
    try{
        console.log(movieid)
        const response=await fetch(`${URL}/movie/${movieid}?api_key=${api_key}&language=en-US`);
        const data=await response.json();
        return data;
    }
    
    catch(error){
        console.log("error Fetching trending movies",error)
        return [];

    }
};
export const SearchMovies=async(query)=>{
    try{
        const response=await fetch(`${URL}/search/movie?api_key=${api_key}&language=en-US&query=${query}&page=1&include_adult=false`);
        const data=await response.json();
        return data.results;
    }
    
    catch(error){
        console.log("error Fetching trending movies",error)
        return [];

    }
};
export const getimgUrl=(path,size='original')=>{
   if(!path)
    return " https://api.themoviedb.org/3/collection/collection_id/images "
    return `https://image.tmdb.org/t/p/${size}${path}`
};

export const fetchMovieVideos = async (movieId) => {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${api_key}`
    );
    const data = await response.json();
    return data.results;
};