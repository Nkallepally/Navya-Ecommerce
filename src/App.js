import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Pagination from './pagination';
import "./App.css"
import Modal from 'react-bootstrap/Modal';


const App = () => {

    const showperpage = 10;
    const [pagenation , setpagenation] = useState({
        start : 0,
        end : showperpage
    })

    const [get,setget] = useState(true)
    const [alldata,setalldata]=useState([])
    const [data,setdata] = useState([])
    const [pop,setpop] = useState({})
    const [show, setshow] = useState(false)

    const handleShow = () => setshow(true);
    const handleClose = () => setshow(false);


    useEffect(()=>{
     axios.get("https://fakestoreapi.com/products").then((data)=>{
      console.log(data.data)
      setdata(data.data)
      setalldata(data.data)
     })
    },[get])

    const handleSelect = (e)=>{
      if(e.target.value ==="all"){
         setget(!get)
      }else{
        const newdata = alldata.filter((item)=>{
          return item.category.includes(e.target.value)
         })
         setdata(newdata)
      }
    }

    const handlePopUp = (item)=>{
      setpop(item)
      handleShow()
    }

    const onPaginationChange = (start,end)=>{
        setpagenation({start : start,end : end})
    }

    const closePopUp = ()=>{
      handleClose()
    }

  return (
    <div>
      <div className='header'>
        <h2>Available Products</h2>
      </div>
      <div className='select'>
              <select onChange={(e)=>handleSelect(e)}>
                <option value="all">All</option>
                  <option value="electronics">Electronics</option>
                  <option value="men" >men's clothing</option>
                  <option value="jewellery" >jewellery</option>
                  <option value="women">women's clothing</option>
              </select>
      </div>
      <div className='main-body'>
        {
        data.slice(pagenation.start , pagenation.end).map((item,idx)=>{
            return (
              <div key={idx} className="imagesection" onClick={()=>handlePopUp(item)}>
                <img src={item.image} alt="Not Found"/>
              </div>
            )
        })
        }
      </div>
      <div className='pagination'>
        <Pagination showPerPage ={showperpage} total = {data.length} onPaginationChange = {onPaginationChange}/>
      </div>
      <Modal show={show} onHide={handleClose} animation={false} centered
          style={{ marginLeft: "35%", marginTop: "5%", width: "500px", height: "400px", lineHeight: "25px", textAlign: "center" }}>
          <Modal.Body>
             <div>
               <div className='heading'>
                <span>{pop.category}</span>
                <button onClick={()=>closePopUp()}>Close</button>
               </div>
               <div className='modalbody'>
                <img src={pop.image} alt="Not Found"/>
                <span style={{"textAlign":"left","marginLeft":"20px"}}> <span style={{"fontWeight":"bold"}}>Desricption :</span> {pop.description}</span>
               </div>
             </div>
          </Modal.Body>
        </Modal>
    </div>
  )
}

export default App