import React from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../../AuthProvider/AuthProvider"; // Ensure correct path
import LeftChangePassword from "./LeftChangePassword";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

function LeftImgWname() {
  const { userDetails, setSelectedSection } = React.useContext(MyContext);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    sessionStorage.clear();
    setSelectedSection("dashboard");
    toast.success("Logged Out Successfully");
    navigate("/"); // Navigate to the login or desired page after logout
  }

  const imageUrl = userDetails?.user?.p_image
    ? `https://bitpastel.io/mi/adil/identity_mgmt/uploads/${userDetails.user.p_image}`
    : "https://static.vecteezy.com/system/resources/previews/029/156/453/original/admin-business-icon-businessman-business-people-male-avatar-profile-pictures-man-in-suit-for-your-web-site-design-logo-app-ui-solid-style-illustration-design-on-white-background-eps-10-vector.jpg";

  const classNames = `mukta-semibold leftSideText`;

  return (
    <div className="w-100 m-auto">
      <div className="menu">
        <div className="item">
          <div className="link d-flex align-items-center justify-content-center gap-3 w-100">
            <img
              width="20%"
              style={{ borderRadius: "50%" }}
              src={imageUrl}
              alt="User"
            />
            <h3 className="text-center mukta-medium text-white mb-0 fs-4">
              {userDetails?.user?.f_name || "User"}
            </h3>
          </div>
          <div className="submenu">
            <LeftChangePassword />
            <div className="submenu-item">
              <Button
                variant="transparent"
                color="white"
                className="submenu-link mukta-semibold "
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftImgWname;
