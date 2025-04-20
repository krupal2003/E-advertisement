import React from 'react'
import '../../assets/css/Login.css'
import { useForm } from 'react-hook-form'
import { useNavigate, useRevalidator } from 'react-router-dom';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { TextField } from '@mui/material';


export const Login = () => {

  const navigate=useNavigate();
  const {register,handleSubmit,formState:{errors}}=useForm();

  const submitHandler = async (data) => {  
    try {  
      const res = await axios.post("/user/login", data);  
      if (res.status === 200) {  
        toast.success("Login Successful!", { theme: "dark", transition: Bounce });  
        // console.log(res.data);
        localStorage.setItem("id",res.data.data._id);
        localStorage.setItem("role",res.data.data.roleID.name);

        if(res.data.data.roleID.name==="User"){
          navigate("/user")
        }
        if(res.data.data.roleID.name==="Agency"){
          navigate("/agency")
        }
      }  
    } catch (error) {  
      const errorMsg = error.response?.data?.message || "Something went wrong. Please try again.";  
      toast.error(errorMsg, { theme: "dark", transition: Bounce });  
    }  
  }; 

  const errorValidator={
    emailANdPassValidator:{
      required:{
        value:true,
        message:"This Field is required*"
      }
    }
  }

  return (
    <div className='main'>
      <ToastContainer
      position="top-center"
      autoClose={5000}
      newestOnTop={false}
      hideProgressBar={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Bounce}
      />
      <div class="login-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit(submitHandler)}>
              <div class="input-group">
                  <label>Email</label>
                  <input type="email" {...register("email",errorValidator.emailANdPassValidator)} />
                  <span style={{color:"red"}}>{errors.email?.message}</span>
              </div>
              <div class="input-group">
                  <label>Password</label>
                  <input type="password" {...register("password",errorValidator.emailANdPassValidator)} />
                  <span style={{color:"red"}}>{errors.email?.message}</span>
              </div>
              <button type="submit" class="login-btn">Login</button>
              <Link to="#" class="forgot-password">Forgot Password?</Link>
              <div className='signup-navigate'>
                <div className='signup-tag'>Don't have account..?</div>
                <Link to="/signup" className='signup'>Sign Up</Link>
              </div> 
          </form>
      </div>

    </div>
  )
}
