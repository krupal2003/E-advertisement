import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import '../../assets/css/NewBooking.css'
import { Link, useNavigate } from 'react-router-dom';

export const NewBooking = () => {
    const{register, handleSubmit} =useForm();
    const [state, setState] = useState([]);
    const [city, setcity] = useState([])
    const [area, setarea] = useState([])

    const navigate=useNavigate();


    
    

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

    const submitHandler=async(data)=>{
        // console.log(data)

        const res= await axios.get("/hordings/gethordingbyarea/"+data.areaId);
        // console.log(res.data.data);
        if(res.status===200){
            alert("Screen Found");
            navigate('/user/screen-page', { state: { screens: res.data.data } }); 
        }
        else{
            alert("No Screen Found");
        }

    }

  return (
    <div className="new-booking-container">
        <h1>Get Your Nearby Screen</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
            <div>
                <label htmlFor="stateId" >State</label>
                <select 
                    {...register("stateId")} 
                    onChange={(event) => getCityByState(event.target.value)}
                >
                    <option value="">Select</option>
                    {state?.map((state) => (
                        <option key={state._id} value={state._id}>{state.name}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="cityId">City</label>
                <select 
                    {...register("cityId")} 
                    onChange={(event) => getAreaByCity(event.target.value)}
                >
                    <option value="">Select</option>
                    {city?.map((city) => (
                        <option key={city._id} value={city._id}>{city.name}</option>
                    ))}
                </select>
            </div>
            
            <div>
                <label htmlFor="areaId">Area</label>
                <select 
                    {...register("areaId")} 
                >
                    <option value="">Select</option>
                    {area?.map((area) => (
                        <option key={area._id} value={area._id}>{area.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <input type="submit" value="Get Screen"/>
            </div>

        </form>
    </div>
  )
}
