import React, { useEffect, useState } from 'react'
import '../../assets/css/UpdateScreen.css'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { Loader } from '../common/Loader';



export const AgencyUpdateScreen = () => {

    const id=useParams().id;
    const navigate=useNavigate();

    const {register,handleSubmit,formState:{errors}} =useForm({
        defaultValues:async()=>{
            const res=await axios.get("/hordings/hoardingById/"+id)
            return res.data.data
        }
    });
        const [state, setState] = useState([]);
        const [city, setcity] = useState([])
        const [area, setarea] = useState([])
        const [isLoading, setisLoading] = useState(false)
        

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
                data.userId=localStorage.getItem("id");
                delete data._id;
                // console.log(data);

                setisLoading(true)
                const res=await axios.put("/hordings/updatehoarding/"+id,data)
                setisLoading(false)
                // console.log(res.data)
                
                if (res.status === 200) {  
                    toast.success("Screen Updated",{theme:'light',transition:Bounce})
                    navigate("/agency/myscreen")
                }      
            }
            catch(error){
                setisLoading(false)
                const errorMsg = error.response?.data?.message || "Something Went Wrong"
                toast.error(errorMsg, { theme: "light", transition: Bounce });  
            }
            
        }
  return (
<div className='update-body'>    
<div className="update-container">
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
    <h1 className="title">Update Screen</h1>
    <form onSubmit={handleSubmit(submitHandler)} className="form">
        <div className="update-form-group">
            <label htmlFor="hoardingDimension">Hoarding Dimension</label>
            <input type="text" {...register("hoardingDimension", errorValidator.requireField)} className="input" />
            <span className="error">{errors.hoardingDimension?.message}</span>
        </div>

        <div className="update-form-group">
            <label htmlFor="hoardingType">Hoarding Type</label>
            <select {...register("hoardingType", errorValidator.requireField)} className="select">
                <option value="">Select</option>
                <option value="Unipole">Unipole</option>
                <option value="Billboard">Billboard</option>
                <option value="Gantry">Gantry</option>
                <option value="Digital">Digital</option>
            </select>
            <span className="error">{errors.hoardingType?.message}</span>
        </div>

        <div className="update-form-group">
            <label htmlFor="hourlyRate">Hourly Rate</label>
            <input type="number" {...register("hourlyRate", errorValidator.requireField)} className="input" />
            <span className="error">{errors.hourlyRate?.message}</span>
        </div>

        <div className="update-form-group">
            <label htmlFor="stateId">State</label>
            <select {...register("stateId", errorValidator.requireField)} onChange={(event) => getCityByState(event.target.value)} className="select">
                <option value="">Select</option>
                {state?.map((state) => (
                    <option key={state._id} value={state._id}>{state.name}</option>
                ))}
            </select>
            <span className="error">{errors.stateId?.message}</span>
        </div>

        <div className="update-form-group">
            <label htmlFor="cityId">City</label>
            <select {...register("cityId", errorValidator.requireField)} onChange={(event) => getAreaByCity(event.target.value)} className="select">
                <option value="">Select</option>
                {city?.map((city) => (
                    <option key={city._id} value={city._id}>{city.name}</option>
                ))}
            </select>
            <span className="error">{errors.cityId?.message}</span>
        </div>

        <div className="update-form-group">
            <label htmlFor="areaId">Area</label>
            <select {...register("areaId", errorValidator.requireField)} className="select">
                <option value="">Select</option>
                {area?.map((area) => (
                    <option key={area._id} value={area._id}>{area.name}</option>
                ))}
            </select>
            <span className="error">{errors.areaId?.message}</span>
        </div>

        <div className="update-form-group">
            <label htmlFor="longitude">Longitude</label>
            <input type="text" {...register("longitude", errorValidator.requireField)} className="input" />
            <span className="error">{errors.longitude?.message}</span>
        </div>

        <div className="update-form-group">
            <label htmlFor="latitude">Latitude</label>
            <input type="text" {...register("latitude", errorValidator.requireField)} className="input" />
            <span className="error">{errors.latitude?.message}</span>
        </div>

        <div className="update-form-group">
            {isLoading ? (
                <div className="loader-btn">
                    <Loader></Loader>
                </div>
            ) : (
                <input type="submit" value="UPDATE" className="submit-btn" />
            )}
        </div>
    </form>
</div>
</div>
 )
}
