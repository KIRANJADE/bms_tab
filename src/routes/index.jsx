// import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginLayout from "../layout/Login";
import DashboardLayout from "../layout/Dashboard";
import Login from "../pages/login/login";
import Dashboard from "../pages/dashboard/dashboard";
import Chantha from "../pages/chantha/chantha";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<h1>Not found</h1>} />
      <Route element={<LoginLayout />}>
        <Route path="/" element={<Login />} />
      </Route>
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chantha" element={<Chantha />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
