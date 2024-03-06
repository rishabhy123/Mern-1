import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import Modal from '../../Model';
import Cart from '../screens/CArt';
import { useCartState } from './ContextReducer';
export default function Navbar() {
  let data  = useCartState();
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const handleClick=()=>{
    localStorage.removeItem("authToken");
    navigate("/Login");
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <Link className="navbar-brand fs-1" to="/">FoodHut</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item active">
              <Link className="nav-link active fs-5" to="/">Home</Link>
            </li>
            {(localStorage.getItem("authToken")) ?
              <li className="nav-item active">
                <Link className="nav-link active fs-5" to="/myorder">My Orders</Link>
              </li>

              : ""}

          </ul>
          {(!localStorage.getItem("authToken")) ?
            <div className='d-flex'>
              <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
              <Link className="btn bg-white text-success mx-1" to="/CreateUser">Sign-Up</Link>
            </div>
            :
            <div>
           <div className='btn bg-white text-success mx-2' onClick={()=>{setCartView(true)}}>
            My Cart{" "}
            <Badge pill bg='danger'>{data.length}</Badge>
           </div> 
           {cartView?<Modal onClose={()=>{setCartView(false)}}> <Cart /> </Modal>: null}  
           <div className='btn bg-danger text-white mx-2' onClick={handleClick}>
           Logout
           </div>  
           </div> 
          }


        </div>
      </nav>
    </div>
  )
}
