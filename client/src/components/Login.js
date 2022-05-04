import React, { useState, useContext } from "react";
import { AuthForm, AuthLabel, AuthInput, AuthButton } from "./AuthForm";
import { FirebaseContext, AuthContext } from "../contexts";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { Auth } = useContext(FirebaseContext);
  const { setAuth } = useContext(AuthContext);

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
      console.log("Login Failed: ", error);
    });
  };
  return (
    <div>
      <AuthForm onSubmit={handleSubmit}>
        <div>
          <AuthLabel>
            Email
            <AuthInput
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </AuthLabel>
        </div>
        <div>
          <AuthLabel>
            Password
            <AuthInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </AuthLabel>
        </div>
        <AuthButton type="submit">Log In</AuthButton>
      </AuthForm>
    </div>
  );
}
export default Login;
