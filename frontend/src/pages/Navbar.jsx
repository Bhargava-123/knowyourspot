import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './css/Navbar.css'
import {Link} from 'react-router-dom'

export default function Navbar() {
  return (
    <div className="Navbar">
            <div className="LogoContainer">
                <Link to = "/home" className="Logo">
                    <h1>knowyourspot(ify)</h1>
                </Link>
            </div>
            <div className="MenuContainer">
                <Link to="/about"  className="menu_item"><h4>About</h4></Link>
                <h4 className="menu_item"> &nbsp; | &nbsp;</h4>
                <h4 className="menu_item">Login</h4>
            </div>
    </div>
  )
}
