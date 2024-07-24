import React from "react";
import LeftImgWname from "./LeftImgWname";
import LeftArchived from "./LeftArchived";
import LeftDashboard from "./LeftDashboard";
import LeftProfile from "./LeftProfile";
import LeftGallery from "./LeftGallery";
import LeftTaskManager from "./LeftTaskManager";

function LeftComponent() {
  return (
    <div className=" left-component-container">
      <div className="w-100  m-auto pt-3 ">
        <h3 className="text-center mukta-semibold text-white mb-0 fs-4">
          Identity Management
        </h3>
      </div>
      <hr style={{ color: "white" }} />
      <LeftImgWname />
      <hr style={{ color: "white" }} />
      <LeftDashboard />
      <LeftProfile />
      <LeftGallery />
      <LeftTaskManager />
      <LeftArchived />
    </div>
  );
}

export default LeftComponent;
