import React from "react";
import { sendEmailVerification } from "firebase/auth";
import { FirebaseContext } from "../contexts";
import {
  AuthBackground,
  AuthContainer,
  AuthTitle,
  AuthInput,
  AuthForm,
} from "./AuthForm";

export default function VerifyEmail() {
  const { Auth } = React.useContext(FirebaseContext);
  const resendVerificationEmail = async () => {
    const url = process.env.REACT_APP_FRONTEND_URL;
    console.log("url", url);
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
    <AuthBackground>
      <AuthContainer>
        <AuthForm>
          <AuthTitle>Verify your email</AuthTitle>
          <AuthInput
            type="button"
            onClick={resendVerificationEmail}
            value="Resend Verification Email"
          />
          <p>{"If you don't see an email, please check your spam folder."}</p>
          <p>{"If you still don't see an email, please contact us."}</p>
          <p>
            {
              "If you've already verified your email, please try closing the tab and re-opening the site."
            }
          </p>
        </AuthForm>
      </AuthContainer>
    </AuthBackground>
  );
}
