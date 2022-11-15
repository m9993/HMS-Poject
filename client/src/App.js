import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import AdminHomePage from "./pages/admin/AdminHomePage";
import MemberHomePage from "./pages/member/MemberHomePage";
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin-home/" element={<AdminHomePage />} />
          <Route path="/member-home/" element={<MemberHomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
