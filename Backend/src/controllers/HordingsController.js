const { log } = require("console");
const hordingModel = require("../models/HordingsModel");
const multer=require("multer");
const path=require("path");
const cloudinaryUtil= require('../utils/cloudinaryUtil')

const storage=multer.diskStorage({
  destination:"./uploades",
  filename:function(req,file,cb){
      cb(null,file.originalname)
  }
})

//multer object
const upload=multer({
  storage:storage,
  // fileFilter:
}).single("image")

const addHording = async (req, res) => {
  try {
    const savedHording = await hordingModel.create(req.body);
    res.status(201).json({
      message: "Hording added successfully",
      data: savedHording,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllHordings = async (req, res) => {
  try {
    const hordings = await hordingModel.find().populate("stateId cityId areaId userId");
    if (hordings.length === 0) {
      res.status(404).json({ message: "No hordings found" });
    } else {
      res.status(200).json({
        message: "Hording found successfully",
        data: hordings,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getAllHordingsOfUser = async (req, res) => {
  try {
    const hordings = await hordingModel.find({userId:req.params.userId}).populate("stateId cityId areaId userId");
    if (hordings.length === 0) {
      res.status(404).json({ message: "No hordings found" });
    } else {
      res.status(200).json({
        message: "Hording found successfully",
        data: hordings,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// const addHordingWithFile=async(req,res)=>{
//   try{
//     upload(req,res,(err)=>{
//       if(err){
//         res.status(500).json({
//           message:err.message
//         })
//       }
//       else{
//         console.log(req.body);
//         res.status(200).json({
//           message:"File uploaded Successfully",
//           data:req.file
//         })
//       }
//     })
//   }catch(err){
//     res.status(500).json({
//       message:err.message
//     })
//   }
// }
const addHordingWithFile=async(req,res)=>{
  try{
    upload(req,res,async(err)=>{
      if(err){
        res.status(500).json({
          message:err.message
        })
      }
      else{
        // console.log(req.body);
        const cloudinaryResponse=await cloudinaryUtil.uploadFileToCloudinary(req.file);
        // console.log(cloudinaryResponse);
        // console.log(req.body);

        req.body.hordingURL=cloudinaryResponse.secure_url;
        const savedHording=await hordingModel.create(req.body);

        res.status(200).json({
          message:"Screen Created Successfully",
          data:savedHording
        })
      }
    })
  }catch(err){
    res.status(500).json({
      message:err.message
    })
  }
}

const updateHoardingsOfUser=async(req,res)=>{
  try{
      const updatedHording=await hordingModel.findByIdAndUpdate(req.params.id,req.body,{new:true})

      res.status(200).json({
        message:"Hordings Updated Succesfully",
        data:updatedHording
      })

  }
  catch(err){
    res.status(500).json({
      message:err.message
    })
  }
}

const getHordingById=async(req,res)=>{
  try{
    const hoarding=await hordingModel.findById(req.params.id);
    if(!hoarding){
      res.status(404).json({
        message:"Hording not found"
      })
    }
    else{
      res.status(200).json({
        message:"hording found",
        data:hoarding
      })
    }
  }
  catch(err){
    res.status(500).json({
      message:err.message
    })
  }
}

const getAllHordingsByArea = async (req, res) => {
  try {
    const hordings = await hordingModel.find({ areaId: req.params.areaId });

    if (hordings.length === 0) {
      return res.status(404).json({ message: "No hoardings found for this area" });
    }

    res.status(200).json({
      message: "Hoardings retrieved successfully",
      data: hordings,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




module.exports = { addHording, getAllHordings, addHordingWithFile,getAllHordingsOfUser ,updateHoardingsOfUser, getHordingById, getAllHordingsByArea };