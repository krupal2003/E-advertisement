const routes = require('express').Router();
const bookingcontroller = require('../controllers/BookingController');

routes.get('/checkavailability/:hordingId/:startTime/:endTime', bookingcontroller.checkAvailbility);
routes.post('/createbooking', bookingcontroller.createbooking);
routes.get('/getbookingbyid/:id', bookingcontroller.getBookingByBookingId);
routes.put('/updateStatus/:id', bookingcontroller.updateStatus);
routes.get('/allbookings/:userId', bookingcontroller.getAllBookingOfUser);

module.exports=routes;