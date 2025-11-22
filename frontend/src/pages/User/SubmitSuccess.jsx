import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const SubmitSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">

        <h1 className="text-3xl font-bold text-green-600 mb-4">
          🎉 Form Submitted!
        </h1>

        <p className="text-gray-700 text-lg mb-6">
          Thank you for submitting your response.  
          Your data has been saved successfully.
        </p>

        <Link
          to="/"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Go Back Home
        </Link>

        <ToastContainer />
      </div>
    </div>
  );
};

export default SubmitSuccess;
