import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaUserAlt, FaPhoneAlt } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS

function SignUp({ setTogglePage, togglePage }) {
  const [user, setUser] = useState({
    f_name: "",
    email: "",
    mobile: "",
    errorF_name: "",
    errorEmail: "",
    errorMobile: "",
    loading: false,
    error: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("f_name", user.f_name);
      formData.append("email", user.email);
      formData.append("mobile", user.mobile);

      setUser({ ...user, loading: true });

      const response = await axios.post(
        "https://bitpastel.io/mi/adil/identity_mgmt/api/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response?.data?.message) {
        toast.success("Signup successful!"); // Show success toast
        setTogglePage(!togglePage);
        setUser({
          ...user,
          loading: false,
          f_name: "",
          email: "",
          mobile: "",
          error: [],
        });
      } else {
        console.log("Unexpected response structure:", response);
        toast.success("Signup successful!"); // Show success toast
        setTogglePage(!togglePage);
        setUser({
          ...user,
          loading: false,
          f_name: "",
          email: "",
          mobile: "",
          error: [],
        });
      }
    } catch (error) {
      console.log(error);
      let errorMessage = "An error occurred";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }

      const nameError = splitErrorMessage(errorMessage).filter((msg) =>
        msg.includes("Name")
      );
      const emailError = splitErrorMessage(errorMessage).filter((msg) =>
        msg.includes("Email")
      );
      const mobileError = splitErrorMessage(errorMessage).filter((msg) =>
        msg.includes("Mobile")
      );
      const otherError = splitErrorMessage(errorMessage).filter(
        (msg) =>
          !msg.includes("Name") &&
          !msg.includes("Email") &&
          !msg.includes("Mobile")
      );

      setUser({
        ...user,
        loading: false,
        error: otherError.join(", "),
        errorF_name: nameError.join(", "),
        errorEmail: emailError.join(", "),
        errorMobile: mobileError.join(", "),
      });

      console.log(errorMessage);
    }
  };

  const splitErrorMessage = (message) => {
    const messages = message.replace(/<\/?p>/g, "").split("\n");
    return messages.filter((msg) => msg.trim() !== "");
  };

  return (
    <div className="wrapper">
      <div className="containers">
        <div className="col-left">
          <div className="login-text">
            <h2 className="mukta-bold">Welcome</h2>
            <p>
              If you already have an account
              <br />
              with us, please login.
            </p>
            <a className="btn" onClick={() => setTogglePage(!togglePage)}>
              Login
            </a>
          </div>
        </div>
        <div className="col-right">
          <div className="login-form">
            <h2>Sign Up</h2>
            {user.error && (
              <strong className="error mukta-semibold">{user.error}</strong>
            )}
            <form onSubmit={handleSubmit}>
              <p>
                <label className="mukta-semibold">
                  Enter Your Username<span>*</span>
                </label>
                <div className="input-and-logo-container">
                  <input
                    type="text"
                    placeholder="Username"
                    value={user.f_name}
                    onChange={(e) =>
                      setUser({ ...user, f_name: e.target.value })
                    }
                  />
                  <FaUserAlt className="input-logo" />
                </div>
                {user.errorF_name && (
                  <strong className="error mukta-semibold">
                    {user.errorF_name}
                  </strong>
                )}
              </p>
              <p>
                <label className="mukta-semibold">
                  Enter Your Email<span>*</span>
                </label>
                <div className="input-and-logo-container">
                  <input
                    type="text"
                    placeholder="Email"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                  <MdEmail className="input-logo" />
                </div>
                {user.errorEmail && (
                  <strong className="error mukta-semibold">
                    {user.errorEmail}
                  </strong>
                )}
              </p>
              <p>
                <label className="mukta-semibold">
                  Enter Your Phone Number<span>*</span>
                </label>
                <div className="input-and-logo-container">
                  <input
                    value={user.mobile}
                    type="text"
                    placeholder="Enter Your Phone Number"
                    onChange={(e) =>
                      setUser({ ...user, mobile: e.target.value })
                    }
                  />
                  <FaPhoneAlt className="input-logo" />
                </div>
                {user.errorMobile && (
                  <strong className="error mukta-semibold">
                    {user.errorMobile}
                  </strong>
                )}
              </p>
              <p>
                <input
                  className="mukta-semibold"
                  type="submit"
                  value="Sign Up"
                />
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
