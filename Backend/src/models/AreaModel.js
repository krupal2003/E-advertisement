const mongoose= require("mongoose");
const Schema=mongoose.Schema;

const areaSchema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    cityID:{
        type:Schema.Types.ObjectId,
        ref:"city"
    },
    stateID:{
        type:Schema.Types.ObjectId,
        ref:"state"
    },
    pincode:{
        type:Number,
        required:true,
        unique:true
    }
},{
    timestamps:true
})

module.exports=mongoose.model("area",areaSchema)