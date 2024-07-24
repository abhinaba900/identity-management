import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "../App";
import LoginAndSignUp from "../components/loginAndSignUp/LoginAndSignUp";
import ForgetPassword from "../components/fogetPassword/ForgetPassword";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginAndSignUp />} />
      <Route path="/dashboard" element={<App />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
    </Routes>
  );
}

export default AllRoutes;
