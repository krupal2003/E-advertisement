import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

export const Navbar = ({toggleSidebar}) => {

  const navigate=useNavigate();

  const logout=()=>{
    localStorage.clear();
    navigate("/login");
  }
  return (
    <div className='nav-container'>
      <div className='nav-left'>
        <i className="fa-solid fa-bars"  onClick={() => {
              // console.log("Navbar icon clicked");
              toggleSidebar();
          }}></i> 
          <Link className='navLeft-link'>ADVERTISER</Link>
      </div>
      <div className='logout-btn'>
        <button className='logout' onClick={logout}>LogOut</button>
      </div>
           
    </div>
  )
}
