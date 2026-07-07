
import { createContext,useContext, useState ,useEffect} from "react"
import { fetchGenres, fetchPopularMovies, fetchTopRatedMovies, fetchtrendingMovies } from "../Services/api";


const MoviesContext=createContext();// creating an empty pipeline
export const useMovies=()=>useContext(MoviesContext);//linked with moviecontext provider

export const MoviesProvider=({children})=>{
    const [trendingMovies,setTrendingMovies]=useState([]);
    const [popularMovies,setPopularMovies]=useState([]);
    const [topratedMovies,setTopratedMovies]=useState([]);
    const [genre,setGenre]=useState([]);
    const [selectMovieID,setSelectMovieID]=useState(null);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);

useEffect(()=>{
    const fetchMoviesdata=async()=>{
        try{
            setLoading(true);
            const [trending,popular,toprated,genre]=await Promise.all([
                fetchtrendingMovies(),
                fetchPopularMovies(),
                fetchTopRatedMovies(),
                fetchGenres(),
                
            ]);
            setTrendingMovies(trending);
            setPopularMovies(popular);
            setTopratedMovies(toprated);
            setGenre(genre)
        }
        catch(err){
            console.log("error fetching movie data:",err)
        }
        finally{
            setLoading(false)
        }
    };
    fetchMoviesdata();
},[]);
    const openMovieDetails=(movieid)=>{
        setSelectMovieID(movieid);
        document.body.style.overflow="hidden";
    }
    const closeMovieDetails=()=>{
        setSelectMovieID(null);
        document.body.style.overflow="";
    }

return(<MoviesContext.Provider value={{trendingMovies,popularMovies,topratedMovies,genre,selectMovieID,openMovieDetails,closeMovieDetails,loading,error}}> {children}</MoviesContext.Provider>);
}
//MoviesContext.Provider have a data with th help of provider which can be used by movie context variable