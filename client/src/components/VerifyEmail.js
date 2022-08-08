import React from "react";
import { sendEmailVerification } from "firebase/auth";
import { AuthContext, FirebaseContext } from "../contexts";

export default function VerifyEmail() {
  const { Auth } = React.useContext(FirebaseContext);
  const resendVerificationEmail = async () => {
    const url = process.env.REACT_APP_FRONTEND_URL;
    try {
      await sendEmailVerification(Auth.currentUser, {
        url: url,
      });
      alert("Email sent");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Verify your email</h1>
      <p>Please check your email for a verification link.</p>
      <button onClick={resendVerificationEmail}>Resend email</button>
      <p>{"If you don't see an email, please check your spam folder."}</p>
      <p>{"If you still don't see an email, please contact us."}</p>
      <p>
        {
          "If you've already verified your email, please try closing the tab and re-opening the site."
        }
      </p>
    </div>
  );
}
