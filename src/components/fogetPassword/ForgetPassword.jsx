import React, { useContext, useState } from "react";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../loader/Loading";
import { MyContext } from "../../AuthProvider/AuthProvider"; // Adjust the import path as needed

function ForgetPassword() {
  const { setTogglePage } = useContext(MyContext);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get(
        `https://bitpastel.io/mi/adil/identity_mgmt/api/forgot-password?email=${email}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Response:", response.data);
      toast.success("Password reset instructions sent to your email.");
      navigate("/"); // Navigating to home or login page post-success
      setTogglePage(true);
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred"
      );
      setError(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="wrapper">
          <div className="containers">
            <div className="col-left">
              <div className="login-text">
                <h2 className="mukta-semibold" style={{marginLeft: "-10px"}}>Forget Password</h2>
                <p className="mukta-semibold" style={{marginLeft: "-10px"}}>
                  You will receive a new password <br /> in your email.
                </p>
              </div>
            </div>
            <div className="col-right">
              <div className="login-form">
                <h2>Forget Password</h2>
                <form onSubmit={handleSubmit}>
                  <p>
                    <label className="mukta-semibold">
                      Email Address<span>*</span>
                    </label>
                    <div className="input-and-logo-container">
                      <input
                        type="email"
                        placeholder="Please Enter Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <MdEmail className="input-logo" />
                    </div>
                    {error && (
                      <strong className="error mukta-semibold">{error}</strong>
                    )}
                  </p>
                  <p>
                    <input
                      type="submit"
                      className="mukta-semibold"
                      value="Request To Reset Password"
                    />
                  </p>
                  <p>
                    <Link
                      className="mukta-semibold"
                      to="/"
                      onClick={() => setTogglePage(true)}
                    >
                      Login Again
                    </Link>{" "}
                    |
                    <Link
                      className="mukta-semibold"
                      to="/"
                      onClick={() => setTogglePage(false)}
                    >
                      Sign Up
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgetPassword;
