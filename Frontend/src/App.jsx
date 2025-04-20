import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Sidebar } from './components/agencyPages/Sidebar'
import { Dashboard } from './components/agencyPages/Dashboard'
import { Login } from './components/common/Login'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Signup } from './components/common/Signup'
import axios from 'axios'
import { Analytic } from './components/agencyPages/Analytic'
import { AddBanner } from './components/agencyPages/AddBanner'
import PrivateRoutes from './hooks/PrivateRoutes'
import LandingPage from './components/common/LandingPage'
import { AgencyScreen } from './components/agencyPages/AgencyScreen'
import { AgencyHome } from './components/agencyPages/AgencyHome'
import { AgencyMyScreen } from './components/agencyPages/AgencyMyScreen'
import { AgencyUpdateScreen } from './components/agencyPages/AgencyUpdateScreen'
import { UserSidebar } from './components/userpages/UserSidebar'
import { NewBooking } from './components/userpages/NewBooking'
import { ScreenPage } from './components/userpages/ScreenPage'
import CheckAvailbility from './components/userpages/CheckAvailbility'
import { BookScreen } from './components/userpages/BookScreen'
import { DetailsForBooking } from './components/userpages/DetailsForBooking'
import { BookingPayment } from './components/userpages/BookingPayment'
import { UserHome } from './components/userpages/UserHome'
import { MyBooking } from './components/userpages/MyBooking'

function App() {

  axios.defaults.baseURL = "http://localhost:8080"

  // If the user is on login or signup routes, render only those pages.
  const location = useLocation();
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return (
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
    );
  }
      

  const [issidebarOpen, setIssidebarOpen] = useState(true);
  const [isDashBarHalf, setIsDashBarFull] = useState(true)

  const toggleSidebar=()=>{
    // console.log(issidebarOpen)
    setIssidebarOpen(!issidebarOpen)
    setIsDashBarFull(!isDashBarHalf)
  }


  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage></LandingPage>}></Route>
        <Route element={<PrivateRoutes></PrivateRoutes>}>
          <Route path='/agency' element={<Sidebar isOpen={issidebarOpen} toggleSidebar={toggleSidebar} isDashBarHalf={isDashBarHalf}></Sidebar>}>
            <Route path='' element={<AgencyHome></AgencyHome>} ></Route>
            <Route path='yourscreen' element={<AgencyScreen></AgencyScreen>}></Route>
            <Route path='analytics' element={<Analytic></Analytic>}></Route>
            <Route path='addbanner' element={<AddBanner></AddBanner>}></Route>
            <Route path='myscreen' element={<AgencyMyScreen></AgencyMyScreen>}></Route>
            <Route path="updatescreen/:id" element={<AgencyUpdateScreen></AgencyUpdateScreen>}></Route>
          </Route>
          <Route path='/user' element={<UserSidebar isOpen={issidebarOpen} toggleSidebar={toggleSidebar} isDashBarHalf={isDashBarHalf}></UserSidebar>}>
            <Route path='' element={<UserHome></UserHome>}></Route>
            <Route path='newbooking' element={<NewBooking></NewBooking>}></Route>
            <Route path='screen-page' element={<ScreenPage></ScreenPage>}></Route>
            <Route path='check-avaibility' element={<CheckAvailbility></CheckAvailbility>}></Route>
            {/* <Route path='bookscreen' element={<BookScreen></BookScreen>}></Route> */}
            <Route path='bookingdetails' element={<DetailsForBooking></DetailsForBooking>}></Route>
            <Route path='booking-payment/' element={<BookingPayment></BookingPayment>}></Route>
            <Route path='mybookings' element={<MyBooking></MyBooking>}></Route>
          </Route>
        </Route>
      </Routes>
      
    </div>
  )
}

export default App
