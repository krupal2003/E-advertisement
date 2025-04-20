import React from 'react'
import { Outlet } from 'react-router-dom'
import { UserNavbar } from './UserNavbar'


export const UserDash = ({toggleSidebar,halfDashBar}) => {
  return (
 <div className={`dashboard-container ${halfDashBar?"half":"full"}`}>
        <UserNavbar toggleSidebar={toggleSidebar} halfDashBar={halfDashBar}></UserNavbar>
        <div className='dash-content'>
          <Outlet></Outlet>
        </div>
    </div> 
)
}
