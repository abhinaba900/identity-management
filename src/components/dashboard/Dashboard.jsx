import React, { useState, useEffect } from "react";
import "../../css/DashBoard.css";
import LeftComponent from "./leftContainer/LeftComponent";
import RightComponent from "./rightContainer/RightComponent";
import { Navigate } from "react-router-dom";


function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1200);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [window.innerWidth]);

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div
      className="d-flex  w-100 parent-container-of-dashboard"
      style={{ backgroundColor: "#CADCFC" }}
    >
      
      {!isMobile && <LeftComponent />}
      <RightComponent />
    </div>
  );
}

export default Dashboard;
