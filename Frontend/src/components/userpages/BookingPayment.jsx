import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Razorpay } from '../common/RazorPay';
import '../../assets/css/BookingPayment.css'; // Import the CSS file

export const BookingPayment = () => {
    const location = useLocation();
    const { bookingId } = location.state || {};
    const [bookingData, setBookingData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const res = await axios.get(`/booking/getbookingbyid/${bookingId}`);
                setBookingData(res.data.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        if (bookingId) {
            fetchBookingDetails();
        } else {
            setError("No booking ID provided");
            setLoading(false);
        }
    }, [bookingId]);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading booking details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <div className="error-icon">⚠️</div>
                <h3>Error Loading Booking</h3>
                <p>{error}</p>
                <button className="retry-button" onClick={() => window.location.reload()}>
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="booking-payment-container">
            <div className="booking-summary-card">
                <div className="booking-header">
                    <h2>Booking Summary</h2>
                    <div className="booking-id">Booking ID: {bookingData._id}</div>
                </div>
                
                <div className="booking-details-grid">
                    <div className="detail-card">
                        <div className="detail-label">Start Date & Time</div>
                        <div className="detail-value">{formatDate(bookingData.startTime)}</div>
                    </div>
                    
                    <div className="detail-card">
                        <div className="detail-label">End Date & Time</div>
                        <div className="detail-value">{formatDate(bookingData.endTime)}</div>
                    </div>
                    
                    <div className="detail-card">
                        <div className="detail-label">Duration</div>
                        <div className="detail-value">{bookingData.totalHours} hours</div>
                    </div>
                    
                    <div className="detail-card highlight">
                        <div className="detail-label">Total Amount</div>
                        <div className="detail-value">₹{bookingData.totalAmount.toLocaleString('en-IN')}</div>
                    </div>
                </div>
                
                <div className="payment-section">
                    <h3>Payment Method</h3>
                    <div className="razorpay-container">
                        <Razorpay 
                            amount={bookingData.totalAmount} 
                            bookingId={bookingData._id}
                            userData={{
                                bussinessName: bookingData.bussinessName,
                                email: bookingData.bookingEmail,          
                                ContactNo: bookingData.ContactNo
                              }}  />
                    </div>
                </div>
                
                <div className="booking-footer">
                    <p>Your booking will be confirmed after successful payment</p>
                    <p className="support-text">Need help? <a href="/contact">Contact support</a></p>
                </div>
            </div>
        </div>
    );
};