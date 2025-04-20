import React, { useEffect, useState } from 'react'
import '../../assets/css/AgencyMyScreen.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'

export const AgencyMyScreen = () => {

    const [screen, setscreen] = useState([])

    const getAgencyScreens=async()=>{
        try{
            const resOfScreen=await axios.get("/hordings/userscreens/"+localStorage.getItem("id"));
            // console.log(resOfScreen.data.data)
            setscreen(resOfScreen.data.data) 
        }
        catch(err){
            alert("Screen Not Fetched")
        }    
    }
    useEffect(()=>{
        getAgencyScreens();
    },[])


  return (
    <div className='screens-container'>

        {screen?.map((sc, index) => (
            <div key={index} className="form-container1">
                <div className="input-group">
                    <label><i className="fas fa-ruler-combined"></i> Dimensions</label>
                    <div className="value-display">{sc.hoardingDimension}</div>
                </div>

                <div className="input-group">
                    <label>$ Hourly Rate</label>
                    <div className="value-display">₹ {sc.hourlyRate}/-</div>
                </div>

                <div className="input-group">
                    <label><i className="fas fa-image"></i> Image</label>
                    <div className="image-container">
                        {sc.hordingURL ? (
                            <img src={sc.hordingURL} alt="Uploaded" className="image-preview" />
                        ) : (
                            <div className="no-image">No Image</div>
                        )}
                    </div>
                </div>

                <div className='input-group'>
                    
                    <Link to={`/agency/updatescreen/${sc._id}`}>
                        <button>Update</button>
                    </Link> 
                </div>
            </div>
        ))}
    </div>
    )
}
