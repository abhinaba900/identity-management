import React from "react";
import { FaTasks } from "react-icons/fa";
import { MyContext } from "../../../AuthProvider/AuthProvider"; // Correct the import path based on your folder structure

const LeftTaskManager = React.memo(() => {
  const { selectedSection, navigateToSection } = React.useContext(MyContext);

  // Function to handle the navigation, encapsulating logic for clarity
  const handleNavigate = () => {
    navigateToSection("taskManager");
    sessionStorage.setItem("selectedSection", "taskManager");
  };

  // Determine CSS class based on the current section for better readability
  const isActive = selectedSection === "taskManager";
  const classNames = `mukta-semibold leftSideText ${isActive ? "active" : ""}`;

  return (
    <div>
      <h5
        className={classNames}
        onClick={handleNavigate}
        role="button"
        tabIndex={0} // Makes the element focusable and navigable via keyboard
      >
        <FaTasks />
        Task Manager
      </h5>
    </div>
  );
});

export default LeftTaskManager;
