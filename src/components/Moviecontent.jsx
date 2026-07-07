import React from "react";
import Herosection from "./Herosection";
import MovieSlider from "./MovieSlider";
import GenreSection from "./genreSection";
import MovieDetails from "./MovieDetails";
import ScrollToTop from "./scrollTop";
import { useMovies } from "../context/Moviecontext";

function Moviecontent(){
    const {trendingMovies,popularMovies,topratedMovies,selectMovieID,error,closeMovieDetails}=useMovies();
    
        
  
    
  
    return (
      
        <>
        <Herosection/>
        <div className="bg-linear-to-b from-neutral-900 to-neutral-950">
            <MovieSlider title="Trending this week" subtitle="Stay updated with what everyone's wathin"
             movies={trendingMovies} id="trending" ></MovieSlider>
              <MovieSlider title="Popular Movies" subtitle="Most watched movies right now"
             movies={popularMovies} id="popular" ></MovieSlider>
            <GenreSection id="browse by genre"></GenreSection>
             <MovieSlider title="Top Rated Movies" subtitle="Highest Rated movies of all time"
             movies={topratedMovies} id="top-rated" ></MovieSlider>
            {selectMovieID && <MovieDetails movieid={selectMovieID} onclose={closeMovieDetails}></MovieDetails>}
            <ScrollToTop></ScrollToTop>

        </div>
        
        </>);
  }
export default Moviecontent;
