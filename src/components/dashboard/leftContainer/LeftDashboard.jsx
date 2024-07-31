import React from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { MyContext } from "../../../AuthProvider/AuthProvider"; // Ensure the correct path is specified

const LeftDashboard = React.memo(() => {
  const { selectedSection, navigateToSection } = React.useContext(MyContext);

  // Function to handle click event
  const handleClick = () => {
    navigateToSection("dashboard");
    sessionStorage.setItem("selectedSection", "dashboard");
  };

  // Dynamic class assignment for better readability
  const isActive = selectedSection === "dashboard";
  const classNames = `mukta-semibold leftSideText ${isActive ? "active" : ""}`;

  return (
    <div>
      <h5
        className={classNames}
        onClick={handleClick}
        role="button"
        tabIndex={0}
      >
        <AiOutlineDashboard />
        Dashboard
      </h5>
    </div>
  );
});

export default LeftDashboard;
