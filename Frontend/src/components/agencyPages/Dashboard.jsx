import React from 'react'
import { Navbar } from './Navbar'
import { Outlet } from 'react-router-dom'

export const Dashboard = ({toggleSidebar,halfDashBar}) => {
  return (
    <div className={`dashboard-container ${halfDashBar?"half":"full"}`}>
        <Navbar toggleSidebar={toggleSidebar} halfDashBar={halfDashBar}></Navbar>
        <div className='dash-content'>
          <Outlet></Outlet>
        </div>
    </div>
  )
}
