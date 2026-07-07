import React from "react"
import Navbar from "./components/Navbar";
import Moviecontent from "./components/Moviecontent";
import Footer from "./components/Footer";
import { MoviesProvider } from "./context/Moviecontext";
function App() {
 return(
  <MoviesProvider>
  <div className="min-h-screen">
    <Navbar/>
    <main>
    <Moviecontent/>
    </main>
   <Footer></Footer>
  </div>
  </MoviesProvider>
);
  
}

export default App
