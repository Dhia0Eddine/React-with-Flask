// src/pages/Admin/AdminPage/AdminPage.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/admin/Sidebar/Sidebar";

const AdminPage = () => {
  return (
    <div className="grid grid-cols-[250px_1fr] min-h-screen">
      <Sidebar />
      <div className="p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPage;
