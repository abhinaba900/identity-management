import React from "react";
import { CgProfile } from "react-icons/cg";
import { MyContext } from "../../../AuthProvider/AuthProvider"; // Correct the import path based on your folder structure

const LeftProfile = React.memo(() => {
  const { selectedSection, navigateToSection } = React.useContext(MyContext);

  // Function to handle navigation, enhances testability and maintainability
  const handleNavigate = () => {
    navigateToSection("profile");
  };

  // Conditional class application for better readability
  const isActive = selectedSection === "profile";
  const classNames = `mukta-semibold leftSideText ${isActive ? "active" : ""}`;

  return (
    <div>
      <h5
        className={classNames}
        onClick={handleNavigate}
        role="button"
        tabIndex={0}
      >
        <CgProfile />
        Profile
      </h5>
    </div>
  );
});

export default LeftProfile;
