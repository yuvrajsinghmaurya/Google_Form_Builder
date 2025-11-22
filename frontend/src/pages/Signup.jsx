import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Signup = () => {

    const navigate = useNavigate();

      const [signupInfo , setSignupInfo] = useState({
            name:"",
            email:"",
            password:""
        })
        const handleChange =(e)=>{
            const {name , value} = e.target
    
            // console.log(name , value);
            const copySignupInfo = {...signupInfo};
            copySignupInfo[name] = value;
            setSignupInfo(copySignupInfo)   
        }
        // 
        // console.log( "input information->", signupInfo);
        // now handle the form 
        const handleSignup =  async (e)=>{
            // by using this page will not refresh
            e.preventDefault();
            const {name , email , password }= signupInfo;
            if(!name || !email || !password){
                return handleError('name  ,, email , password required')
            }

            try {
                const url = 'http://localhost:8090/auth/signup';
                const response = await fetch(url , {
                    method : "POST",
                    headers : {
                        'Content-type' : 'application/json'
                    },
                    body : JSON.stringify(signupInfo)
                });
                const result = await response.json();
                // console.log(result);
                const {success , message , error} = result
                if(success){
                    handleSuccess(message);
                    setTimeout(()=>{
                        navigate('/login')
                    }, 1000)
                }else if(error){
                    const details = error?.details[0].message;
                    handleError(details)
                }else if(!success){
                    handleError(message)
                }
                
                

                
            } catch (error) {
                handleError(err);
            }
        }
        
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>

        <form className="space-y-5" onSubmit={handleSignup}>

          {/* Name */}
          <div>
            <label className="text-gray-700 font-medium">Full Name</label>
            <input

              onChange={handleChange}
              name="name"
              type="text"
              placeholder="Enter your name"
              className="w-full mt-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition"
          >
            Signup
          </button>

          <p className="text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <Link to='/login'  className="text-indigo-600 font-semibold hover:underline">
              Login
            </Link>
          </p>

        </form>
        <ToastContainer/>
      </div>
    </div>
  );
};

export default Signup;
