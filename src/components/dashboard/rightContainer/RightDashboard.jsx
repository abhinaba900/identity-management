import React, { useContext } from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaRegImage, FaTasks, FaArchive } from "react-icons/fa"; // Correct icon import

import { MyContext } from "../../../AuthProvider/AuthProvider"; // Correct the path as needed
import HamburgerMenu from "../../mobileResponcive/HamburgerMenu";

function RightDashboard() {
  const { navigateToSection, userDetails } = useContext(MyContext);

  return (
    <div>
      <div className="d-flex align-items-center gap-3 justify-content-between">
        <h3 className="mukta-bold fs-1 d-flex align-items-center gap-2">
          <AiOutlineDashboard /> Dashboard
        </h3>
        <HamburgerMenu />
      </div>
      <hr />

      <div className="dashboard-card-parent-container">
        <div
          className="d-flex align-items-center gap-3 justify-content-between dashboard-card-child"
          onClick={() => navigateToSection("gallery")}
        >
          <div>
            <h3 className="mukta-semibold fs-3 mb-0">
              {userDetails?.all_photos || "0"}
            </h3>
            <h3 className="mukta-semibold fs-3 mb-0">Photos</h3>
          </div>
          <FaRegImage className="fs-1" />
        </div>
        <div
          className="d-flex align-items-center gap-3 justify-content-between dashboard-card-child"
          onClick={() => navigateToSection("taskManager")}
        >
          <div>
            <h3 className="mukta-semibold fs-3 mb-0">
              {userDetails?.all_active_tasks || "0"}
            </h3>
            <h3 className="mukta-semibold fs-3 mb-0">Active Tasks</h3>
          </div>
          <FaTasks className="fs-1" />
        </div>
        <div
          className="d-flex align-items-center gap-3 justify-content-between dashboard-card-child"
          onClick={() => navigateToSection("archived")}
        >
          <div>
            <h3 className="mukta-semibold fs-3 mb-0">
              {userDetails?.all_archive_tasks || "0"}
            </h3>
            <h3 className="mukta-semibold fs-3 mb-0">Archived</h3>
          </div>
          <FaArchive className="fs-1" />
        </div>
      </div>
    </div>
  );
}

export default RightDashboard;
