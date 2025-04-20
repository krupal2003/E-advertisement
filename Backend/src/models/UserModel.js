const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    age:{
        type:Number
    },
    status:{
        type:Boolean,
        default:true
    },
    roleID:{
        type:Schema.Types.ObjectId,
        ref:"roles"
    },
    password:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    }
})

module.exports=mongoose.model("user",UserSchema)