import React from "react";
import { FaArchive } from "react-icons/fa";
import { MyContext } from "../../../AuthProvider/AuthProvider";

const LeftArchived = React.memo(() => {
  const { selectedSection, navigateToSection } = React.useContext(MyContext);

  // Function to handle click, making it testable and reusable
  const handleNavigate = () => navigateToSection("archived");

  // Determine CSS classes based on the current section for better readability
  const isActive = selectedSection === "archived";
  const classNames = `mukta-semibold leftSideText ${isActive ? "active" : ""}`;

  return (
    <div>
      <h5
        className={classNames}
        onClick={handleNavigate}
        role="button" // Enhances accessibility
        tabIndex={0} // Allows keyboard interaction
      >
        <FaArchive />
        Archived
      </h5>
    </div>
  );
});

export default LeftArchived;
