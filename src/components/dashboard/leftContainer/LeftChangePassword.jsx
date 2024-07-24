import React from "react";
import { MyContext } from "../../../AuthProvider/AuthProvider"; // Update path if needed
import { Button } from "react-bootstrap";

const LeftChangePassword = React.memo(() => {
  const { setOpenModal } = React.useContext(MyContext);

  const handleShow = (e) => {
    e.preventDefault();
    console.log("Attempting to open modal"); // Debug log
    setOpenModal(true);
  };

  return (
    <div className="submenu-item">
      <Button
        variant="transparent"
        color="white"
        onClick={handleShow}
        className="submenu-link mukta-semibold "
      >
        Change Password
      </Button>
    </div>
  );
});

export default LeftChangePassword;
