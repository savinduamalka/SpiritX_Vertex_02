import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUsers, FaDollarSign, FaTrophy, FaList } from "react-icons/fa";

const UserSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 md:w-64`}
      >
        <div className="flex justify-between items-center p-8">
          <h2 className="text-4xl font-bold animate-pulse transform transition-transform duration-500 hover:scale-110 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-green-500 to-blue-500">Spirit11</h2>
          <button
            className="text-white md:hidden"
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <ul className="space-y-4 px-8">
          <li>
            <Link to="/home" className="text-lg hover:text-gray-400 flex items-center">
              <FaHome className="mr-2" /> Home
            </Link>
          </li>
          <li>
            <Link to="/select-team" className="text-lg hover:text-gray-400 flex items-center">
              <FaUsers className="mr-2" /> Select Your Team
            </Link>
          </li>
          <li>
            <Link to="/team" className="text-lg hover:text-gray-400 flex items-center">
              <FaUsers className="mr-2" /> Team
            </Link>
          </li>
          <li>
            <Link to="/budget" className="text-lg hover:text-gray-400 flex items-center">
              <FaDollarSign className="mr-2" /> Budget
            </Link>
          </li>
          <li>
            <Link to="/leaderboard" className="text-lg hover:text-gray-400 flex items-center">
              <FaTrophy className="mr-2" /> Leaderboard
            </Link>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 ml-0 md:ml-64 p-4">
        {/* Your page content goes here */}
      </div>
    </div>
  );
};

export default UserSidebar;
