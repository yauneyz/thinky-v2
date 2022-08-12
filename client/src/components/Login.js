import React, { useState, useContext } from "react";
import {
  AuthContainer,
  AuthBackground,
  AuthTitle,
  AuthForm,
  AuthInput,
} from "./AuthForm";
import { FirebaseContext } from "../contexts";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { Auth } = useContext(FirebaseContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(Auth, email, password).catch((error) => {
      if (error.code === "auth/invalid-email") {
        alert("That is not a valid email address.");
      }
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        alert("No user was found with that email/password.");
      }
    });
  };
  return (
    <AuthBackground>
      <AuthContainer>
        <AuthForm onSubmit={handleSubmit}>
          <AuthTitle>Login</AuthTitle>
          <div>
            <AuthInput
              type="text"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <AuthInput
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <AuthInput type="submit" value="Sign In" />
        </AuthForm>
      </AuthContainer>
    </AuthBackground>
  );
}
export default Login;
