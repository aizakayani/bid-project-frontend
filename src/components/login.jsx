import React, { useState, useContext, useEffect } from "react";
import { loginUserAPI, verifyAccountAPI } from "../services/user";
import { UserContext } from "../context/userContext";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import ForgetPassword from "./modals/ForgetPassword";

function Login() {
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ShowForgetPassword, setShowForgetPasswordPopup] = useState(false);
  const [verificationLinkSentAgain, setVerificationLinkSentAgain] = useState(false);
  const [verificationSuccessfull, setVerificationSuccessfull] = useState(false);
  const [verificationApplied, setVerificationApplied] = useState(false);
  useEffect(() => {
    // check if verification is required
    const queryParameters = new URLSearchParams(window.location.search);
    let verification = queryParameters.get("verification");
    let userId = queryParameters.get("id");
    if (verification == 1 && !verificationApplied) {
      setVerificationApplied(true);
      verifyAccount(userId);
    }
  }, []);
  const verifyAccount = async (userId) => {
    try {
      const response = await verifyAccountAPI(userId);
      if (response?.success) {
        setVerificationSuccessfull(true);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleLogin = async () => {
    setLoading(true);
    try {
      const payload = {
        email,
        password,
      };
      const response = await loginUserAPI(payload);
      if (response.success) {
        localStorage.setItem("token", response.token);
        const decodedToken = jwtDecode(response.token);
        const userData = {
          name: decodedToken.name,
          email: decodedToken.email,
          role: decodedToken.role,
          _id: decodedToken.id,
        };
        setUser(userData);
        setIsLoggedIn(true);
        toast.success("Login successfull");
        navigate("/");
        setLoading(false);
      } else if (response?.errorCode === 3000) {
        setVerificationLinkSentAgain(true);
        toast.error("Login failed");
        setLoading(false);
      } else {
        setLoading(false);
        toast.error("Login failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loginViaGoogle = () => {
    setLoading(true);
    try {
      window.open("http://localhost:3000/users/auth/google", "_self");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <!-- Titlebar
================================================== --> */}
      <div id="titlebar" class="gradient">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h2>Log In</h2>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Page Content
================================================== --> */}
      <div class="container">
        <div class="row">
          <div class="col-xl-5 offset-xl-3">
            <div class="login-register-page">
              {/* <!-- Welcome Text --> */}
              <div class="welcome-text">
                <h3>We're glad to see you again!</h3>
                {verificationLinkSentAgain && <p style={{ color: 'red' }}>Account has not been verified yet. Verification link has been sent to your email. please follow that email to continue.</p>}
                {verificationSuccessfull && <p>Account verified successfully. Please login to continue</p>}
                <span>
                  Don't have an account?{" "}
                  <a
                    onClick={() => {
                      navigate("/register");
                    }}
                    style={{ color: "#770737", textDecoration: "underline", cursor: "pointer" }}
                  >
                    Sign Up!
                  </a>
                </span>
              </div>

              {/* <!-- Form --> */}
              <form method="post" id="login-form">
                <div class="input-with-icon-left">
                  <i class="icon-material-baseline-mail-outline"></i>
                  <input
                    type="text"
                    class="input-text with-border"
                    name="emailaddress"
                    id="emailaddress"
                    placeholder="Email Address"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>

                <div class="input-with-icon-left">
                  <i class="icon-material-outline-lock"></i>
                  <input
                    type="password"
                    class="input-text with-border"
                    name="password"
                    id="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <a onClick={() => {
                  navigate("/reset-password");
                }}
                  class="forgot-password">
                  Forgot Password?

                </a>
              </form>
              {/* <!-- Button --> */}
              <button
                class="button full-width button-sliding-icon ripple-effect margin-top-10"
                type="submit"
                form="login-form"
                button
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? (<>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Loading...
                </>
                ) : (
                  'Login'
                )}
              </button>

              {/* <!-- Social Login --> */}
              <div class="social-login-separator">
                <span>or</span>
              </div>
              <div class="social-login-buttons">
                <button
                  class="google-login ripple-effect"
                  onClick={loginViaGoogle}
                >
                  <i class="icon-brand-google-plus-g"></i> Log In via Google+
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {ShowForgetPassword && <ForgetPassword show={ShowForgetPassword} handleClose={() => setShowForgetPasswordPopup(false)} handleSubmit={() => setShowForgetPasswordPopup(false)} />}
    </>
  );
}
export default Login;
