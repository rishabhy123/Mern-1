import Cards from '../components/Cards'
import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    response = await response.json();
    setFoodItem(response[0])
    setFoodCat(response[1])
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
      <div><Navbar /></div>
      <div> <div id="carouselExampleFade" className="carousel slide carousel-fade" >
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="https://source.unsplash.com/random/50?pizza" className="d-block w-100" style={{height:"80vh", objectFit:"cover"}} alt="https://source.unsplash.com/random/50?pizza"/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/50?burger" className="d-block w-100" style={{height:"80vh", objectFit:"cover"}} alt="https://source.unsplash.com/random/50?burger"/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/50?cake" className="d-block w-100" style={{height:"80vh", objectFit:"cover"}} alt="https://source.unsplash.com/random/50?cake"/>
    </div>
    <div className="carousel-caption d-none d-md-block" style={{zIndex:"10"}}>
    <div className="d-flex justify-content-center">
    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
  </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div></div>
      <div className='container'>
        {
          foodCat !== []
            ? foodCat.map((data) => {
              return (
                <div className='row mb-3'>
                <div key={data._id} className='fs-3 3-3'>
                  {data.CategoryName}
                </div>
                 <hr/>
                 {foodItem !== []
                 ? foodItem.filter((item)=>(item.CategoryName===data.CategoryName)&&(item.name.toLowerCase().includes(search.toLowerCase())))
                 .map((filterItems)=>{
                  return(
                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                      <Cards foodItem={filterItems}
                      options={filterItems.options[0]}
                   
                      descriptionFood={filterItems.description}></Cards>
                    </div>
                  )}
                ):<div>No data</div>}
                 </div>
               
              )
            })
            : ""
        }
       
      </div>
      <div><Footer /></div>
    </>
  )
}
