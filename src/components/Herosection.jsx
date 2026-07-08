import React, { useState,useEffect } from "react";
import { useMovies } from "../context/Moviecontext";
import { getimgUrl,fetchMovieVideos } from "../Services/api";

function Herosection(){
            const {trendingMovies,loading}=useMovies();
            const [trailerkey,setTrailerkey]=useState();
           
        
            const featureMovies=trendingMovies.slice(0,5);
            const [currentSlide,setCurrentSlide]=useState(0);
            const [isTransition,setIsTransition]=useState(false);
          
            
            useEffect(()=>{
                if (loading || featureMovies.length === 0) return;
                const interval=setInterval(()=>{
                    setIsTransition(true);
                    setTimeout(()=>{
                        setCurrentSlide((prev)=>{//prev=0;
                            if(prev===featureMovies.length-1){
                                return 0;
                            }else{
                                return prev+1;
                            } 
                        
                        })
                        setIsTransition(false);//we false here bcz after one transition it should stops check this later on
                    },500)
                },6000);

                return ()=> clearInterval(interval)
            },[loading,featureMovies.length])

            if(loading||featureMovies.length===0){
                return (
                    <div className="w-full bg-neutral-800">
                    <div className="flex items-center justify-center h-screen">
                            <div className=" w-16 h-16  border-3 border-pink-300 border-t-transparent rounded-full  animate-spin"></div><br></br>
                                <p className="text-neutral-400 ">Loading Details.....</p>
                            
                
                </div>
                </div>
                )
                
            }
            const currentMovie=featureMovies[currentSlide];
            const formatrating=(rating)=>{
                
                return (Math.round(rating*10)/10).toFixed(1);
            }
            const handleWatchNow = async (movieId) => {
            const videos = await fetchMovieVideos(movieId);
            const trailer = videos.find(v => v.type === "Trailer" && v.site === "YouTube");
            if (trailer) {
                setTrailerkey(trailer.key);
            } else {
                alert("No trailer available for this movie."); 
                // or better: a toast notification / inline message instead of alert
            }
            };
        
            return (
                <div className="relative w-full h-[60vh] md:h-screen">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                        style={{
                            backgroundImage: currentMovie.backdrop_path
                                ? `url(${getimgUrl(currentMovie.backdrop_path)})`
                                : 'none',
                            opacity:isTransition ? 0 : 1,
                        }}>
                    </div>
                    <div className={`absolute inset-0 bg-black transition-all duration-700
                    ${isTransition ? "opacity-100" : "opacity-0"}`}
                    />

                
                    {/*content*/}
                    <div className="container absolute inset-0 flex items-center  z-10 mx-auto px-4">
                        <div className="max-w-3xl">
                            <div className="transition-all duration-700">
                                <div className=" flex items-center space-x-3 mb-4 ">
                                    <span className="text-white rounded bg-pink-500 pr-1 pl-1">Featured</span>
                                    {currentMovie.vote_average >0 && //why we use conditional rendering here we can aslo use normally
                                    ( <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" 
                                            width="16" height="16" viewBox="0 0 24 24" 
                                            fill="yellow" stroke="#fff94d" strokeWidth="0.5" 
                                            strokeLinecap="round" strokeLinejoin="round" 
                                            className="lucide lucide-star-icon lucide-star">
                                            <path
                                            d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>
                                        </svg> &nbsp;<span className="text-white ">{formatrating(currentMovie.vote_average )}</span>
                                        </div>)}

                                        <span className="text-white">.</span>
                                        <span className="text-white">{currentMovie.release_date?.substring(0,4)}</span>
                                    
                                        {currentMovie.adult && (
                                            //why we used extra node here
                                            <> 
                                                <span className="text-white">.</span>
                                                <span className="text-white bg-neutral-700 w-38 text-center">18+</span>
                                            </>
                                        )}
                                        
                                    </div>
                                    
                                   <div className="text-white mb-7">
                                        <h2 className="font-extrabold text-4xl">{currentMovie.title}</h2><br></br>
                                        <p>{currentMovie.overview}</p>
                                    </div>
                                    <div className="flex ">
                                        {trailerkey && (
                                            
                                                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                                                    <button
                                                            className="absolute md:top-47 md:right-110 top-10  text-white text-xl"
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

                                        <button className="text-white p-2.5 bg-pink-500 flex pr-2 mr-4 rounded font-medium" onClick={()=>handleWatchNow(currentMovie.id)}>
                                            <svg  xmlns="http://www.w3.org/2000/svg" 
                                                  width="16" height="16" viewBox="0 0 24 24"
                                                  stroke="#fff" strokeWidth="0.5" fill="none"
                                                  strokeLinecap="round" strokeLinejoin="round"
                                                  className=" text-pink-500 lucide lucide-circle-play-icon lucide-circle-play  m-2">
                                                  <circle cx="12" cy="12" r="10" fill="white"/>
                                                  <path d="M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z"  fill="#f6339a" />
                                            </svg>
                                                <p className="mt-1 pr-2"> Watch Now</p>
                                        </button>

                                        <button className="text-white p-4 border-gray-400 border bg-neutral-800 flex  rounded   font-medium"> 
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
                            <div className="absolute   gap-2 bottom-8 left-0 right-0 flex  justify-center items-center  ">
                              {/* pagination */}
                            {featureMovies.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setIsTransition(true);
                                        setTimeout(() => {
                                            setCurrentSlide(index);
                                            setIsTransition(false);
                                        }, 500);
                                    }}
                                    className={`w-5 h-2 rounded bg-amber-50 ${currentSlide===index?"w-8 bg-pink-400":"w-4 bg-neutral-400"}`}
                                ></button>
                            ))}
                        </div>
                    </div>
                </div>
             );
}
export default Herosection;