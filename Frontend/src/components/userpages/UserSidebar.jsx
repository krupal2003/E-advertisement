import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/img/logo.png'
import { UserDash } from './UserDash'


export const UserSidebar = ({isOpen,toggleSidebar,isDashBarHalf}) => {
  return (
    <div className='main-app'>
    <div className={`sidebar-container ${isOpen ? "open":"closed"}`}>
        <div className='sideHeader'>
          <Link to={"/"} className='brand-sec'>
            <img src={logo} alt="logo" className='logo-img'/>
            <span className='brand-link'>AdVison</span> 
          </Link>
          <hr />
        </div>
        <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/user" className='nav-links'>
            <i class="fas fa-home"></i>
            <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/user/newbooking" className='nav-links'>
            <i class="fas fa-plus-circle"></i>
            <span>New Booking</span>
            </Link>
          </li>
          <li>
            <Link to="/user/mybookings" className='nav-links'>
            <i class="fas fa-calendar-alt"></i>
            <span>My Bookings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
    <div>
      <UserDash toggleSidebar={toggleSidebar} halfDashBar={isDashBarHalf}></UserDash>
    </div>
    </div>
  )
}
