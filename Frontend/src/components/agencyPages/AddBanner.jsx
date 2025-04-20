import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import '../../assets/css/AddBanner.css';
import { toast } from 'react-toastify';
import { Bounce, ToastContainer } from 'react-toastify';
import { Loader } from '../common/Loader';
import { useNavigate } from 'react-router-dom';

export const AddBanner = () => {

    const navigate=useNavigate();

    const {register,handleSubmit,formState:{errors}} =useForm();
    const [state, setState] = useState([]);
    const [city, setcity] = useState([])
    const [area, setarea] = useState([])
    const [isAdding, setisAdding] = useState(false)
    

    const getAllStates=async()=>{
        const res=await axios.get("/state/allState");
        // console.log(res.data);
        setState(res.data.data);
    }

    const getCityByState=async(id)=>{
            const res=await axios.get("/city/getcitiesbystate/"+id)
            // console.log(res.data.data);
            setcity(res.data.data);  
    }

    const getAreaByCity=async(id)=>{
        const res=await axios.get("/area/areabycity/"+id)
        // console.log(res.data.data);
        setarea(res.data.data);
    }

    useEffect(()=>{
        getAllStates();
    },[])

    const errorValidator={
        requireField:{
          required:{
            value:true,
            message:"This Field is required*"
          }
        },
        requirefile:{
            required:{
              value:true,
              message:"Please Select any file*"
            }
          }
      }

    const submitHandler=async(data)=>{

        try{
            const userID=localStorage.getItem("id");
            data.userId=userID;
            // console.log(data);

            const formdata=new FormData()
            formdata.append("hoardingDimension",data.hoardingDimension)
            formdata.append("hoardingType",data.hoardingType)
            formdata.append("hourlyRate",data.hourlyRate)
            formdata.append("stateId",data.stateId)
            formdata.append("cityId",data.cityId)
            formdata.append("areaId",data.areaId)
            formdata.append("longitude",data.longitude)
            formdata.append("latitude",data.latitude)
            formdata.append("image",data.image[0])
            formdata.append("userId",data.userId)
            

            setisAdding(true)
            const res=await axios.post("/hordings/addhording",formdata)
            setisAdding(false)

            console.log(res.data)
            if (res.status === 200) {  
                toast.success("Screen Added",{theme:'light',transition:Bounce})
            }
            
            navigate("/agency/myscreen")
        }
        catch(error){
            const errorMsg = error.response?.data?.message || "Something Went Wrong"
            setisAdding(false)
            toast.error(errorMsg, { theme: "light", transition: Bounce });  
        }
        
    }
  return (
    <div className='banner-container'>
    <div className="form-container">

        <ToastContainer
            position="top-center"
            autoClose={2000}
            limit={1}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
        />
        
        <h1 className="form-title">Add Screen</h1>
        
        <form onSubmit={handleSubmit(submitHandler)} className="banner-form">

            {/* Hoarding Dimension */}
            <div className="form-group">
                <label htmlFor="hoardingDimension" className="form-label">Hoarding Dimension</label>
                <input 
                    type="text" 
                    {...register("hoardingDimension", errorValidator.requireField)} 
                    className="form-input"
                />
                <span className="error-message">{errors.hoardingDimension?.message}</span>
            </div>

            {/* Hoarding Type */}
            <div className="form-group">
                <label htmlFor="hoardingType" className="form-label">Hoarding Type</label>
                <select {...register("hoardingType", errorValidator.requireField)} className="form-select">
                    <option value="">Select</option>
                    <option value="Unipole">Unipole</option>
                    <option value="Billboard">Billboard</option>
                    <option value="Gantry">Gantry</option>
                    <option value="Digital">Digital</option>
                </select>
                <span className="error-message">{errors.hoardingType?.message}</span>
            </div>

            {/* Hourly Rate */}
            <div className="form-group">
                <label htmlFor="hourlyRate" className="form-label">Hourly Rate</label>
                <input 
                    type="number" 
                    {...register("hourlyRate", errorValidator.requireField)} 
                    className="form-input"
                />
                <span className="error-message">{errors.hourlyRate?.message}</span>
            </div>

            {/* State Selection */}
            <div className="form-group">
                <label htmlFor="stateId" className="form-label">State</label>
                <select 
                    {...register("stateId", errorValidator.requireField)} 
                    className="form-select"
                    onChange={(event) => getCityByState(event.target.value)}
                >
                    <option value="">Select</option>
                    {state?.map((state) => (
                        <option key={state._id} value={state._id}>{state.name}</option>
                    ))}
                </select>
                <span className="error-message">{errors.stateId?.message}</span>
            </div>

            {/* City Selection */}
            <div className="form-group">
                <label htmlFor="cityId" className="form-label">City</label>
                <select 
                    {...register("cityId", errorValidator.requireField)} 
                    className="form-select"
                    onChange={(event) => getAreaByCity(event.target.value)}
                >
                    <option value="">Select</option>
                    {city?.map((city) => (
                        <option key={city._id} value={city._id}>{city.name}</option>
                    ))}
                </select>
                <span className="error-message">{errors.cityId?.message}</span>
            </div>

            {/* Area Selection */}
            <div className="form-group">
                <label htmlFor="areaId" className="form-label">Area</label>
                <select 
                    {...register("areaId", errorValidator.requireField)} 
                    className="form-select"
                >
                    <option value="">Select</option>
                    {area?.map((area) => (
                        <option key={area._id} value={area._id}>{area.name}</option>
                    ))}
                </select>
                <span className="error-message">{errors.areaId?.message}</span>
            </div>

            {/* Longitude & Latitude */}
            <div className="coordinates-group">
                <div className="form-group">
                    <label htmlFor="longitude" className="form-label">Longitude</label>
                    <input 
                        type="text" 
                        {...register("longitude", errorValidator.requireField)} 
                        className="form-input"
                    />
                    <span className="error-message">{errors.longitude?.message}</span>
                </div>

                <div className="form-group">
                    <label htmlFor="latitude" className="form-label">Latitude</label>
                    <input 
                        type="text" 
                        {...register("latitude", errorValidator.requireField)} 
                        className="form-input"
                    />
                    <span className="error-message">{errors.latitude?.message}</span>
                </div>
            </div>

            {/* Image Upload */}
            <div className='form-group'>
                <label className="form-label">Select Screen Image</label>
                <input 
                    type="file" 
                    {...register("image", errorValidator.requirefile)} 
                    className="form-input-file"
                />
                <span className="error-message">{errors.image?.message}</span>
            </div>

            {/* Submit Button */}
            <div className="form-group">
                {isAdding ? (
                    <div className="loader-btn"><Loader /></div>
                ) : (
                    <input type="submit" value="Add" className="form-submit" />
                )}
            </div>
        </form>
    </div>
</div>


  )
}
