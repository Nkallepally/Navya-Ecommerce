
import './App.css';
import axios from 'axios';
import Pagination from './pagination';
import { useState } from 'react';

function App() {

    const [postPage,setPostPge] = useState([])
    const [hover , setHover] = useState(false)

    const hoverOn = (e)=>{
      e.preventDefault()
      setHover(true)
      console.log("hoverd")
    }

    const hoverEnd = (e)=>{
      e.preventDefault()
      setHover(false)
    }

  return (
      <>
      {
        postPage.map((user)=>{
          return(
            <>
              {hover && <p className={hover}>{user.description}</p>}
              <img onMouseEnter={(e)=>{hoverOn(e)}} onMouseLeave={(e)=>{hoverEnd(e)}} src={user.image} alt="Not Found" />
            </>
          )
        })
      }
      </>
  );
}

export default App;
