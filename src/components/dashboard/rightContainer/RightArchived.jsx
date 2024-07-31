import React, { useContext, useEffect } from "react";
import DataTableofArchived from "./DataTableofArchived";
import { MyContext } from "../../../AuthProvider/AuthProvider";
import { FaArchive } from "react-icons/fa";
import HamburgerMenu from "../../mobileResponcive/HamburgerMenu";
import axios from "axios";

function RightArchived() {
  const {
    triggerPoint,
    setTriggerPoint,
    ArchivedTasks,
    user,
    setArchivedTasks,
  } = useContext(MyContext);

  async function fetchArchive() {
    try {
      const response = await axios.get(
        `https://bitpastel.io/mi/adil/identity_mgmt/api/get-archive-tasks?user_id=${user?.id}`
      );
      setArchivedTasks(response?.data?.data?.archive_tasks);
      console.log(response, "archive");
    } catch (error) {
      console.log("Failed to fetch user details", error);
    }
  }

  useEffect(() => {
    fetchArchive();
  }, []);

  return (
    <div>
      <div className="d-flex align-items-center gap-3 justify-content-between">
        <h3 className="mukta-bold fs-1 d-flex align-items-center gap-2">
          <FaArchive /> Archived
        </h3>
        <HamburgerMenu />
      </div>
      <hr />

      <DataTableofArchived
        data={ArchivedTasks}
        triggerPoint={triggerPoint}
        setTriggerPoint={setTriggerPoint}
      />
    </div>
  );
}

export default RightArchived;
