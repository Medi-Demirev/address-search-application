import { useState, useEffect } from "react";
import { v4 as uuid } from 'uuid';

import CurrentAddress from "../CurrentAddress/CurrentAddress";
import Footer from "../Footer/Footer";
import Search from "../Search/Search";


const HomePage =() => {
    const data = JSON.parse(localStorage.getItem("input")) || []; 
    const [input, setInput] = useState(data);

    const id = uuid();
  
    const handleOnSearchChange =  ( searchData) => {
      if(searchData){
        
        setInput([...input,  {address:searchData.label,  id:id} ])
      }
      return null 
    };
  
   useEffect(()=>{
    
    localStorage.setItem("input", JSON.stringify(input))
   },[input]);

    return(
        <>
        <Search onSearchChange={handleOnSearchChange} />
        { input && <CurrentAddress  data={input} />}
         <Footer/>
        </>
    )
};
export default HomePage;