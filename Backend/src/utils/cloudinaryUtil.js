const cloudinary=require("cloudinary").v2;

const uploadFileToCloudinary=async(file)=>{
     // configuration of cloudinary
     cloudinary.config({
        cloud_name:'dyno0dvkq',
        api_key:'167226899988649',
        api_secret:'DCfk6FFKmlkV12-Y_3yEsmspSxc',
      })

      const cloudinaryResponse=await cloudinary.uploader.upload(file.path);
      return cloudinaryResponse;
}

module.exports={
    uploadFileToCloudinary 
}