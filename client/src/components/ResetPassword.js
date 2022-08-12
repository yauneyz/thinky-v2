import React, { useState } from "react";
import {
  AuthContainer,
  AuthBackground,
  AuthTitle,
  AuthForm,
  AuthInput,
  ResetPasswordLink,
} from "./AuthForm";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  // Sends the password reset email
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await sendPasswordResetEmail(getAuth(), email);
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        alert("That is not a valid email address.");
        return;
      }
      console.log(error);
      alert("An error occurred. Please try again.");
      return;
    }
    alert("Password reset email sent.");
    window.location.href = "/";
  };

  return (
    <AuthBackground>
      <AuthContainer>
        <AuthForm onSubmit={handleSubmit}>
          <AuthTitle>Reset Password</AuthTitle>
          <AuthInput
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <AuthInput type="submit" value="Reset Password" />
          <ResetPasswordLink href="/login">Back to Login</ResetPasswordLink>
        </AuthForm>
      </AuthContainer>
    </AuthBackground>
  );
};

export default ResetPassword;
