import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6 mt-12">
      <div className="max-w-3xl mx-auto px-6">

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">

          {/* Left Section */}
          <p className="text-xs md:text-sm text-gray-400 text-center">
            © {new Date().getFullYear()}
            <span className="text-indigo-400 font-semibold"> FormBuilder</span>. 
            All Rights Reserved.
          </p>

          {/* Right Links */}
          <div className="flex gap-6 text-xs md:text-sm">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
