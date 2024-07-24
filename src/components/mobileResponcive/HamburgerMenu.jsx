import React, { useEffect, useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "react-bootstrap";
import { GiHamburgerMenu } from "react-icons/gi";
import LeftComponent from "../dashboard/leftContainer/LeftComponent";
function HamburgerMenu() {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1200);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [window.innerWidth]);
  return (
    <div>
      {isMobile && (
        <>
          <Button
            onClick={() => setVisible(true)}
            variant="outline-dark"
            className="mukta-bold d-flex align-items-center gap-2 back-button"
          >
            <GiHamburgerMenu />
          </Button>
          <Sidebar
            visible={visible}
            onHide={() => setVisible(false)}
            className="left-side-container"
          >
            <LeftComponent />
          </Sidebar>
        </>
      )}
    </div>
  );
}

export default HamburgerMenu;
