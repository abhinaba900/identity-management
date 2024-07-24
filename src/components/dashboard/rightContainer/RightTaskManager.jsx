import React, { useContext, useEffect, useState } from "react";
import DataTable from "./DataTable";
import { MyContext } from "../../../AuthProvider/AuthProvider";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Button } from "react-bootstrap";
import { GrTask } from "react-icons/gr";
import HamburgerMenu from "../../mobileResponcive/HamburgerMenu";

function RightTaskManager() {
  const {
    TaskManager,
    navigateBack,
    navigationStack,
    user,
    triggerPoint,
    setTriggerPoint,
  } = useContext(MyContext);
  const [filteredTaskManager, setFilteredTaskManager] = useState([]);
  useEffect(() => {
    setFilteredTaskManager(TaskManager.filter((item) => item?.status === "1"));
  }, [TaskManager]);
  console.log(filteredTaskManager);
  return (
    <div>
      <div className="d-flex align-items-center gap-3 justify-content-between">
        <h3 className="mukta-bold fs-1 d-flex align-items-center gap-2">
          <GrTask /> Task Manager
        </h3>
        <HamburgerMenu />
      </div>
      <hr />
      <div className="d-flex align-items-center gap-3 justify-content-between">
        <Button
          variant="outline-dark"
          className="mukta-bold d-flex align-items-center gap-2 back-button"
          onClick={navigateBack}
          disabled={navigationStack.length === 0}
        >
          <IoMdArrowRoundBack /> Back
        </Button>
      </div>

      <DataTable
        data={filteredTaskManager}
        userId={user.id}
        setTriggerPoint={setTriggerPoint}
        triggerPoint={triggerPoint}
      />
    </div>
  );
}

export default RightTaskManager;
