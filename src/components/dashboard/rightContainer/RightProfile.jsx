import React, { useContext, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import { IoMdArrowRoundBack } from "react-icons/io";
import { TbFileUpload } from "react-icons/tb";
import { MyContext } from "../../../AuthProvider/AuthProvider"; // Correct path if needed
import axios from "axios";
import { toast } from "react-toastify";
import "../../../css/RightGallery.css"; // Ensure correct CSS path
import HamburgerMenu from "../../mobileResponcive/HamburgerMenu";

function RightProfile() {
  const {
    navigateBack,
    navigationStack,
    user,
    triggerPoint,
    setTriggerPoint,
    userDetails,
  } = useContext(MyContext);

  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    error: "",
  });

  // Populate initial form data from userDetails
  useEffect(() => {
    if (userDetails && userDetails.user) {
      setProfileData({
        name: userDetails.user.f_name || "",
        email: userDetails.user.email || "",
        phone: userDetails.user.mobile || "",
        dob: userDetails.user.dob || "",
        address: userDetails.user.address || "",
        error: "",
      });
    }
  }, [userDetails]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", user?.id);

    try {
      const response = await axios.post(
        "https://bitpastel.io/mi/adil/identity_mgmt/api/update-profile-image",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setTriggerPoint({ ...triggerPoint, getUser: triggerPoint.getUser + 1 });
      toast.success("Profile image updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editMode) {
      setEditMode(true);
      return;
    }

    const formData = new FormData();
    formData.append("user_id", user?.id);
    formData.append("full_name", profileData.name);
    formData.append("email", profileData.email);
    formData.append("mobile", profileData.phone);
    formData.append("dob", profileData.dob);
    formData.append("address", profileData.address);

    try {
      const response = await axios.post(
        "https://bitpastel.io/mi/adil/identity_mgmt/api/edit-profile",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setTriggerPoint({ ...triggerPoint, getUser: triggerPoint.getUser + 1 });
      toast.success("Profile updated successfully");
      setEditMode(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
      setProfileData({
        ...profileData,
        error: error.response?.data?.message || "Update failed",
      });
    }
  };

  return (
    <div className="overflow-hidden h-100 w-100 edit-profile">
      <div className="d-flex align-items-center gap-3 justify-content-between">
        <h3 className="mukta-bold fs-1 d-flex align-items-center gap-2">
          <CgProfile /> Edit Profile
        </h3>
        <HamburgerMenu />
      </div>
      <hr />
      <Button
        variant="outline-dark"
        className="mukta-bold d-flex align-items-center gap-2 back-button"
        onClick={navigateBack}
        disabled={navigationStack.length === 0}
      >
        <IoMdArrowRoundBack /> Back
      </Button>

      <div className="profile-container margin-top">
        <div className="page">
          <div className="container">
            <form className="content" onSubmit={handleSubmit}>
              <h2 className="heading">
                <img
                  width={130}
                  style={{
                    display: "block",
                    borderRadius: "50%",
                    margin: "0 auto",
                    marginBottom: "10px",
                  }}
                  src={
                    userDetails?.user?.p_image
                      ? `https://bitpastel.io/mi/adil/identity_mgmt/uploads/${userDetails.user.p_image}`
                      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="Profile Image"
                />
                {editMode && (
                  <label htmlFor="file" className="file-label">
                    <TbFileUpload className="file-icon" />
                  </label>
                )}
                <input type="file" id="file" onChange={handleFileUpload} />
              </h2>
              {profileData.error && (
                <span className="error mukta-semibold">
                  {profileData.error}
                </span>
              )}
              <div className="input-container-2">
                <label className="mukta-semibold password-label">
                  Name :-{" "}
                </label>
                <input
                  type="text"
                  className="password-input mukta-semibold"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                  disabled={!editMode}
                />
              </div>
              <div className="input-container-2">
                <label className="mukta-semibold password-label">
                  Email :-{" "}
                </label>
                <input
                  type="email"
                  className="password-input mukta-semibold"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                  disabled={!editMode}
                />
              </div>
              <div className="input-container-2">
                <label className="mukta-semibold password-label">
                  Phone :-{" "}
                </label>
                <input
                  type="text"
                  className="password-input mukta-semibold"
                  value={profileData.phone}
                  onChange={(e) =>
                    setProfileData({ ...profileData, phone: e.target.value })
                  }
                  disabled={!editMode}
                />
              </div>
              <div className="input-container-2">
                <label className="mukta-semibold password-label">DOB :- </label>
                <input
                  type="date"
                  className="password-input mukta-semibold"
                  value={profileData.dob}
                  onChange={(e) =>
                    setProfileData({ ...profileData, dob: e.target.value })
                  }
                  disabled={!editMode}
                />
              </div>
              <div className="input-container-2">
                <label className="mukta-semibold password-label">
                  Address :-{" "}
                </label>
                <input
                  type="text"
                  className="password-input mukta-semibold"
                  value={profileData.address}
                  onChange={(e) =>
                    setProfileData({ ...profileData, address: e.target.value })
                  }
                  disabled={!editMode}
                />
              </div>
              <Button className="button" type="submit">
                {editMode ? "Save Changes" : "Edit Profile"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightProfile;
