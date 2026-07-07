import React, { useEffect, useState } from "react";
function ScrollToTop(){
    const [isVisible,setIsVisible]=useState(false);
    const toggleVisibility=()=>{
        if(window.pageYOffset>300){
            setIsVisible(true);
        }
        else{
            setIsVisible(false);
        }
    }
    const scrollToTop=()=>{
        window.scrollTo({ top:0,
            behavior:"smooth",
        })
    }
    useEffect(()=>{
        window.addEventListener("scroll",toggleVisibility);
        return ()=>{
            window.removeEventListener("scroll",toggleVisibility)
        }
    },[])
    return(
        <div className="fixed bottom-6 right-6 z-40">
            <button type="button" onClick={scrollToTop} className={`bg-pink-400 text-white p-2.5 rounded-full shadow-lg
            transition-all duration-300 focus:outline-none hover:bg-pink-500 ${isVisible ?"opacity-100 translate-y-0":"opacity-0 translate-y-10 pointer-events-none"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" 
                    width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round" 
                    className="lucide lucide-arrow-up-icon lucide-arrow-up">
                    <path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>
                </svg>
            </button>
        </div>

    );

}
export default ScrollToTop;