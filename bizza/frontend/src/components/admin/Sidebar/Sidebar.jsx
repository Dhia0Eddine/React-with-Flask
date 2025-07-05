// src/components/admin/Sidebar/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => (
  <nav>
    <ul>
      <li><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
      <li><NavLink to="/admin/speakers">Speakers</NavLink></li>
      <li><NavLink to="/admin/EventRegistration">event reg</NavLink></li>
      <li><NavLink to="/admin/speakers/create">Speakers reg</NavLink></li>
    </ul>
  </nav>
);

export default Sidebar;
