import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../service";

export default function Navbar() {
  let navigate = useNavigate();
  const [authUser, setAuthUser] = useState();

  const checkAuth = async () => {
    const claimUser = await getData("/user/claim-user");
    if (claimUser.success) {
      setAuthUser(claimUser.authUser);
      claimUser.authUser.type == 1
        ? navigate("/admin-home/")
        : navigate("/member-home/");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = () => {
    setAuthUser(null);
    window.localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <nav className="navbar bg-light">
      <div className="container-fluid">
        <a className="navbar-brand h1">HMS</a>
        {authUser && (
          <div className="d-flex align-items-center">
            <img
              src={`https://ui-avatars.com/api/?background=random&name=${authUser.name}`}
              className="rounded-circle me-2"
              style={{ width: "40px" }}
              alt="Avatar"
            />
            <div>{authUser.name}</div>
            <button className="btn btn-light ms-5 shadow-sm" onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
