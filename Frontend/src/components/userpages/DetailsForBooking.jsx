import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import '../../assets/css/DetailsForBooking.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const DetailsForBooking = () => {
    const navigate=useNavigate();

    const location = useLocation();
    const { hoardingId, startDate, endDate } = location.state || {};
    const hordingID= hoardingId ;
    const startTime= startDate ;
    const endTime= endDate;

    //For Calculate Amount
    const [Amount, setAmount] = useState(0);
    const totalHours = (Math.abs(endTime - startTime) / (1000 * 60 * 60)).toFixed(2);

    
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

    const {register,handleSubmit,formState:{errors}}=useForm();

    const businessCategories = [
        'Restaurant/Cafe',
        'Retail Store',
        'Healthcare',
        'Automotive',
        'Real Estate',
        'Education',
        'Entertainment',
        'Technology',
        'Financial Services',
        'Other'
    ];
    const errorValidator={
        requireField:{
          required:{
            value:true,
            message:"This Field is required*"
          }
        }
      }

    const submithandler=async(data)=>{
        try{
            const userID=localStorage.getItem('id');
            data.userId=userID;
            data.hordingId=hordingID;
            data.startTime=startTime;
            data.endTime=endTime;
            data.totalHours=totalHours;
            data.totalAmount=Amount;

            // console.log(data);

            const res=await axios.post('/booking/createbooking',data);
            if(res.status===200){
                navigate('/user/booking-payment', { 
                    state: { 
                        bookingId: res.data.data._id // Assuming the response contains the created booking ID
                    } 
                });
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
    <div className="business-details-container">
            <div className="form-header">
                <h2>Business Advertising Details</h2>
                <p className="subtitle">Provide your business information to create effective advertisements</p>
            </div>

            <form onSubmit={handleSubmit(submithandler)} className="business-details-form">
                {/* Business Name Field */}
                <div className={`form-group ${errors.bussinessName ? 'error' : ''}`}>
                    <label htmlFor="bussinessName">Business Name <span className="required">*</span></label>
                    <input
                        type="text"
                        id="bussinessName"
                        {...register("bussinessName", errorValidator.requireField)}
                        className="form-input"
                        placeholder="Your official business name"
                    />
                    {errors.bussinessName && (
                        <span className="error-message">{errors.bussinessName.message}</span>
                    )}
                </div>

                {/* Business Category Field */}
                <div className={`form-group ${errors.category ? 'error' : ''}`}>
                    <label htmlFor="category">Business Category <span className="required">*</span></label>
                    <select
                        id="category"
                        {...register("category", errorValidator.requireField)}
                        className="form-select"
                    >
                        <option value="">Select a category</option>
                        {businessCategories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                    {errors.category && (
                        <span className="error-message">{errors.category.message}</span>
                    )}
                </div>

                {/* Tagline Field */}
                <div className="form-group">
                    <label htmlFor="tagLine">Tagline <span className="optional">(optional)</span></label>
                    <input
                        type="text"
                        id="tagLine"
                        {...register("tagLine")}
                        className="form-input"
                        placeholder="Your catchy business slogan"
                    />
                </div>

                {/* Key Message Field */}
                <div className="form-group">
                    <label htmlFor="keyMessage">Key Message <span className="optional">(optional)</span></label>
                    <input
                        type="text"
                        id="keyMessage"
                        {...register("keyMessage")}
                        className="form-input"
                        placeholder="Main message you want to convey"
                    />
                    <p className="hint">Keep it short and impactful (under 120 characters)</p>
                </div>

                {/* Contact Information Field */}
                <div className={`form-group ${errors.ContactNo ? 'error' : ''}`}>
                    <label htmlFor="ContactNo">Contact Information <span className="required">*</span></label>
                    <input
                        type="text"
                        id="ContactNo"
                        {...register("ContactNo", errorValidator.requireField)}
                        className="form-input"
                        placeholder="Contact Number"
                    />
                    {errors.ContactNo && (
                        <span className="error-message">{errors.ContactNo.message}</span>
                    )}
                </div>

                {/* Email Filed */}
                <div className={`form-group ${errors.bookingEmail ? 'error' : ''}`}>
                    <label htmlFor="bookingEmail">Email <span className="required">*</span></label>
                    <input
                        type="text"
                        id="bookingEmail"
                        {...register("bookingEmail", errorValidator.requireField)}
                        className="form-input"
                        placeholder="Email Address"
                    />
                    {errors.bookingEmail && (
                        <span className="error-message">{errors.bookingEmail.message}</span>
                    )}
                </div>

                {/* Description Field */}
                <div className={`form-group ${errors.description ? 'error' : ''}`}>
                    <label htmlFor="description">Business Description <span className="required">*</span></label>
                    <textarea
                        id="description"
                        {...register("description", errorValidator.requireField)}
                        className="form-textarea"
                        placeholder="Tell us about your business and advertising needs..."
                        rows={5}
                    ></textarea>
                    {errors.description && (
                        <span className="error-message">{errors.description.message}</span>
                    )}
                    <p className="hint">This helps us create more targeted advertisements</p>
                </div>

                {/* Submit Button */}
                <div className="form-actions">
                    <button type="submit" className="submit-button">
                        Continue to Booking
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
  )
}
