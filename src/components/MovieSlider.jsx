import React, { useState,useRef } from "react";
import { getimgUrl } from "../Services/api";
import { Sliders } from "lucide-react";
import { useMovies } from "../context/Moviecontext";

function MovieSlider({title,movies,subtitle="",id}){
            const [isScrolling,setIsScrolling]=useState(false);
            const [hoverMovieid,setHoverMovieid]=useState(null);
            const { openMovieDetails } = useMovies();
            
            const sildeRef=useRef(null);

            const scroll=(direction)=>{
                if(isScrolling) return;
                const {current}=sildeRef;
                setIsScrolling(true);
                const scrollAmount=direction=="left"?-current.clientWidth *0.75:current.clientWidth *0.75;
                current.scrollBy({left:scrollAmount,behavior:"smooth"});
                setTimeout(()=>{
                    setIsScrolling(false);
                },500)
            };

   
            const formatrating=(rating)=>{
                
                return (Math.round(rating*10)/10).toFixed(1);
            }
            const handleMovieclick=(movieid)=>{
                openMovieDetails(movieid);
            }

            
    
    return(
       <section className="py-11" id={id}>
        <div className="container mx-auto p-5">
            <div className="flex justify-between items-center mb-7 " >
                <div className="text-white font-bold text-2xl md:text-3xl">
                    <h1 >{title}</h1>
                    {subtitle && <p className="text-sm text-neutral-400 mt-2">{subtitle}</p>}
                </div>
                <div className="flex ">
                    <button aria-label="scroll left" onClick={() => scroll("left")} className="mr-1 rounded-full p-2.5 bg-neutral-800/70 hover:bg-neutral-700">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            width="35" height="35" 
                            viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round" 
                            className="lucide lucide-circle-chevron-left-icon lucide-circle-chevron-left" color="white">
                            <circle cx="12" cy="12" r="10" color="#1f1f1f"/>
                            <path d="m14 16-4-4 4-4" color="white"/>
                        </svg>
                    </button >
                    <button  aria-label="scroll right" onClick={() => scroll("right")} className="mr-1 rounded-full p-2.5 bg-neutral-800/70 hover:bg-neutral-700">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                            width="35" height="35" viewBox="0 0 24 24" 
                            fill="none" stroke="currentColor" strokeWidth="2" 
                            strokeLinecap="round" strokeLinejoin="round" 
                            className="lucide lucide-circle-chevron-right-icon lucide-circle-chevron-right "color="white">
                            <circle cx="12" cy="12" r="10"  color="#1f1f1f"/>
                            <path d="m10 8 4 4-4 4" color="white"/>
                        </svg>
                    </button>
                </div>
            </div>
            {/*Movie slider*/ }
            <div className="relative">
                <div className=" md:flex-row flex space-x-4 overflow-x-auto scrollbar-none snap-x pb-4 h-97 " ref={sildeRef} style={{scrollbarWidth:"none",msOverflowStyle:"none"}}>
                {movies && movies.map((movie)=>{
                    return ( <div key={movie.id} className=" w-[30%] shrink-0 md:min-w-60 md:w-auto snap relative group cursor-pointer ">
                        <div 
                         onMouseEnter={()=>setHoverMovieid(movie.id)}
                         onMouseLeave={()=>setHoverMovieid(null)}
                         onClick={()=>handleMovieclick(movie.id)}

                        className="rounded-lg overflow-hidden bg-neutral-800">
                            <div className="relative md:aspect-3/4 h-70 md:h-80">
                            <img 
                            src={getimgUrl(movie.backdrop_path)} alt={movie.title} 
                            className="w-full h-full object-cover transition-all duration-300
                            group-hover:scale-110 group-hover:opacity-35">
                            </img>
                                <div className="absolute inset-0 bg-linear-to-t from-neutral-900/90 via-neutral-900/40 to-transparent 
                                flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                
                                <div className=" absolute bottom-1 left-1.5 right-3 w-full pr-4  p-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 space-y-3">
                                    <div className="flex items-center  md:justify-between">
                                        <div className="flex items-center space-x-1">
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
                                         <span className="text-neutral-400 text-sm ml-24">
                                            {  movie.release_date?.substring(0,4)}
                                         </span>   
                                    </div>
                                    <button className= "text-white p-0 md:p-2.5 text-sm  w-20 sm:w-40  md:w-full bg-pink-500 flex pr-2  rounded md:font-medium" onClick={()=>handleMovieclick(movie)}>
                                            <svg  xmlns="http://www.w3.org/2000/svg" 
                                                  width="16" height="16" viewBox="0 0 24 24"
                                                  stroke="#fff" strokeWidth="0.5" fill="none"
                                                  strokeLinecap="round" strokeLinejoin="round"
                                                  className=" text-pink-500 lucide lucide-circle-play-icon lucide-circle-play md:ml-10 md:m-2 m-2 ml-4">
                                                  <circle cx="12" cy="12" r="10" fill="white"/>
                                                  <path d="M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z"  fill="#f6339a" />
                                            </svg>
                                                <p className="md:mt-1 md:pr-2 ml-2  mt-1"> View Details</p>
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                         {/*movies info*/}
                        <div>
                            <div className="text-white font-bold mt-4">
                                <h1>{movie.title}</h1>
                            </div>
                            <div className="flex text-center ">
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                        width="16" height="16" viewBox="0 0 24 24" 
                                        fill="yellow" stroke="#fff94d" strokeWidth="0.5" 
                                        strokeLinecap="round" strokeLinejoin="round" 
                                        className="lucide lucide-star-icon lucide-star mr-1">
                                        <path
                                        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>
                                </svg> 
                                <span className="text-white text-xs">{formatrating(movie.vote_average)}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <span className="text-neutral-400 text-xs hidden md:block md:ml-34 ml-80">{  movie.release_date?.substring(0,4)} </span>

                            </div>
                        </div>
                    </div>);
                })}
                </div>
            </div>
        </div>
       </section>
    );

}
export default MovieSlider;