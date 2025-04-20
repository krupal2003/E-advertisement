const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const BookingSchema=new Schema({
    hordingId: {
        type: Schema.Types.ObjectId,
        ref: 'Hording',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    totalHours: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    bookingStatus: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    },
    description:{
        type: String,
        required: true,
    },
    bussinessName:{
        type:String,
        required:true
    },
    category:{
        type:String,    
        required:true
    },
    tagLine:{
        type:String,
        default:"No Comments"
    },
    keyMessage:{
        type:String,
        default:"No Comments"
    },
    ContactNo:{
        type:Number,
        required:true
    },
    bookingEmail:{
        type:String,
        required:true
    }
},{timestamps: true});

module.exports = mongoose.model('Booking', BookingSchema);