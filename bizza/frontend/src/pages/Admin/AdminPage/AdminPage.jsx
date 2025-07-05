// src/pages/Admin/AdminPage/AdminPage.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/admin/Sidebar/Sidebar";

const AdminPage = () => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPage;
