import React, { useEffect, useState } from "react";
import { fetchMoviesDetails, fetchMovieVideos, getimgUrl } from "../Services/api";
import { useMovies } from "../context/Moviecontext";

function MovieDetails({onclose,movieid}){
            const {genre}=useMovies();
            const [trailerkey,setTrailerkey]=useState();
            const [movie,setMovie]=useState(null);
            const [isloading,setIsloading]=useState(true);
            const [error,setError]=useState(null);

            useEffect(()=>{
                async function getMovieDetails(){
                    try{
                        setIsloading(true);
                        const data=await fetchMoviesDetails(movieid);
                        setMovie(data);
                        setError(null);
                    }
                    catch(err){
                        setError("Failed to load movie details.");
                    }
                    finally{
                        setIsloading(false);
                    }
                }
                if(movieid){
                    getMovieDetails();
                }
            },[movieid]);

            if(!movieid) return null;

            const formatRuntime = (minutes) => {
                if (!minutes) return "N/A";
                const hours = Math.floor(minutes / 60);
                const remainingMinutes = minutes % 60;
                return `${hours}h ${remainingMinutes}m`;
            };

            const formatRevenue = (revenue) => {
                if (!revenue) return "N/A";
                return new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    notation: "compact",
                    maximumFractionDigits: 1,
                }).format(revenue);
            };
            const formatrating=(rating)=>{
                
                return (Math.round(rating*10)/10).toFixed(1);
            }
            const handlemovievideo=async(movieId)=>{
                const video=await fetchMovieVideos(movieId)
                const trailer=video.find(v=>v.type=="Trailer" && v.site=="YouTube");
                if(trailer){
                    setTrailerkey(trailer.key)
                }
                else{
                    alert("no trailer found")
                }
                
               
            }

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/95 backdrop-blur-sm overflow-auto ">
         <div className="relative w-full max-w-5xl bg-neutral-800 rounded-lg shadow-xl h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-900">
                <button className="absolute top-10 right-4 z-10 p-2 rounded-full bg-neutral-700/80 text-white hover:bg-neutral-600/80 transition-all" onClick={onclose}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                        strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-icon lucide-x">
                        <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                    </svg>
                </button>

                {isloading ? (
                    <div className="flex items-center justify-center h-96">
                        <div className="flex flex-col items-center justify-center">
                            <div className="w-16 h-16 border border-pink-300 border-t-transparent rounded-full animate-spin" />
                            <p className="text-white mt-4">Loading Details.....</p>
                        </div>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center h-96">
                        <div className="flex flex-col justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" 
                                width="50" height="50" viewBox="0 0 24 24" 
                                fill="none" stroke="#ca1212" strokeWidth="2" 
                                strokeLinecap="round" strokeLinejoin="round" 
                                className="lucide lucide-triangle-alert-icon lucide-triangle-alert">
                                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/>
                                <path d="M12 9v4"/><path d="M12 17h.01"/>
                            </svg>
                            <p className="text-xl text-white font-bold mt-4">Failed to load Movies detailes</p>
                            <span className="text-neutral-400">{error}</span>
                            <button className="bg-pink-400 rounded-md hover:bg-pink-500 p-2 pr-4 pl-4
                             text-white mt-10" 
                             onClick={onclose}>Close</button>
                        </div>
                    </div>
                ) : movie ? (
                    <div>
                        <div className="relative h-72 md:h-96 w-full bg-amber-200">
                            {movie.backdrop_path?( 
                                <img src={getimgUrl(movie.backdrop_path)} alt={movie.title}
                                 className="w-full h-full object-cover" />
                        ):(<div className="w-full h-full object-cover"> </div>)}
                           
                            <div className="absolute inset-0 bg-linear-to-t from-neutral-800 via-neutral-800/70 to-transparent"></div>
                        </div>
                          
                        <div className="p-6 md:p-8">
                            <div className="md:flex gap-8">
                                <div className="w-32 md:w-64 shrink-0 mb-4 md:mb-0">
                                    <div className="rounded-lg shadow-lg  border border-neutral-300">
                                        {movie.poster_path?(
                                             <img src={getimgUrl(movie.poster_path)} alt={movie.title} className="w-full h-auto"/>
                                             ):(  
                                             <div className="w-full aspect-2/3 bng-neutral-700 flex items-center justify-center text-white text-xl font-bold">
                                            No poster Available
                                        </div>
                                   
                                    )}
                                     </div>
                                </div>
                                       
                                      {/* movieinfo */}
                                <div className="flex-1">
                                    <h1 className="text-3xl md:text-4xl font-bold text-white">
                                        {movie.title}
                                        {movie.release_date &&( <span className="text-neutral-400 font-normal ml-2">({movie.release_date.substring(0,4)})</span>)}
                                       
                                    </h1>
                                    <div className="flex flex-wrap  gapx-4 gap-x-2 mt-3 text-sm items-start">
                                        {movie.vote_average>0 &&(
                                            <div className="flex items-center">
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
                                        </div>)}
                                        {movie.runtime>0 &&( <span className="text-neutral-300">{formatRuntime(movie.runtime)}</span>)}
                                        {movie.release_date &&(<span className="text-neutral-300">{movie.release_date}</span>)}
                                        {movie.adult &&( <span className="text-white bg-red-600 p-1 rounded pr-2 pl-2">18+</span>)}
                                       {/* genre */}
                                    </div>
                                    {movie.genre && movie.genre.length>0 && 
                                    (<div className="mt-5 flex flex-wrap gap-2">
                                        {movie.genre.map((genre)=>{
                                            <span key={genre.id} className="text-neutral-300 
                                            text-sm mt-5 bg-neutral-700  px-3 py-1 rounded-full">
                                            { genre.name}</span>
                                        })}
                                        
                                    </div>)}
                                    {/* tagline */}
                                    {movie.tagline &&( <div className="mt-5">
                                        <span className="text-neutral-300 italic ">"{movie.tagline}"</span>
                                    </div>)}
                                    {movie.overview && (
                                        <div className="mt-5">
                                            <div className="font-bold text-xl text-white">
                                                <span>Overview</span>
                                            </div>
                                            <div className="text-neutral-300 mt-2">
                                                <span>{movie.overview}</span>
                                            </div>
                                        </div>
                                    )}
                
                                   {/* buttons */}
                                    <div className="mt-6 flex flex-wrap gap-3">
                                         {trailerkey && (
                                            
                                                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                                                    <button
                                                            className="absolute top-20 right-50 text-white text-xl"
                                                            onClick={() => setTrailerkey(null)}
                                                        >
                                                            ✕
                                                    </button>
                                                    <iframe
                                                        width="800"
                                                        height="450"
                                                        src={`https://www.youtube.com/embed/${trailerkey}?autoplay=1`}
                                                        title="Trailer"
                                                        allow="autoplay; encrypted-media"
                                                        allowFullScreen
                                                    />
                                                </div>
                                            )}
                                        <button className="bg-pink-400 hover:bg-pink-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors" onClick={()=>handlemovievideo(movie.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" 
                                                width="16" height="16" viewBox="0 0 24 24"
                                                stroke="#fff" strokeWidth="0.5" fill="none"
                                                strokeLinecap="round" strokeLinejoin="round"
                                                className="text-pink-500 lucide lucide-circle-play-icon lucide-circle-play m-2">
                                                <circle cx="12" cy="12" r="10" fill="white"/>
                                                <path d="M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z" fill="#f6339a" />
                                            </svg>
                                            <p className="mt-1 pr-2 text-center">Watch Now</p>
                                        </button>
                                        <button className="text-white p-4 border-gray-400 border bg-neutral-800 flex rounded font-medium"> 
                                            <svg xmlns="http://www.w3.org/2000/svg" 
                                                width="24" height="24" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" strokeWidth="2" 
                                                strokeLinecap="round" strokeLinejoin="round" 
                                                className="lucide lucide-plus-icon lucide-plus">
                                                <path d="M5 12h14"/>
                                                <path d="M12 5v14"/>
                                            </svg>
                                            <p className="ml-2 mr-2">Add to watch List</p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 ">
                                <div>
                                    <h2 className="font-bold text-white mb-3 ">Details</h2>
                                
                                <div className="space-y-3">

                                    {movie.production_companies && movie.production_companies.length >0 && 
                                    (<div className="text-neutral-400 text-sm ">
                                        <h3 className="text-neutral-400 text-sm ">Production Companies</h3>
                                        <p className="text-white">{movie.production_companies.map((company)=>company.name).join(",")}</p>
                                    </div>
                                    )}
                                    {movie.production_countries && movie.production_countries.length >0 && 
                                        (<div className="text-neutral-400 text-sm ">
                                            <h3 className="text-neutral-400 text-sm ">Production Companies</h3>
                                            <p className="text-white">{movie.production_countries.map((country)=>country.name).join(",")}</p>
                                        </div>
                                    )}
                                    {movie.spoken_languages && movie.spoken_languages.length>0 && 
                                    ( <div className="text-neutral-400 text-sm ">
                                        <h3 className="text-neutral-400 text-sm ">Languages</h3>
                                        <p className="text-white"> {movie.spoken_languages.map((lang)=>lang.name).join(",")}</p>
                                    </div>
                                    )}

                                   {movie.budget && movie.budget>0  &&
                                   (<div className="text-neutral-400 text-sm ">
                                        <h3 className="text-neutral-400 text-sm ">Budget</h3>
                                        <p className="text-white"> {formatRevenue(movie.budget)}</p>
                                    </div>)}
                                    
                                    {movie.revenue && movie.revenue>0 && (
                                    <div className="text-neutral-400 text-sm ">
                                        <h3 className="text-neutral-400 text-sm ">Revenue</h3>
                                        <p className="text-white">{formatRevenue( movie.revenue)}</p>
                                    </div>)}
                                    
                                    {movie.status && (<div className="text-neutral-400 text-sm ">
                                        <h3 className="text-neutral-400 text-sm ">status</h3>
                                        <p className="text-white">{movie.status}</p>
                                    </div>)}
                                    
                                    {movie.original_language && (<div className="text-neutral-400 text-sm ">
                                        <h3 className="text-neutral-400 text-sm ">Original Language</h3>
                                        <p className="text-white">{movie.original_language}</p>
                                    </div>)}
                                    </div>
                                </div>
                           
                            <div className="flex flex-col ">
                                {movie.vote_average >0 ? 
                                (<> 
                                <h2 className="font-bold text-white mb-4">Rating</h2> 
                                <div className="flex items-center ">
                                    <div className="w-24 h-24 rounded-full border-5 border-pink-500 flex items-center justify-center mr-4">
                                        <span className="text-3xl font-bold text-white">{formatrating(movie.vote_average)}</span>
                                    </div>
                                <div className="flex flex-col gap-1">          
                                <p className="text-neutral-300 text-sm ">
                                    From {movie.vote_count?.toLocaleString()} votes
                                </p>
    
                                <div className="w-50  bg-neutral-700 rounded-full h-2.5 mt-2">
                                    <div className="bg-pink-400 rounded-full h-full" style={{width:`${(movie.vote_average/10)* 100}%`}}></div>
                                </div>
                             </div>
                             </div>
                                </>
                            ):( <p className="text-neutral-400">No Rating Available</p>)}
                               
                                
                               
                            
                            <div className="mt-8  flex items-center space-x-5 ">
                                {movie.homepage && (
                                    <a href={movie.homepage}  className="inline-flex items-center bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded transition-all">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                        className="lucide lucide-globe-icon lucide-globe">
                                        <circle cx="12" cy="12" r="10"/>
                                        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
                                        <path d="M2 12h20"/>
                                    </svg>
                                    official website
                                </a>)}
                                {movie.imdb_id && ( 
                                     <a href={`https://www.imdb.com/title/${movie.imdb_id}`}
                                 className=" inline-flex items-center bg-yellow-700 hover:bg-yellow-600
                                         text-white px-4 py-2   rounded transition-colors">
                                        View on IMDB
                                </a>)}
                                
                              
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );

}
export default MovieDetails;