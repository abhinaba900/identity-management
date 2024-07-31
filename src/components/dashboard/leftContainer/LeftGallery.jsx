import React from "react";
import { GrGallery } from "react-icons/gr";
import { MyContext } from "../../../AuthProvider/AuthProvider"; // Make sure the path is correct

const LeftGallery = React.memo(() => {
  const { selectedSection, navigateToSection } = React.useContext(MyContext);

  // Function to handle the click event
  const handleClick = () => {
    navigateToSection("gallery");
    sessionStorage.setItem("selectedSection", "gallery");
  };

  // Calculate class names for better readability
  const isActive = selectedSection === "gallery";
  const classNames = `mukta-semibold leftSideText ${isActive ? "active" : ""}`;

  return (
    <div>
      <h5
        className={classNames}
        onClick={handleClick}
        role="button"
        tabIndex={0}
      >
        <GrGallery />
        Gallery
      </h5>
    </div>
  );
});

export default LeftGallery;
