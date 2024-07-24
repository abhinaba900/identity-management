import React, { useContext } from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import "../../css/LoginAndSignUp.css";
import { MyContext } from "../../AuthProvider/AuthProvider";
import { Navigate } from "react-router-dom";

function LoginAndSignUp() {
  const { togglePage, setTogglePage } = useContext(MyContext);
  const user = JSON.parse(localStorage.getItem("user"));

  // Redirect if the user is already logged in
  if (user) {
    return <Navigate to="/dashboard" />;
  }

  // Component to render based on the togglePage state
  const ComponentToRender = togglePage ? Login : SignUp;

  return (
    <div>
      <ComponentToRender setTogglePage={setTogglePage} togglePage={togglePage} />
    </div>
  );
}

export default LoginAndSignUp;
