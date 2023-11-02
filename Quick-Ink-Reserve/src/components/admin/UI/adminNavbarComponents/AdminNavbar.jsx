import React from "react";
import { ListComponent } from "../homeNavbarComponents/ListComponent";
import logo from "../../../../assets/logo.png";
import axios from "axios";
import LogoutButton from "../LogoutButton";

export function AdminNavbar({ loginStatus, user, setLoginStatus, setUser, defaultActive }) {
  const handleLogout = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/logout")
      .then((response) => {
        if (response.status === 200) {
          setUser("");
          setLoginStatus(false);
          nav("/");
        } else {
          console.error("Logout error:", response);
        }
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };
  return (
    <div className="flex flex-col h-11/12 w-[1/6] bg-blue-500 rounded-lg m-2">
      <div className="h-2/3 w-full">
        <img src={logo} alt="Logo" className="h-[10%] w-[90%] m-auto my-5" />
        <ListComponent defaultActive={defaultActive} />
      </div>
      {loginStatus != false ? (
        <LogoutButton handleLogout={handleLogout} centered={false} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default AdminNavbar;
