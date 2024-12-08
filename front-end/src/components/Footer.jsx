import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div>
      <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item"><Link to="/" className="nav-link px-2 text-dark">Home</Link></li>
          <li className="nav-item"><Link to="/" className="nav-link px-2 text-dark">Features</Link></li>
          <li className="nav-item"><Link to="/" className="nav-link px-2 text-dark">Pricing</Link></li>
          <li className="nav-item"><Link to="/" className="nav-link px-2 text-dark">FAQs</Link></li>
          <li className="nav-item"><Link to="/" className="nav-link px-2 text-dark">About</Link></li>
        </ul>
        <p className="text-center text-dark">© 2023 FoodHut Inc</p>
      </footer>
    </div>
  )
}
