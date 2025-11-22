import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-indigo-600 py-20 px-6 text-center text-white mt-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90 leading-relaxed">
          We build modern, scalable web applications that simplify workflow,
          enhance productivity, and deliver a seamless user experience.
        </p>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-12">

        {/* Left Side Text */}
        <div>
          <h2 className="text-3xl font-semibold text-gray-800">Who We Are</h2>
          <p className="text-gray-600 mt-4 leading-relaxed">
            We are a full-stack development team dedicated to delivering easy-to-use,
            highly functional, and scalable digital solutions. Our mission is to
            empower users with intuitive tools and powerful backend architecture.
          </p>

          <h2 className="text-3xl font-semibold text-gray-800 mt-10">What We Do</h2>
          <p className="text-gray-600 mt-4 leading-relaxed">
            We specialize in MERN Stack development — React, Node.js, Express,
            MongoDB — and build custom form builders, dashboards, authentication
            systems, and automation tools with clean code and professional UI.
          </p>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=60"
            alt="About us"
            className="rounded-xl shadow-xl w-full max-w-lg object-cover"
          />
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-16 px-6">
        <h2 className="text-center text-3xl font-bold mb-12 text-gray-800">
          Our Core Values
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">

          <div classname="p-6 bg-gray-100 rounded-xl shadow text-center hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-3">Quality</h3>
            <p className="text-gray-600">
              Clean code, optimized performance, and pixel-perfect UI.
            </p>
          </div>

          <div className="p-6 bg-gray-100 rounded-xl shadow text-center hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-3">Creativity</h3>
            <p className="text-gray-600">
              Smart solutions with modern design and innovative thinking.
            </p>
          </div>

          <div className="p-6 bg-gray-100 rounded-xl shadow text-center hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-3">Performance</h3>
            <p className="text-gray-600">
              Fast, scalable, reliable applications built for the real world.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
