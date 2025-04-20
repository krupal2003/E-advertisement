import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../assets/css/mybookings.css'; // CSS file for custom styles

export const MyBooking = () => {
    const columns = [
        { field: "_id", headerName: "Booking ID", width: 220 },
        { field: "startTime", headerName: "Start Time", width: 200 },
        { field: "endTime", headerName: "End Time", width: 200 },
        { field: "totalHours", headerName: "Hours", width: 120, headerAlign: 'center', align: 'center' },
        { 
            field: "totalAmount", 
            headerName: "Amount", 
            width: 130,
            headerAlign: 'center',
            align: 'center',
        },
        { 
            field: "bookingStatus", 
            headerName: "Status", 
            width: 150,
            cellClassName: (params) => `MyBooking-status-${params.value.toLowerCase()}`
        },
        { field: "bookingDate", headerName: "Booking Date", width: 180 },
    ];
    
    const [allbookings, setAllBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [noBookings, setNoBookings] = useState(false);

    const getData = async () => {
        try {
            const res = await axios.get("/booking/allbookings/" + localStorage.getItem("id"));
            
            if (res.status === 200) {
                if (res.data.data.length === 0) {
                    setNoBookings(true);
                } else {
                    const formattedBookings = res.data.data.map(booking => ({
                        ...booking,
                        startTime: new Date(booking.startTime).toLocaleString(),
                        endTime: new Date(booking.endTime).toLocaleString(),
                        bookingDate: new Date(booking.bookingDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })
                    }));
                    setAllBookings(formattedBookings);
                }
            }
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
            console.error("Error fetching bookings:", err);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    if (loading) return <div className="MyBooking-loading-container">Loading...</div>;
    if (error) return <div className="MyBooking-error-container">Error: {error}</div>;
    if (noBookings) return (
        <div className="MyBooking-noBookings-container">
            <div className="MyBooking-noBookings-card">
                <h1>No Bookings Found</h1>
                <p>You haven't made any bookings yet.</p>
                <button className="MyBooking-refresh-button" onClick={getData}>
                    Refresh
                </button>
            </div>
        </div>
    );

    return (
        <div className="MyBooking-container">
            <h2 className="MyBooking-header">My Bookings</h2>
            <div className="MyBooking-dataGrid-container">
                <DataGrid
                    columns={columns}
                    rows={allbookings}
                    getRowId={(row) => row._id}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    autoHeight
                    disableSelectionOnClick
                    sx={{
                        boxShadow: 2,
                        border: 2,
                        borderColor: '#e0e0e0',
                        '& .MuiDataGrid-cell:hover': {
                            color: 'primary.main',
                        },
                        '& .MyBooking-status-confirmed': {
                            color: '#2e7d32',
                            fontWeight: 'bold'
                        },
                        '& .MyBooking-status-pending': {
                            color: '#ed6c02',
                            fontWeight: 'bold'
                        },
                        '& .MyBooking-status-cancelled': {
                            color: '#d32f2f',
                            fontWeight: 'bold'
                        }
                    }}
                />
            </div>
        </div>
    );
};