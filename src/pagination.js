import React from "react";
import "./pagination.css"

const Pagination = ({posts , handlePage})=>{

    let pages = []
    for(let i = 1 ; i < Math.ceil(posts.length/4)+1 ; i++){
        pages.push(i)
    }

    return(
        <>
            <center>
                {pages.map((page)=>
                <div className="pagenum" onClick={()=>{handlePage(page)}}> {page} </div>)}
            </center>
        </>
    )
}

export default Pagination