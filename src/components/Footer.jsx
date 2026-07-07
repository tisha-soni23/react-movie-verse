import React from "react";
function Footer(){
    return(
        <footer className="bg-neutral-900 text-neutral-400 border-t border-neutral-800">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
                    <div >
                        <a href="/">
                            <span className="text-pink-400 font-bold text-2xl whitespace-nowrap ">
                                Movie <span className="text-blue-100">Verse</span>
                            </span>
                        </a>
                        <p className="mt-4">Discover and explore the latest movies from around thw world.
                            MovieVerse gives you access to a vast collection of flims across all genres.
                        </p>
            
                         {/*icons*/}
                        <div className="mt-2">
                            <a href="https://x.com/themoviedb" className="text-neutral-500 hover:text-pink-400 mr-2">
                                <i className="fa-brands fa-twitter text-xl"></i>
                            </a>
                            <a href="/" className="text-neutral-500 hover:text-pink-400 m-2">
                                <i className="fa-brands fa-instagram text-xl"></i>
                            </a>
                            <a href="https://www.facebook.com/themoviedb" className="text-neutral-500 hover:text-pink-400 m-2">
                                <i className="fa-brands fa-square-facebook text-xl"></i>
                            </a>
                        </div>
                    </div>
                    <div className="space-y-1.5" >
                        <h1 className="text-xl mb-3 font-bold text-white">Quick links</h1>
                            <ul>
                                <li><a href="#" className="block text-neutral-400 hover:text-pink-400 transition-colors ">Home</a></li>
                                <li><a href="#trending" className="block text-neutral-400 hover:text-pink-400 transition-colors ">Trending</a></li>
                                <li><a href="#popular" className="block text-neutral-400 hover:text-pink-400 transition-colors ">Polpular</a></li>
                                <li><a href="#top-rated" className="block text-neutral-400 hover:text-pink-400 transition-colors ">Top-rated</a></li>
                                <li><a href="#browse by genre" className="block text-neutral-400 hover:text-pink-400 transition-colors ">Browse by Genre</a></li>
                            </ul>
                    </div>
                    <div className="space-y-1.5">
                       <h1 className="text-xl mb-3 font-bold text-white">Resources</h1>
                            <ul>
                                <li><a href="https://www.themoviedb.org/about" target="_blank" rel="noopener noreferrer" className="block text-neutral-400 hover:text-pink-400 transition-colors ">About us</a></li>
                                <li><a href="https://www.themoviedb.org/about/get-in-touch/" target="_blank" rel="noopener noreferrer" className="block text-neutral-400 hover:text-pink-400 transition-colors ">Contact</a></li>
                                <li><a href="#blog" className="block text-neutral-400 hover:text-pink-400 transition-colors ">Blog</a></li>
                                <li><a href="https://www.themoviedb.org/faq/general" className="block text-neutral-400 hover:text-pink-400 transition-colors ">FAQ</a></li>
                                <li><a href="https://www.themoviedb.org/talk" target="_blank" rel="noopener noreferrer" className="block text-neutral-400 hover:text-pink-400 transition-colors ">Help Center</a></li>
                            </ul>
                    </div>
                    <div className="space-y-1.5">
                        <h1 className="text-xl mb-3 font-bold text-white">Newsletter</h1>
                        <p className="mb-2">Stay up to date with the latest movies and news</p>
                        <div>
                            <form>
                                <input
                                type="email"
                                placeholder="Your email address"
                                className="bg-neutral-800/80 text-white rounded-lg px-4 py-2 text-sm w-full mt-2  focus:outline-none focus:ring-2 focus:ring-blue-300"/>
                            </form>
                        <button className="px-4 py-2 font-bold w-full text-white rounded-lg mt-4 bg-pink-400 hover:bg-pink-500 transition-all ">Subscribe</button>
                        </div>
                    </div>
                </div>
                 <div className=" mt-9 border-t  border-neutral-700 w-full flex flex-col md:flex-row justify-between mb-3">
                    <div className=" text-neutral-400 mt-6 text-sm" >
                        <i className="fa-regular fa-copyright mt-1.5 mr-1"></i>
                        <span className="mr-1.5">2026 MovieVerse. All rights reserved. <br className="md:hidden"></br></span>
                            <span className="hidden md:inline">.</span>
                         <span>Powered by{" "}
                            <a href="https://www.themoviedb.org/" className="text-pink-400 hover:text-pink-500 ">TMDB API</a>
                             
                            </span>  
                    </div>
                    <div className="flex space-x-3 mt-6 text-sm">
                        <a href='https://www.themoviedb.org/privacy-policy' className="hover:text-pink-500">Privacy Policy</a>
                        <a href='https://www.themoviedb.org/terms-of-use' className="hover:text-pink-500">Terms of Services</a>
                        <a href='https://www.themoviedb.org/api-terms-of-use' className="hover:text-pink-500">Cookie Policy</a>
                    </div>
                    
                </div>
            </div>
        </footer>
    );
}
export default Footer;