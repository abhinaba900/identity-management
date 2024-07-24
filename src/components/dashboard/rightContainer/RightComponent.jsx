import React, { useContext, lazy, Suspense } from "react";
import { MyContext } from "../../../AuthProvider/AuthProvider"; // Adjust the path as needed

// Lazy load components
const RightDashboard = lazy(() => import("./RightDashboard"));
const RightTaskManager = lazy(() => import("./RightTaskManager"));
const RightGallery = lazy(() => import("./RightGallery"));
const RightArchived = lazy(() => import("./RightArchived"));
const RightProfile = lazy(() => import("./RightProfile"));
const RightChangePassword = lazy(() => import("./RightChangePassword"));

function RightComponent() {
  const { selectedSection } = useContext(MyContext);

  const renderSection = (section) => {
    switch (section) {
      case "dashboard":
        return <RightDashboard />;
      case "taskManager":
        return <RightTaskManager />;
      case "gallery":
        return <RightGallery />;
      case "archived":
        return <RightArchived />;
      case "profile":
        return <RightProfile />;
      default:
        return <div>Select a section from the menu.</div>;
    }
  };

  return (
    <div className="w-100 border p-3">
      <Suspense fallback={<div>Loading...</div>}>
        {renderSection(selectedSection)}
        <RightChangePassword />
      </Suspense>
    </div>
  );
}

export default RightComponent;
