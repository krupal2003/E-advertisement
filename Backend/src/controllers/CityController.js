const cityModel=require("../models/CityModel")

const addCity=async(req,res)=>{
    try{
        const addedCity=await cityModel.create(req.body);
        res.status(201).json({
            message:"City Successfully Added",
            data:addedCity
        })

    }catch(err){
        res.status(500).json({
            message:err
        })
    }
}

const getAllCity=async(req,res)=>{
    try{
        const allCity=await cityModel.find().populate("stateId")

        res.status(200).json({
            message:'cities fetched',
            data:allCity
        })
    }catch(err){
        res.status(500).json({
            message:err
        })
    }
}

const getCityByStateId=async(req,res)=>{

    try{
        const city=await cityModel.find({stateId:req.params.stateId})

        res.status(200).json({
            message:"cities fetched",
            data:city
        })
    }catch(err){
        res.status(500).json({
            message:err
        })
    }
   
}

module.exports={
addCity,getAllCity,getCityByStateId
}