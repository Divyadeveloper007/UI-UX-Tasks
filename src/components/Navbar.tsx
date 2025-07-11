import React from 'react';
import { Stethoscope } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">MediBot</h1>
              <p className="text-sm text-gray-600">Book Your Appointment</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">Home</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">Services</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">About</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">Contact</a>
          </div>
          
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;