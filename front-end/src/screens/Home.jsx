import Cards from '../components/Cards'
import  { useEffect, useState } from 'react'
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
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="https://plus.unsplash.com/premium_photo-1677000666761-ff476a65c8ba?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGFzdGF8ZW58MHx8MHx8fDA%3D" className="d-block w-100" style={{ height: "80vh", objectFit: "cover" }} alt="food" />
            </div>
            <div className="carousel-item">
              <img src="https://plus.unsplash.com/premium_photo-1677000666761-ff476a65c8ba?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGFzdGF8ZW58MHx8MHx8fDA%3D" className="d-block w-100" style={{ height: "80vh", objectFit: "cover" }} alt="food" />
            </div>
            <div className="carousel-item">
              <img src="https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGl6emF8ZW58MHx8MHx8fDA%3D" className="d-block w-100" style={{ height: "80vh", objectFit: "cover" }} alt="food" />
            </div>
            <div className="carousel-caption d-none d-md-block" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
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
        </div>
      </div>

      <div className='container'>
        {
          foodCat.length > 0
            ? foodCat.map((data) => {
              return (
                <div className='row mb-3' key={data._id}>
                  <div className='fs-3'>
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItem.length > 0
                    ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) && item.name.toLowerCase().includes(search.toLowerCase()))
                      .map((filterItems) => {
                        return (
                          <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                            <Cards foodItem={filterItems}
                              options={filterItems.options[0]}
                              descriptionFood={filterItems.description} />
                          </div>
                        )
                      })
                    : <div>No data</div>
                  }
                </div>
              )
            })
            : <div>Loading...</div>
        }
      </div>
      <div><Footer /></div>
    </>
  )
}
