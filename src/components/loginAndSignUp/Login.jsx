import React, { useContext } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../loader/Loading";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MyContext } from "../../AuthProvider/AuthProvider";

function Login({ setTogglePage, togglePage }) {
  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
    loading: false,
    error: "",
  });
  const navigate = useNavigate();
  const { triggerPoint, setTriggerPoint } = useContext(MyContext);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("email", loginData.email);
      formData.append("password", loginData.password);
      setLoginData({ ...loginData, loading: true });

      const response = await axios.post(
        "https://bitpastel.io/mi/adil/identity_mgmt/api/login",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setLoginData({
        ...loginData,
        loading: false,
        error: [],
      });
      console.log(response?.data?.data?.user);

      if (response?.data?.data?.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(response?.data?.data?.user)
        );
        toast.success("Login successful!"); // Show success toast
        setTriggerPoint({
          ...triggerPoint,
          getLogin: Math.random() + Math.random() + Math.random(),
          getUser: Math.random() + Math.random() + Math.random(),
          getTasks: Math.random() + Math.random() + Math.random(),
          getPhotos: Math.random() + Math.random() + Math.random(),
        });
        navigate("/dashboard");
      }
    } catch (error) {
      const passwordError = splitErrorMessage(
        error.response.data.message
      ).filter((msg) => msg.includes("Password"));
      const emailError = splitErrorMessage(error.response.data.message).filter(
        (msg) => msg.includes("Email")
      );
      const otherError = splitErrorMessage(error.response.data.message).filter(
        (msg) => !msg.includes("Password") && !msg.includes("Email")
      );
      setLoginData({
        ...loginData,
        loading: false,
        error: otherError,
        passwordError: passwordError,
        emailError: emailError,
      });
    }
  };

  const splitErrorMessage = (message) => {
    // Remove leading and trailing <p> tags and then split by </p><p>
    const messages = message.replace(/<\/?p>/g, "").split("\n");

    // Remove any empty strings resulting from the split
    return messages.filter((msg) => msg.trim() !== "");
  };

  return (
    <div>
      {loginData.loading ? (
        <Loading />
      ) : (
        <div className="wrapper">
          <div className="containers">
            <div className="col-left">
              <div className="login-text">
                <h2>Welcome Back</h2>
                <p>
                  Create your account.
                  <br />
                  It's totally free.
                </p>
                <a
                  className="btn mukta-semibold"
                  onClick={() => setTogglePage(!togglePage)}
                >
                  Sign Up
                </a>
              </div>
            </div>
            <div className="col-right">
              <div className="login-form">
                <h2>Login</h2>
                {loginData?.error && (
                  <strong className="error mukta-semibold">
                    {loginData.error}
                  </strong>
                )}
                <form onSubmit={handleSubmit}>
                  <p>
                    <label className="mukta-semibold">
                      Email Address<span>*</span>
                    </label>
                    <div className="input-and-logo-container">
                      <input
                        type="text"
                        value={loginData.email}
                        name="email"
                        placeholder="Please Enter Your Email"
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            email: e.target.value,
                            error: [],
                          })
                        }
                      />
                      <MdEmail className="input-logo" />
                    </div>
                    {loginData?.emailError && (
                      <strong className="error mukta-semibold">
                        {loginData.emailError}
                      </strong>
                    )}
                  </p>
                  <p>
                    <label className="mukta-semibold">
                      Password<span>*</span>
                    </label>
                    <div className="input-and-logo-container">
                      <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            password: e.target.value,
                            error: [],
                          })
                        }
                      />
                      <RiLockPasswordLine className="input-logo" />
                    </div>
                    {loginData?.passwordError && (
                      <strong className="error mukta-semibold">
                        {loginData?.passwordError}
                      </strong>
                    )}
                  </p>
                  <p>
                    <input
                      className="mukta-bold"
                      type="submit"
                      value="Sign In"
                    />
                  </p>
                  <p>
                    <Link to="forget-password" className="mukta-semibold">
                      Forget Password?
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

export default Login;
