import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [role, setRole] = useState("freelancer");

  const handleButtonClick = async () => {
   
    setLoading(true);
    // setError(null);
    try {
      const response = await fetch('http://localhost:3000/users/register',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            email,
            password,
            role
        }),
      });
     
      const data = await response.json();
      console.log("EHEHHE", data)
    if (data.success) {
      toast.success("Registered successfully");
      setName("");
      setEmail("");
      setPassword("");
      setRepeatPassword("");
    } else {
      toast.error(data.message);
    }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
    
  };
  const loginViaGoogle = () => {
    setLoading(true);
    try {
      window.open("http://localhost:3000/users/auth/google", "_self")
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div id="titlebar" class="gradient">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h2>Register</h2>

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
                <h3 style={{ fontSize: "26px" }}>Let's create your account!</h3>
                <span>
                  Already have an account?{" "}
                  <a  onClick={() => {
                    navigate("/login");
                  }}style={{ color: '#770737', textDecoration: 'underline' ,cursor: "pointer"}}>Log In!</a>
                </span>
              </div>

              {/* <!-- Account Type --> */}
              <div class="account-type">
                <div>
                  <input
                    type="radio"
                    name="account-type-radio"
                    id="freelancer-radio"
                    class="account-type-radio"
                    checked={role === "freelancer"}
                    onClick={(e) => {
                      if (e.target.checked) setRole("freelancer");
                    }}
                  />
                  <label for="freelancer-radio" class="ripple-effect-dark">
                    <i class="icon-material-outline-account-circle"></i>{" "}
                    Freelancer
                  </label>
                </div>

                <div>
                  <input
                    type="radio"
                    name="account-type-radio"
                    id="employer-radio"
                    class="account-type-radio"
                    checked={role === "employer"}
                    onClick={(e) => {
                      if (e.target.checked) setRole("employer");
                    }}
                  />
                  <label for="employer-radio" class="ripple-effect-dark">
                    <i class="icon-material-outline-business-center"></i>{" "}
                    Employer
                  </label>
                </div>
              </div>

              {/* <!-- Form --> */}
              <form method="post" id="register-account-form">
                <div class="input-with-icon-left">
                  <i class="icon-material-baseline-mail-outline"></i>
                  <input
                    type="text"
                    class="input-text with-border"
                    name="name-register"
                    id="name-register"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div class="input-with-icon-left">
                  <i class="icon-material-baseline-mail-outline"></i>
                  <input
                    type="text"
                    class="input-text with-border"
                    name="emailaddress-register"
                    id="emailaddress-register"
                    placeholder="Email Address"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>

                <div
                  class="input-with-icon-left"
                  title="Should be at least 8 characters long"
                  data-tippy-placement="bottom"
                >
                  <i class="icon-material-outline-lock"></i>
                  <input
                    type="password"
                    class="input-text with-border"
                    name="password-register"
                    id="password-register"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>

                <div class="input-with-icon-left">
                  <i class="icon-material-outline-lock"></i>
                  <input
                    type="password"
                    class="input-text with-border"
                    name="password-repeat-register"
                    id="password-repeat-register"
                    placeholder="Repeat Password"
                    required
                    value={repeatPassword}
                    onChange={(e) => {
                      setRepeatPassword(e.target.value);
                    }}
                  />
                </div>
              </form>

              {/* <!-- Button --> */}
              <button
                class="button full-width button-sliding-icon ripple-effect margin-top-10"
                type="submit"
                form="login-form"
                button
                onClick={handleButtonClick}
                disabled={loading}
              >
                {loading ? "Register" : "Register"}
                {/* {data && (
            <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
            )} */}
              </button>

              {/* <!-- Social Login --> */}
              <div class="social-login-separator">
                <span>or</span>
              </div>
              <div class="social-login-buttons">
                <button class="google-login ripple-effect" onClick={loginViaGoogle}>
                  <i class="icon-brand-google-plus-g"></i> Register via Google+
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Register;
