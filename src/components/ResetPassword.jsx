import React, { useEffect, useState } from 'react';
import { forgetPasswordAPI, resetPasswordAPI } from '../services/user';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [view, setView] = useState(null);
  const [token, setToken] = useState(null);

  const handleForgetPassword = async () => {
    try {
      const response = await forgetPasswordAPI({ email });
      if (response?.success) {
        setView("message")
      } else {
        if (response?.message) {
          toast.error(response.message);
        } else
          toast.error("Failed to send email")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePasswordReset = async () => {
    // Perform password update logic here
    try {
      const response = await resetPasswordAPI({ newPassword, token });
      if (response?.success) {
        toast.success("Password updated successfully")
        navigate('/login')
      } else {
        if (response?.message) {
          toast.error(response.message);
        } else
          toast.error("Failed to set new password")
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    let token = queryParameters.get("reset");
    if (token) {
      setToken(token)
      setView("password")
    } else {
      setView("email")
    }
  }, []);

  return (
    <>
      <div id="titlebar" class="gradient">
        <div class="container">
          <div class="row">
            <div class="col-md-12" >
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xl-5 offset-xl-3">
            <div className="login-register-page">
              {/* Welcome Text */}

              {/* Form */}
              <div id="login-form">
                {view === 'email' ? (
                  <>
                    <p style={{
                      marginBottom: '20px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: '25px',
                      color: '#770737',
                    }}>Enter your email to recover your password</p>
                    <div className="input-with-icon-left">
                      <i className="icon-material-baseline-mail-outline"></i>
                      <input
                        type="text"
                        className="input-text with-border"
                        name="emailaddress"
                        id="emailaddress"
                        placeholder="Email Address"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </>
                ) : view === 'message' ? (
                  <>
                    <p style={{
                      marginBottom: '20px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: '25px',
                      color: '#770737',
                    }}>To recover password we send you the link. Please follow the link to reset your password.</p>
                  </>
                ) : (
                  <>
                    <div className="input-with-icon-left">
                      <i className="icon-material-outline-lock"></i>
                      <input
                        type="password"
                        className="input-text with-border"
                        name="newPassword"
                        id="newPassword"
                        placeholder="Enter your new password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div className="input-with-icon-left">
                      <i className="icon-material-outline-lock"></i>
                      <input
                        type="password"
                        className="input-text with-border"
                        name="repeatPassword"
                        id="repeatPassword"
                        placeholder="Repeat your password"
                        required
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                      />
                    </div>
                  </>
                )}

                {/* Button */}
                {view === "email" && <button
                  className="button full-width button-sliding-icon ripple-effect margin-top-10"
                  disabled={email === ''}
                  onClick={() => handleForgetPassword()}
                >
                  {'Submit'}
                </button>}
                {view === "password" && <button
                  className="button full-width button-sliding-icon ripple-effect margin-top-10"
                  disabled={newPassword.trim() === '' || repeatPassword.trim() === ''}
                  onClick={() => handlePasswordReset()}
                >
                  {'Update Password'}
                </button>}
              </div>

            </div>
          </div>
        </div>
      </div></>

  );
};

export default ResetPassword;