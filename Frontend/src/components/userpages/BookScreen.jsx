import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import '../../assets/css/BookScreen.css';

export const BookScreen = () => {
    const location = useLocation();
    const { hoardingId, startDate, endDate } = location.state || {};

  

    const hordingID= hoardingId ;
    const startTime= startDate ;
    const endTime= endDate;

    const [Amount, setAmount] = useState(0);
    const [description, setDescription] = useState('');

    const totalHours = (Math.abs(endTime - startTime) / (1000 * 60 * 60)).toFixed(2);
    // console.log(totalHours);

    const getHordingDetails=async()=>{

        try{
            const res=await axios.get(`/hordings/hoardingById/${hordingID}`)
            const hourlyRate=res.data.data.hourlyRate;
            setAmount(hourlyRate * parseFloat(totalHours));
        }
        catch(err){
            console.error(err);  
        }
    }
    
    useEffect(() => {
      getHordingDetails();
    }, [])
    
    const handlesubmit=async()=>{
        try{
            const userID=localStorage.getItem('id');
            const res=await axios.post('/booking/createbooking', {
                hordingId: hordingID,
                userId: userID,
                status: "pending",
                startTime: startTime,
                endTime: endTime,
                totalHours: totalHours,
                totalAmount: Amount,
                description: description
            });
            console.log(res.data);
            if(res.status===200){
                alert("Continue To Payment");
                // Redirect to the payment page or any other page
                // Redirect to the booking confirmation page or any other page  
            }
            else{
                alert("Booking Failed");
            }
        }
        catch(err){
            console.error(err);
        }
    }


  return (
    <div className="book-screen-container">
    <h1 className="book-screen-title">Booking Summary</h1>
    <div className="booking-details">
        <div className="booking-detail-item">
            <span className="booking-detail-label">Start Advertising:</span>
            <span className="booking-detail-value">{startDate?.toString()}</span>
        </div>
        <div className="booking-detail-item">
            <span className="booking-detail-label">End Advertising:</span>
            <span className="booking-detail-value">{endDate?.toString()}</span>
        </div>
        <div className="booking-detail-item">
            <span className="booking-detail-label">Total Hours:</span>
            <span className="booking-detail-value">{totalHours} hours</span>
        </div>
        <div className="booking-detail-item">
            <span className="booking-detail-label">Total Payable Amount:</span>
            <span className="booking-detail-value amount-highlight">₹{Amount.toFixed(2)}</span>
        </div>
    </div>
    <div className="description-section">
        <label className="description-label">Short Description Of Your Business</label>
        <textarea 
            className="description-textarea" 
            placeholder="Please describe your business and advertising requirements..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        ></textarea>
    </div>
    <button className="book-now-button" onClick={handlesubmit}>
        Book Now
    </button>
</div>

  )
}
