import React from 'react';
import '../../assets/css/Signup.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

export const Signup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const errorValidator = {
    inputvalidator: {
      required: {
        value: true,
        message: "This Field is required*"
      }
    }
  };

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/user", data);
      
      if (res.status === 201) {
        toast.success('Signup Successful!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          theme: "colored",
          transition: Bounce,
        });
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error('Email already exists. Try another one!', {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: true,
          theme: "colored",
          transition: Bounce,
        });
      } else {
        toast.error('Signup Failed! Please try again later.', {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: true,
          theme: "colored",
          transition: Bounce,
        });
      }
    }
  };

  return (
    <div className='signup-page'>
      <ToastContainer />
      <div className='signup-container'>
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className='input-group'>
            <label>First Name</label>
            <input type='text' {...register("firstName", errorValidator.inputvalidator)} />
            <span className='error'>{errors.firstName?.message}</span>
          </div>
          <div className='input-group'>
            <label>Last Name</label>
            <input type='text' {...register("lastName", errorValidator.inputvalidator)} />
            <span className='error'>{errors.lastName?.message}</span>
          </div>
          <div className='input-group'>
            <label>Email</label>
            <input type='email' {...register("email", errorValidator.inputvalidator)} />
            <span className='error'>{errors.email?.message}</span>
          </div>
          <div className='input-group'>
            <label>Password</label>
            <input type='password' {...register("password", errorValidator.inputvalidator)} />
            <span className='error'>{errors.password?.message}</span>
          </div>
          <div className='input-group'>
            <label>Role</label>
            <select {...register("roleID")}> 
              <option value="67be992ad61a6f902c3492a2">User</option>
              <option value="67be95189f9da3554d2cf573">Agency</option>
            </select>
          </div>
          <button type='submit' className='signup-btn'>Sign Up</button>
          <div className='login-redirect'>
            Already have an account? <Link to='/login'>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
