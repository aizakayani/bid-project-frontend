import React, { useState } from 'react';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [showRecoveryMessage, setShowRecoveryMessage] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Perform email submission logic here, like sending recovery link
    setShowRecoveryMessage(true);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Perform password update logic here
    alert('Password updated successfully!');
    // Reset fields
    setNewPassword('');
    setRepeatPassword('');
  };

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
            <form id="login-form" onSubmit={showRecoveryMessage ? handlePasswordSubmit : handleEmailSubmit}>
              {!showRecoveryMessage ? (
                <>
                  <p style={{
                    marginBottom: '20px',
                     display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: '25px',
                      color:'#770737',}}>Enter your email to recover your password</p>
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
              ) : (
                <>
                  <p style={{
                    marginBottom: '20px',
                     display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: '25px',
                      color:'#770737',}}>To recover password we send you the link. Please follow the link to reset your password.</p>
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
              <button
                className="button full-width button-sliding-icon ripple-effect margin-top-10"
                type="submit"
                form="login-form"
                disabled={!showRecoveryMessage && email === ''}
              >
                {showRecoveryMessage ? 'Update Password' : 'Submit'}
              </button>
            </form>

          </div>
        </div>
      </div>
    </div></>
   
  );
};

export default ResetPassword;