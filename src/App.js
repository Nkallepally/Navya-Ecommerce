
import './App.css';
import axios from 'axios';
import Pagination from './pagination';
import { useEffect, useState } from 'react';

function App() {

    const [postPage,setPostPage] = useState([])
    const [hover , setHover] = useState(false)
    const [posts , setPosts] = useState([])

    useEffect(()=>{
      axios.get("https://fakestoreapi.com/products").then((res)=>{
          setPosts(res.data)
          setPostPage(res.data.slice(0 , 3))
          console.log(res.data)
      })
    },[])

    const hoverOn = (e)=>{
      e.preventDefault()
      setHover(true)
      console.log("hoverd")
    }

    const hoverEnd = (e)=>{
      e.preventDefault()
      setHover(false)
    }

    const handlePage = (pages)=>{
      setPostPage(posts.slice((pages*4)-4 , pages*4))
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
      <Pagination posts={posts} handlePage={handlePage}/>
      </>
  );
}

export default App;
