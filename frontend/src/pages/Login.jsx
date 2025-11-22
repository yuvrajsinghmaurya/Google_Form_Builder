import React, { useState } from "react";
import { Link } from "react-router-dom";


import {  useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
     const navigate = useNavigate();

      const [loginInfo , setLoginInfo] = useState({
            
            email:"",
            password:""
        })
        const handleChange =(e)=>{
            const {name , value} = e.target
    
            // console.log(name , value);
            const copyloginInfo = {...loginInfo};
            copyloginInfo[name] = value;
            setLoginInfo(copyloginInfo)   
        }
        // 
        // console.log( "input information->", signupInfo);
        // now handle the form 
       const handleLogin =  async (e)=>{
    e.preventDefault();

    const { email , password }= loginInfo;
    if(!email || !password){
        return handleError('Email and Password are required');
    }

    try {
        const url = 'http://localhost:8090/auth/login';
        const response = await fetch(url , {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(loginInfo)
        });

        const result = await response.json();
        const { success, message, jwtToken, name } = result;

        if (success) {
            handleSuccess(message);
            localStorage.setItem('token', jwtToken);
            localStorage.setItem('loggedInUser', name);

            setTimeout(() => {
                navigate('/admin/forms');
            }, 1000);
        } else {
            handleError(message);
        }

    } catch (error) {
        handleError(error.message);
    }
}

        
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form className="space-y-5" onSubmit={handleLogin}>

          {/* Email */}
          <div>
            <label className="text-gray-700 font-medium">Email</label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-700 font-medium">Password</label>
            <input
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition"
          >
            Login
          </button>

          <p className="text-center text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-indigo-600 font-semibold hover:underline">
              Signup
            </Link>
          </p>

        </form>
             <ToastContainer/>
      </div>
    </div>
  );
};

export default Login;
