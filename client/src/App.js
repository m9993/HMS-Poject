import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import AdminHomePage from "./pages/admin/AdminHomePage";
import MemberHomePage from "./pages/member/MemberHomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import SeatViewPage from "./pages/admin/seat/SeatViewPage";
import Navbar from "./components/Navbar";

export default function App() {
  const [navReload, setNavReload] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Navbar navReload={navReload} setNavReload={setNavReload}/>
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
          <Route path="/" element={<LoginPage setNavReload={setNavReload} />} />
          <Route path="/admin-home/" element={<AdminHomePage />} />
          <Route path="/seats/" element={<SeatViewPage />} />

          <Route path="/member-home/" element={<MemberHomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
