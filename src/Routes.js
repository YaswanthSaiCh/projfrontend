import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import { isUserAuthenticated } from "./auth/helper";
import UserDashboard from "./user/UserDashBoard";
import AdminDashboard from "./user/AdminDashBoard";

const RequireAuth = ({ children, redirectTo }) => {
  return isUserAuthenticated() ? children : <Navigate to={redirectTo} />;
};

const RequireAdminAuth = ({ children, redirectTo }) => {
  return isUserAuthenticated() && isUserAuthenticated().user.role === 1 ? (
    children
  ) : (
    <Navigate to={redirectTo} />
  );
};

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/signin" exact element={<Signin />} />
        <Route
          path="/user/dashboard"
          exact
          element={
            <RequireAuth redirectTo="/signin">
              <UserDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/dashboard"
          exact
          element={
            <RequireAdminAuth redirectTo="/signin">
              <AdminDashboard />
            </RequireAdminAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
