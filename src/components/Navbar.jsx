import React, { useEffect,useRef,useState } from "react";
import { useMovies } from "../context/Moviecontext";
import { SearchMovies,getimgUrl } from "../Services/api";

function Navbar() {
    
        const {openMovieDetails}=useMovies();//expalin this how just by accesging this we get whole data
        const [isScrolled,setIsScrolled]=useState(false);
        const [isMobilemenuOpen,setIsmobilemenuOpen]=useState(false);
        const [query,setQuery]=useState("");//stores input value
        const [result,setResult]=useState([]);
        const [isloading,setIsloading]=useState(false);
        const [showDropdown,setShowDropdown]=useState(false);
        const searchRef=useRef(null);
        const mobileSearchRef = useRef(null);
        const debounceTimer=useRef(null);

        //filter movie
        const filteredResult = result.filter((movie) =>
            movie.title.toLowerCase().startsWith(query.toLowerCase())//covert query and movie title into lowercase internally so user can type in any format to get results
        );

         // Close dropdown on outside click
        useEffect(() => {
            const handleClickOutside = (e) => {        
                const clickedOutsideDesktop = !searchRef.current || !searchRef.current.contains(e.target);
                const clickedOutsideMobile = !mobileSearchRef.current ||!mobileSearchRef.current.contains(e.target);

                if (clickedOutsideDesktop && clickedOutsideMobile) {
                    setShowDropdown(false);
                    setQuery("");
                }
        
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);//important to remove this function to prevate form memory leak
        }, []);

    
        //handlescroll
        useEffect(()=>{
            const handlescroll=()=>{
                setIsScrolled(window.scrollY>10);
            }
            window.addEventListener("scroll",handlescroll);
            return ()=>window.removeEventListener('scroll',handlescroll);
        },[]);

        // searched movies
        const searchMovie = async (q) => {
        if (!q.trim() || q.trim().length <= 2) {//checks is query is empty and length is <2
            setResult([]);
            setShowDropdown(false);
            return;
        }

        setIsloading(true);
        setShowDropdown(true);

        try {
            const data = await SearchMovies(q);
            setResult(data?.slice(0, 6) || []);
        } catch {
            setResult([]); 
        } finally {
            setIsloading(false);
            
        }
    };
        //input change
        const handleInputChange = (e) => {
            const val = e.target.value;//contains input value from search box
            setQuery(val);
            
            clearTimeout(debounceTimer.current);//cancels old timer other wise api call gor everychar
            debounceTimer.current = setTimeout(() => searchMovie(val), 450);
        };
        

    
    return (
        <header className= {`fixed top-0 left-0 right-0 flex flex-col backdrop-blur-3xl 
        md:backdrop-blur-none justify-center items-center w-full z-50 transition-all duration-300 
        ${isScrolled ?"bg-neutral-900/95 backdrop-blur-md shadow-lg":"bg-transparent"}`}>
            <div className="container flex justify-between md:mx-auto p-2.5">
                <div>
                    <a href="/">
                        <span className="text-pink-400 font-bold text-3xl whitespace-nowrap">
                            Movie <span className="text-blue-100">Verse</span>
                        </span>
                    </a>
                </div>

                <nav className="hidden md:flex space-x-8 text-xl">
                    <a href="#" className="block text-white hover:text-pink-400 transition-colors py-2">Home</a>
                    <a href="#trending" className="block text-white hover:text-pink-400 transition-colors py-2">Trending</a>
                    <a href="#popular" className="block text-white hover:text-pink-400 transition-colors py-2">Polpular</a>
                    <a href="#top-rated" className="block text-white hover:text-pink-400 transition-colors py-2">Top-rated</a>
                </nav>

                {/* search bar dextop */}
                <div className="hidden md:flex relative search-container mt-2 " ref={searchRef}>
                    <div>
                        <input
                            type="text"
                            placeholder="search movies..."
                            value={query}
                            onChange={handleInputChange}
                             onFocus={() => query && setShowDropdown(true)}

                            className="bg-neutral-800/80 text-white border text-md 
                             border-neutral-500 rounded-full px-4 py-2 text-md w-48 focus:w-72
                              transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        
                        <div className="absolute right-2 top-2">
                            {isloading ?(
                                <svg  className="absolute right-1 -z-1 animate-spin"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" color="white" >
                                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                </svg>
                                ):(
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg"
                                width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" color="white">
                                    <path d="m21 21-4.34-4.34" />
                                    <circle cx="11" cy="11" r="8" />
                                </svg>
                            )}
                           
                            
                        </div>

                        {/* dropdown menu */}
                        {showDropdown 
                        && query.trim().length>2
                        && filteredResult.length>0
                        && !isloading &&
                        ( <div className=" absolute -right-6 top-15 bg-neutral-900 rounded-lg w-80  shadow-xl/30 overflow-hidden z-50 ">
                            <ul className="divide-y divide-neutral-700 border-b-2 border-b-gray-700 max-h-93 overflow-y-auto scrollbar-thin scrollbar-thumb-pink-400 scrollbar-track-neutral-900 ">
                                {filteredResult.map((movie) => (
                                    <li key={movie.id} className="hover:bg-neutral-700">
                                        <button className="w-full p-3 flex items-center gap-3 text-left "  onClick={()=>openMovieDetails(movie.id)}>
                                            <div className="h-25 w-20 bg-amber-600 rounded-lg overflow-hidden ">
                                                {movie.poster_path && (
                                                    <img src={getimgUrl(movie.poster_path)} alt={movie.title} className="w-full h-full object-cover " />
                                                ) }
                                            </div>

                                          <div className=" min-w-0 ">
                                                <h4 className="font-bold text-xl text-white ml-2 ">{movie.title}</h4>
                                                <p className="text-md text-neutral-300 ml-1 ">{movie.release_date?.slice(0,4)}</p>
                                           </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    </div>
                    {/* loading state */}
                    {showDropdown &&
                        query.trim().length > 2 &&
                        isloading && (
                            <div className="absolute top-11 left-0 w-72 bg-neutral-800
                             rounded-xl shadow-2xl z-50 overflow-hidden">
                                <div className="p-4 text-center text-neutral-400 text-sm">Searching...</div>
                            </div>
                        )}
                        {showDropdown  && 
                        query.trim().length > 2 &&
                        (!result || result.length === 0)&&
                        !isloading && (<div className="absolute top-11 left-0 w-72 bg-neutral-800 rounded-xl shadow-2xl z-50 overflow-hidden">
                                    <div className="p-5 text-center">
                                        <div className="text-3xl mb-2">🎬</div>
                                        <p className="text-white text-sm font-medium">No movies found</p>
                                        <p className="text-neutral-400 text-xs mt-1">Try a different title</p>
                                    </div>
                                </div>) }

                    </div>
                    {/* mobile menu card */}
                    <button className="md:hidden text-white" onClick={()=>setIsmobilemenuOpen(!isMobilemenuOpen)}>
                        {isMobilemenuOpen?(
                            <svg xmlns="http://www.w3.org/2000/svg" 
                        width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                        ):(
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
                        strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 5h16" />
                            <path d="M4 12h16" />
                            <path d="M4 19h16" />
                        </svg>)}
                        
                        
                    </button>
                </div>
           

            {/* mobile navigation */}
            {isMobilemenuOpen &&(  <div className="mt-2 pb-4 space-y-4 text-center ">
                <div className="space-y-4 md:hidden">
                <a href="#" className="block text-white hover:text-pink-400  transition-colors py-2">Home</a>
                <a href="#trending" className="block text-white hover:text-pink-400  transition-colors py-2">Trending</a>
                <a href="#popular" className="block text-white hover:text-pink-400  transition-colors py-2">Polpular</a>
                <a href="#top-rated" className="block text-white  hover:text-pink-400 transition-colors py-2">Top-rated</a>
                </div>

                {/* search bar mobile */}
                <div className=" md:hidden relative search-container right-2 "ref={mobileSearchRef}>
                   <input
                            type="text"
                            placeholder="search movies..."
                            value={query}
                            onChange={handleInputChange}
                             onFocus={() => query && setShowDropdown(true)}

                            className="bg-neutral-800/80 text-white border text-md
                              border-neutral-500 rounded-full px-4 py-2 text-md w-48 focus:w-72 
                              transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    <div className="absolute right-2 top-1.5">
                        {isloading ?(
                            <svg  className="absolute right-1  animate-spin"
                            xmlns="http://www.w3.org/2000/svg" width="24" 
                            height="24" viewBox="0 0 24 24" fill="none" 
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                             strokeLinejoin="round" color="white" >
                                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                            </svg>):( 
                            <svg className=" w-6 h-6"
                             xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                             viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
                             strokeLinecap="round" strokeLinejoin="round" color="white">

                                <path d="m21 21-4.34-4.34" />
                                <circle cx="11" cy="11" r="8" />
                            </svg>
                        )}
                        {showDropdown 
                        && query.trim().length>2
                        && filteredResult.length>0
                        && !isloading &&(
                             <div className="absolute -right-15 top-10 bg-neutral-800 rounded-lg w-90 h-80 shadow-xl/30 overflow-hidden z-50">
                            <ul className="divide-y divide-neutral-700 border-b-2 border-b-gray-700">
                                {filteredResult.map((movie) => (
                                     <li key={movie.id} className="hover:bg-neutral-700 flex justify-between">
                                    <button className="w-full flex text-center justify-items-center p-2 h-20" onClick={()=>openMovieDetails(movie.id)}>
                                        <div className="h-15 w-15 bg-amber-900 rounded-lg overflow-hidden">
                                            {movie.poster_path && (
                                                    <img src={getimgUrl(movie.poster_path)} alt={movie.title} className="w-full h-full object-cover ">
                                                        </img>
                                                ) }
                                                </div>
                                            <div className="min-w-0 ml-4">
                                            <h4 className="font-bold text-md text-white ml-1">{movie.title}</h4>
                                            <p className=" text-neutral-300 mr-3">{movie.release_date?.slice(0,4)}</p>
                                            </div>
                                       
                                    </button>
                                </li>))}
                               
                            </ul>
                        </div>)
                       }

                       {showDropdown &&
                        query.trim().length > 2 &&
                        isloading && (
                            <div className="absolute top-11 -right-15 w-90 bg-neutral-800 rounded-xl shadow-2xl z-50 overflow-hidden">
                                <div className="p-4 text-center text-neutral-400 text-sm">Searching...</div>
                            </div>
                        )}
                        {showDropdown  && 
                        query.trim().length > 2 &&
                        (!result || result.length === 0)&&
                        !isloading && (<div className="absolute top-11 -right-15 w-90 bg-neutral-800 rounded-xl shadow-2xl z-50 overflow-hidden">
                                    <div className="p-5 text-center">
                                        <div className="text-3xl mb-2">🎬</div>
                                        <p className="text-white text-sm font-medium">No movies found</p>
                                        <p className="text-neutral-400 text-xs mt-1">Try a different title</p>
                                    </div>
                                </div>) }
                    </div>
                </div>
            </div>)}
          
        </header>
    );
}

export default Navbar;
