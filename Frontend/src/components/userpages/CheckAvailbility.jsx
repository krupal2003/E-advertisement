import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../assets/css/CheckAvilbility.css'; // Import your CSS file for styling
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const CheckAvailbility = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const hoardingId = location.state?.hoardingId;  

    const now = new Date();
    const after24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const [startDate, setStartDate] = useState(after24Hours);
    const [endDate, setEndDate] = useState(new Date(after24Hours.getTime() + 3600000)); // 1 hour later

    // Utility to check if two dates are on the same day
    const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

    const handleStartChange = (date) => {
        setStartDate(date);
        if (date >= endDate) {
            setEndDate(new Date(date.getTime() + 3600000));
          }
    };

    const handleEndChange = (date) => {
        if (date <= startDate) {
            alert("End time must be after start time");
            return;
        }
        setEndDate(date);
    };

    const checkingAvailability = async () => {
         
        const startISO= startDate.toISOString();
        const endISO= endDate.toISOString();

        try{ 
            const response=await axios.get(`/booking/checkavailability/${hoardingId}/${startISO}/${endISO}`)
            // console.log(response);

            if(response.status===409){
                alert("Screen Already Booked");
            }
            else if(response.status===200){
                alert("Screen Available");
                navigate("/user/bookingdetails" ,{
                    state:{
                        hoardingId,      // Pass hoarding ID
                        startDate,       // Pass start date
                        endDate          // Pass end date
                    }
                }
                )
            }
            else{
                alert("Error Occured....");
            }
        }
        catch(err){
            alert("Something Went Wrong"); 
            // console.log(err)
        }
    }

  return (
    <div className='main-contain'>
    <div className="datetime-picker-container">
      <h3>Select Booking Time</h3>
      <div className="time-picker-group">
        <label>Start Time:</label>
        <DatePicker
          selected={startDate}
          onChange={handleStartChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          dateFormat="MMMM d, yyyy h:mm aa"
          minDate={after24Hours}
          minTime={
              isSameDay(startDate, after24Hours)
                ? after24Hours
                : new Date().setHours(0, 0, 0, 0)
            }
          maxTime={new Date().setHours(23, 30, 0, 0)}
          className="time-picker-input"
        />
      </div>
      <div className="time-picker-group">
        <label>End Time:</label>
        <DatePicker
          selected={endDate}
          onChange={handleEndChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          dateFormat="MMMM d, yyyy h:mm aa"
          minDate={startDate}
          minTime={
            isSameDay(endDate, startDate)
              ? startDate
              : new Date().setHours(0, 0, 0, 0)
          }
          maxTime={new Date().setHours(23, 30, 0, 0)}        
          className="time-picker-input"
        />
      </div>
      <div>
        <button onClick={checkingAvailability}
         disabled={!startDate || !endDate || !hoardingId}
        >
            Check Availbility
        </button>
      </div>
    </div>
    </div>
  );
};

export default CheckAvailbility;