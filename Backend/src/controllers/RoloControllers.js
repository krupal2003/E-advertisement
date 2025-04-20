const roleModel = require("../models/RoleModel");

const getAllRoles=async(req,res)=>{

    const role=await roleModel.find();//select * from rolemodel

    res.json({
        message:"all roles are fetched",
        data:role
    });
}

const addRole=async (req,res)=>{
    const addRole=await roleModel.create(req.body);

    console.log(req.body)

    res.json({
        message:"Data created",
        data:addRole
    })
}

const deleteRole=async (req,res)=>{

    const deletedRole=await roleModel.findByIdAndDelete(req.params.id)

    res.json({
        message:"role deleted",
        data:deletedRole
    })
}

const getRoleById=async (req,res)=>{
    const getRole=await roleModel.findById(req.params.id)
    res.json({
        message:'fetched',
        data:getRole
    })
}

module.exports={
    getAllRoles,addRole,deleteRole,getRoleById
}