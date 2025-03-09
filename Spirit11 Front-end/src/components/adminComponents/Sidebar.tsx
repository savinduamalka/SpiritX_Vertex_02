import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
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
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-semibold">Cricket App</h2>
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
        <ul className="space-y-4 px-4">
          <li>
            <Link to="/" className="text-lg hover:text-gray-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/admin/players" className="text-lg hover:text-gray-400">
              Players
            </Link>
          </li>
          <li>
            <Link to="/admin/player-stats" className="text-lg hover:text-gray-400">
              Player Stats
            </Link>
          </li>
          <li>
            <Link to="/admin/summary" className="text-lg hover:text-gray-400">
              Tournament Summary
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

export default Sidebar;
