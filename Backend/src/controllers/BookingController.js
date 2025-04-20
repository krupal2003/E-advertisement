const bookingmodel=require('../models/BookingModel');

const checkAvailbility=async(req,res)=>{

    const {hordingId, startTime, endTime}=req.params;

    try{
        const startDate = new Date(startTime);
        const endDate = new Date(endTime);
    
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
          return res.status(400).json({ error: 'Invalid date format' }); // Bad Request
        }
    
        const isBooked = await bookingmodel.findOne({
          hoardingId: hordingId,
          startTime: { $lt: endDate },
          endTime: { $gt: startDate }
        });

        if(isBooked){
            return res.status(409).json({
                message:"Screen is already booked for this time slot",
                availble:false,
            })
        }
        else{
            return res.status(200).json({
                message:"Screen is available",
                availble:true,
            })
        }

    }
    catch(err){
        res.status(500).json({
            message:"Failed to check availability",
            data:err.message
        })
    }
}

const createbooking=async(req,res)=>{
    try{
        const booking=await bookingmodel.create(req.body);
        res.status(200).json({
            message:"Booking created successfully",
            data:booking
        })
    }catch(err){
        res.status(500).json({
            message:"Failed to create booking",
            data:err.message
        })
    }
}

const getBookingByBookingId=async(req,res)=>{
    try {
        const booking = await bookingmodel.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json({
            message: "Booking retrieved successfully",
            data: booking
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to retrieve booking",
            data: err.message
        });
    }
}

const updateStatus=async(req,res)=>{
    try {
        const { id } = req.params;
        const { bookingStatus } = req.body;
    
        // Update the booking status in MongoDB
        const updatedBooking = await bookingmodel.findByIdAndUpdate(
          id,
          { bookingStatus },
          { new: true } // Returns the updated document
        );
    
        if (!updatedBooking) {
          return res.status(404).json({ message: "Booking not found" });
        }
    
        res.status(200).json(updatedBooking);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

const getAllBookingOfUser=async(req,res)=>{
    try{
        const bookings=await bookingmodel.find({userId:req.params.userId});
        if(bookings.length===0){
            return res.status(404).json({message:"No bookings found for this user"});
        }
        res.status(200).json({
            message:"Bookings retrieved successfully",
            data:bookings
        })
    }catch(err){
        res.status(500).json({
            message:"Failed to retrieve bookings",
            data:err.message
        })
    }
}
module.exports={checkAvailbility,createbooking, getBookingByBookingId, updateStatus, getAllBookingOfUser}