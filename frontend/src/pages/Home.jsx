import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import formImage from "../assets/home_page.svg";


const Home = () => {
  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="bg-gray-50 pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10">

          {/* Left side */}
          <div className="flex-1">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-snug">
              Build Forms, Collect Responses,  
              <span className="text-indigo-600"> Without Coding</span>
            </h1>

            <p className="mt-4 text-gray-600 text-lg leading-relaxed">
              Our platform allows you to easily create custom forms like job applications,
              surveys, feedback forms, and more. Share the link and receive responses instantly.
            </p>

            {/* Buttons */}
            <div className="mt-6 flex gap-4">
              <Link
                to="/signup"
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-indigo-700 transition shadow"
              >
                Create Free Account
              </Link>

              <Link
                to="/login"
                className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg text-lg hover:bg-indigo-50 transition"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Right side image / illustration */}
          <div className="flex-1 flex justify-center">
           <img src={formImage} className="w-80 lg:w-96" alt="Form Builder" />
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            What You Can Do Here
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-indigo-600">Create Custom Forms</h3>
              <p className="text-gray-600 mt-3">
                Create forms like job applications, surveys, or feedback forms with simple drag & drop controls.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-indigo-600">Share Public Links</h3>
              <p className="text-gray-600 mt-3">
                After creating a form, share your unique link with anyone — no login required for users.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-indigo-600">Collect Responses</h3>
              <p className="text-gray-600 mt-3">
                View, organize, and download submissions from your admin dashboard.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-indigo-600 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold">Start Creating Forms Today</h2>
          <p className="mt-3 text-lg text-indigo-100">
            Join thousands of users simplifying their workflow.
          </p>

          <Link
            to="/signup"
            className="mt-5 inline-block bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg text-lg hover:bg-gray-100 transition"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
