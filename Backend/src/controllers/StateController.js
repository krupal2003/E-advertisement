const stateModel=require ("../models/StateModel");

const addState=async(req,res)=>{
    
    try{
        const addedState=await stateModel.create(req.body);

        res.status(201).json({
            message:"State Added Successfully",
            data:addedState
        })

    }catch(err){
        res.status(500).json({
            message:err
        })
    }
}


const getState=async(req,res)=>{

    try{
        const allStates=await stateModel.find();

        res.status(200).json({
            message:"states fetched",
            data:allStates
        })
    }
    catch(err){
        res.status(500).json({
            message:err
        })
    }

}
module.exports={
    addState,getState
}