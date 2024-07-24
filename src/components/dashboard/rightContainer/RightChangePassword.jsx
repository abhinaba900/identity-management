import React, { useState, useEffect, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { MyContext } from "../../../AuthProvider/AuthProvider";
import "../../../css/changePassword.css";
import axios from "axios";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";

function RightChangePassword() {
  const { openModal, setOpenModal, user } = useContext(MyContext);

  const handleClose = () => setOpenModal(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypeNewPassword, setRetypeNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState({
    label: "",
    barWidth: 0,
    barColor: "",
  });
  const [error, setError] = useState("");

  const hasUpperCase = (string) => /[A-Z]/.test(string);
  const hasSpecialChar = (string) =>
    /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(string);

  useEffect(() => {
    const calculateStrength = () => {
      let strengthLevel = 0;
      const validations = [
        newPassword.length >= 8,
        hasUpperCase(newPassword),
        hasSpecialChar(newPassword),
      ];

      validations.forEach((valid) => {
        if (valid) strengthLevel++;
      });

      switch (strengthLevel) {
        case 1:
          setStrength({ label: "Weak", barWidth: 33, barColor: "chocolate" });
          break;
        case 2:
          setStrength({ label: "Medium", barWidth: 66, barColor: "#d0ce3e" });
          break;
        case 3:
          setStrength({
            label: "Excellent",
            barWidth: 100,
            barColor: "#41ce55",
          });
          break;
        default:
          setStrength({ label: "", barWidth: 0, barColor: "" });
          break;
      }
    };

    calculateStrength();
  }, [newPassword]); // Explicit dependency

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");

      if (newPassword !== retypeNewPassword) {
        setError("New password and re-typed password do not match.");
        return;
      }

      if (
        newPassword.length < 8 ||
        !hasUpperCase(newPassword) ||
        !hasSpecialChar(newPassword)
      ) {
        setError("New password does not meet the strength requirements.");
        return;
      }

      const formData = new FormData();
      formData.append("user_id", user?.id);
      formData.append("current_password", currentPassword);
      formData.append("new_password", newPassword);
      formData.append("confirm_new_password", retypeNewPassword);

      // Perform password change logic here
      const responce = await axios.post(
        "https://bitpastel.io/mi/adil/identity_mgmt/api/change-password",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Add your form submission logic here

      console.log("Password change successful:", responce);

      // Reset form fields after submission
      setCurrentPassword("");
      setNewPassword("");
      setRetypeNewPassword("");
      setStrength({ label: "", barWidth: 0, barColor: "" });
      setShowPassword(false);
      setOpenModal(false);
      toast.success("Password changed successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setError(error.response.data.message);
    }
  };

  return (
    <Modal show={openModal} onHide={handleClose} centered size="md">
      <Modal.Body>
        <div className="page">
          <div className="container">
            <form className="content" onSubmit={handleSubmit}>
              <h2 className="heading d-flex justify-content-between align-items-center">
                Change Password <IoClose style={{ cursor: "pointer" }} onClick={handleClose} />
              </h2>
              {error && <div className="error mukta-semibold">{error}</div>}
              <label htmlFor="currentPassword" className="mukta-semibold">
                Current Password
              </label>
              <div className="input-container">
                <div className="password-container">
                  <input
                    className="password-input"
                    type={showPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
                <span
                  className="show-password mukta-semibold"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
              <label htmlFor="newPassword" className="mukta-semibold">
                New Password
              </label>
              <div className="input-container">
                <div className="password-container">
                  <input
                    className="password-input"
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <span
                  className="show-password mukta-semibold"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
              <div className="password-strength">
                <small className="mukta-semibold">Password strength</small>
                <div className="progress-bar">
                  <div
                    className="bar"
                    style={{
                      width: `${strength.barWidth}%`,
                      backgroundColor: strength.barColor,
                    }}
                  ></div>
                </div>
                <small className="password-strength-text">
                  {strength.label}
                </small>
              </div>
              <div className="validation-list">
                <span className="mukta-semibold">Must contain at least</span>
                <ul className="validation-items">
                  <li className="validation-item">
                    <span
                      className="validation-item-dot-1"
                      style={{
                        display: newPassword.length >= 8 ? "none" : "inline",
                      }}
                    ></span>
                    <span
                      className="validation-item-check-1"
                      style={{
                        display: newPassword.length >= 8 ? "inline" : "none",
                      }}
                    >
                      &#10003;
                    </span>
                    <span className="validation-item-text mukta-semibold">
                      8 letters
                    </span>
                  </li>
                  <li className="validation-item">
                    <span
                      className="validation-item-dot-2"
                      style={{
                        display: hasUpperCase(newPassword) ? "none" : "inline",
                      }}
                    ></span>
                    <span
                      className="validation-item-check-2"
                      style={{
                        display: hasUpperCase(newPassword) ? "inline" : "none",
                      }}
                    >
                      &#10003;
                    </span>
                    <span className="validation-item-text mukta-semibold">
                      1 uppercase character
                    </span>
                  </li>
                  <li className="validation-item">
                    <span
                      className="validation-item-dot-3"
                      style={{
                        display: hasSpecialChar(newPassword)
                          ? "none"
                          : "inline",
                      }}
                    ></span>
                    <span
                      className="validation-item-check-3"
                      style={{
                        display: hasSpecialChar(newPassword)
                          ? "inline"
                          : "none",
                      }}
                    >
                      &#10003;
                    </span>
                    <span className="validation-item-text mukta-semibold">
                      1 special character
                    </span>
                  </li>
                </ul>
              </div>
              <label htmlFor="retypeNewPassword" className="mukta-semibold">
                Re-type New Password
              </label>
              <div className="input-container">
                <div className="password-container">
                  <input
                    className="password-input"
                    type={showPassword ? "text" : "password"}
                    value={retypeNewPassword}
                    onChange={(e) => setRetypeNewPassword(e.target.value)}
                    required
                  />
                </div>
                <span
                  className="show-password mukta-semibold"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>

              <button className="button" type="submit">
                Update
              </button>
            </form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default RightChangePassword;
