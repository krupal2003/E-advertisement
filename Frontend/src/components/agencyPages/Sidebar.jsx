import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Dashboard } from './Dashboard';
import logo from '../../assets/img/logo.png'

export const Sidebar = ({isOpen,toggleSidebar,isDashBarHalf}) => {

 
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
            <Link to="/agency" className='nav-links'>
            <i class="fas fa-home"></i>
            <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/agency/analytics" className='nav-links'>
            <i class="fa-solid fa-chart-simple"></i>
            <span>Analytics</span>
            </Link>
          </li>
          <li>
            <Link to="/agency/myscreen" className='nav-links'>
            <i class="fas fa-scroll"></i> 
            <span>View My Screen</span>
            </Link>
          </li>
          <li>
            <Link to="/agency/addbanner" className='nav-links'>
            <i class="fas fa-image"></i>
            <span>Add Banner</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
    <div>
      <Dashboard toggleSidebar={toggleSidebar} halfDashBar={isDashBarHalf}></Dashboard>
    </div>
    </div>
  )
}
