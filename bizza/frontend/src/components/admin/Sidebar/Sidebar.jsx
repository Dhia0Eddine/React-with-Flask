// src/components/admin/Sidebar/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => (
  <nav className="h-full bg-gray-800 text-white w-64 min-h-screen">
    <ul className="flex flex-col py-8 space-y-4">
      <li>
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `block px-6 py-3 rounded-lg transition-colors duration-200 ${
              isActive ? "bg-gray-700 font-semibold" : "hover:bg-gray-700"
            }`
          }
        >
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/admin/speakers"
          className={({ isActive }) =>
            `block px-6 py-3 rounded-lg transition-colors duration-200 ${
              isActive ? "bg-gray-700 font-semibold" : "hover:bg-gray-700"
            }`
          }
        >
          Speakers
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/admin/EventRegistration"
          className={({ isActive }) =>
            `block px-6 py-3 rounded-lg transition-colors duration-200 ${
              isActive ? "bg-gray-700 font-semibold" : "hover:bg-gray-700"
            }`
          }
        >
          event reg
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/admin/speakers/create"
          className={({ isActive }) =>
            `block px-6 py-3 rounded-lg transition-colors duration-200 ${
              isActive ? "bg-gray-700 font-semibold" : "hover:bg-gray-700"
            }`
          }
        >
          Speakers reg
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Sidebar;
