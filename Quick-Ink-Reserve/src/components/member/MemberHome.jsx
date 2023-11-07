import React, { useEffect } from "react";
import axios from "axios";
import LandingPage from "./LandingPage";
import { useAppContext } from "../../controllers/auth/AuthContext";
import CheckUser, { CheckMember } from "../../controllers/CheckUser";
import { TabTitle } from "../../utils/GeneralFunctions";

function MemberHome({ nav }) {
  const { loginStatus, user, setLoginStatus, setUser } = useAppContext();
  TabTitle("Home", true);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    CheckUser(loginStatus, user, nav);
    if(CheckMember(user)) nav("/")
  }, []);

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
        console.log("Logout error:", error);
      });
  };

  return (
    <div className="h-full w-full overflow-x-hidden scroll-smooth">
      <LandingPage handleLogout={handleLogout} />
    </div>
  );
}

export default MemberHome;
