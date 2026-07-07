import React, { useEffect, useState } from "react";
import { useMovies } from "../context/Moviecontext";
import { fetchMoviesByGenre } from "../Services/api";
import { getimgUrl } from "../Services/api";

function GenreSection({id}){
    const {genre,loading,openMovieDetails}=useMovies();
    const [selectedGenre,setSelectedGenre]=useState(null);
    const [genreMovies,setGenreMovies]=useState([]);
    const [loadingGenreMovies,setLoadingGenreMovies]=useState(false);
     
    useEffect(()=>{
        if(loading && genre.length===0) return;
        setSelectedGenre(genre[0]);

    },[loading,genre]);

    useEffect(()=>{
        const loadmovies=async()=>{
            if(!selectedGenre)return;
            setLoadingGenreMovies(true);
            const movies=await fetchMoviesByGenre(selectedGenre.id);
          
            setGenreMovies(movies.slice(0,8));
            setLoadingGenreMovies(false);

        }
        loadmovies();
    },[selectedGenre])
    if(loading || !selectedGenre){
        return( 
          <section className="py-11 bg-neutral-800 ">
            <div className="h-40 flex justify-center items-center">
                    <div className=" rounded-full  animate-spin">
                       <svg xmlns="http://www.w3.org/2000/svg"
                        width="24" height="24" viewBox="0 0 24 24"
                         fill="none" stroke="currentColor" strokeWidth="2"
                          strokeLinecap="round" strokeLinejoin="round"
                           className="animate-pulse lucide lucide-loader-circle-icon lucide-loader-circle" color="white">
                            <path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                    </div>
            </div>
        </section>)
    }
    const formatrating=(rating)=>{
                
                return (Math.round(rating*10)/10).toFixed(1);
            }
    
    
    return(
        <section className="py-11 bg-neutral-800 "id={id}>
            <div className="container mx-auto px-4 ">
                <h2 className="text-2xl mb-6 font-bold text-white">Browse by genre</h2>

                {/*Tabs */}
                <div className="mb-8 overflow-x-auto pb-2 scrollbar-none">
                    <div className="flex space-x-2 min-w-max ">
                        {genre.slice(0,18).map((gen)=>{ 
                            return (<button key ={gen.id} className={`px-4 py-2 rounded-md bg-neutral-600 text-sm 
                            ${selectedGenre?.id===gen.id ?"bg-pink-400 text-white":"bg-neutral-600 text-white hover:bg-neutral-500"}`}
                            onClick={()=>setSelectedGenre(gen)}>
                            {gen.name}
                        </button>)
                        })}
                        
                    </div>
                </div>     
                  {/*loading */}
                {loadingGenreMovies ? (<div className="h-40 flex justify-center items-center">
                    <div className=" rounded-full  animate-spin">
                       <svg xmlns="http://www.w3.org/2000/svg"
                        width="24" height="24" viewBox="0 0 24 24"
                         fill="none" stroke="currentColor" strokeWidth="2"
                          strokeLinecap="round" strokeLinejoin="round"
                           className="animate-pulse lucide lucide-loader-circle-icon lucide-loader-circle" color="white">
                            <path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                    </div>
                  </div>) : (<div className="grid grid-cols-2  lg:grid-cols-4 gap-4 md:gap-6">
                    {/*Map method*/}
                    {genreMovies.map((movie)=>{ 
                        return( <div key={movie.id} className="group cursor-pointer " onClick={()=>openMovieDetails(movie.id)}>
                        <div className="relative overflow-hidden  rounded-lg  bg-neutral-800">
                            <div className=" md:aspect-2/3   ">
                            <img
                            src={getimgUrl(movie.poster_path)} alt={movie.title} className="  w-full h-full object-cover transition-all duration-300
                            group-hover:scale-110 group-hover:opacity-50" />
                            <div className="absolute inset-0 bg-linear-to-t from-neutral-900/90 via-neutral-900/90 to-transparent opacity-0
                            group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex space-x-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" 
                                                width="16" height="16" viewBox="0 0 24 24" 
                                                fill="yellow" stroke="#fff94d" strokeWidth="0.5" 
                                                strokeLinecap="round" strokeLinejoin="round" 
                                                className="lucide lucide-star-icon lucide-star">
                                                <path
                                                d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>
                                            </svg> 
                                            <span className="text-yellow-400 text-sm font-medium ">
                                                 {formatrating(movie.vote_average)}
                                            </span>
                                    </div>
                                    <span className="text-neutral-400 text-sm ">   {  movie.release_date?.substring(0,4)}</span>
                                </div>
                               <button className="md:w-full  text-white p-2.5 bg-pink-500 flex justify-center pr-2  rounded font-medium transition-all"  >
                                            <svg  xmlns="http://www.w3.org/2000/svg" 
                                                  width="16" height="16" viewBox="0 0 24 24"
                                                  stroke="#fff" strokeWidth="0.5" fill="none"
                                                  strokeLinecap="round" strokeLinejoin="round"
                                                  className=" text-pink-500 lucide lucide-circle-play-icon lucide-circle-play  m-2">
                                                  <circle cx="12" cy="12" r="10" fill="white"/>
                                                  <path d="M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z"  fill="#f6339a" />
                                            </svg>
                                                <p className="mt-1 pr-2 text-center">View Details</p>
                                </button>
                                </div>
                            </div>

                        </div>
                         <div className="items-center  mb-3 mt-4">
                            <h1 className="text-md text-white font-bold">{movie.title}</h1>
                            <div className="flex justify-between">
                                    <div className="flex space-x-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" 
                                                width="16" height="16" viewBox="0 0 24 24" 
                                                fill="yellow" stroke="#fff94d" strokeWidth="0.5" 
                                                strokeLinecap="round" strokeLinejoin="round" 
                                                className="lucide lucide-star-icon lucide-star">
                                                <path
                                                d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>
                                            </svg> 
                                            <span className="text-yellow-400 text-sm font-medium">
                                                 {formatrating(movie.vote_average)}
                                            </span>
                                    </div>
                                    <span className="text-neutral-400 text-sm "> {  movie.release_date?.substring(0,4)}</span>
                                </div>
                                </div>
                        
                    </div>)
                        

                    })}
                   
                    </div>)}
            </div> 

        </section>
      

    );

}
export default GenreSection;