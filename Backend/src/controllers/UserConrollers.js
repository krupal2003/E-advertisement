const UserModel=require("../models/UserModel")
const bcrypt = require('bcrypt');
const mailUtil=require('../utils/mailUtil')

const login=async(req,res)=>{
    try{

        const email=req.body.email;
        const pass=req.body.password;

        const foundUserByEmail=await UserModel.findOne({email:email}).populate("roleID");

        if(foundUserByEmail!=null){

            const isMatch=bcrypt.compareSync(pass,foundUserByEmail.password)

            if(isMatch==true){
                res.status(200).json({
                    message:"Login successfull",
                    data:foundUserByEmail
                })
            }
            else{
                res.status(404).json({
                    message:"Invalid Password"
                })
            }
        }
        else{
            res.status(404).json({
                message:"Invalid Email"
            })
        }

    }catch(err){
        res.status(505).json({
            message:"Error",
            data:err
        })
    }
}

const signUp=async(req,res)=>{
    try{

        const salt=bcrypt.genSaltSync(10);
        const hashPassword=bcrypt.hashSync(req.body.password,salt);
        req.body.password=hashPassword

        const createdUser=await UserModel.create(req.body)

        mailUtil.sendingMail(createdUser.email,"Welcome Mail","Welcome to E-Advertise...!")

        res.status(201).json({
            message:"User Created",
            data:createdUser
        })

    }
    catch(err){
        res.status(505).json({
            message:"Error",
            data:err
        })
    }
}

const getAllUser=async(req,res)=>{
    const allUser= await UserModel.find().populate("roleID")

    res.json({
        message:"Fetched all user",
        data:allUser
    })
}

const addUser=async (req,res)=>{
    const addedUser=await UserModel.create(req.body);

    res.json({
        message:"User Added",
        data:addedUser
    })
}

const deleteUser=async (req,res)=>{
    const deletedUser=await UserModel.findByIdAndDelete(req.params.id);

    res.json({
        message:"User deleted",
        data:deletedUser
    })
}

const getUserById=async(req,res)=>{
    const singleUser=await UserModel.findById(req.params.id);

    res.json({
        message:"Single User fetched",
        data:singleUser
    })
}

module.exports={
    getAllUser,signUp,deleteUser,getUserById,login
}