import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import React, { useContext, useState } from "react";
import { FirebaseContext } from "../contexts";
import {
  AuthContainer,
  AuthBackground,
  AuthTitle,
  AuthForm,
  AuthInput,
} from "./AuthForm";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { Auth } = useContext(FirebaseContext);

  // The big function where we register the user
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Create the user in firebase
    createUserWithEmailAndPassword(Auth, email, password)
      .then(async (userCredential) => {
        if (!userCredential) {
          alert("Invalid email/password combination.");
          return;
        }
        const user = userCredential.user;
        const uid = user.uid;

        const data = { email, uid };

        // Create user in database
        await fetch("/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        });

        const url = process.env.REACT_APP_FRONTEND_URL;
        console.log("URL: ", url);
        console.log("Env", process.env);
        console.log("User: ", Auth.currentUser);
        await sendEmailVerification(Auth.currentUser, {
          url: url,
        });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          alert("That email is already in use");
        }
        if (error.code === "auth/weak-password") {
          alert("Your password must be at least 6 characters");
        }
        if (error.code === "auth/invalid-email") {
          alert("That is not a valid email address.");
        }
      });
  };

  return (
    <AuthBackground>
      <AuthContainer>
        <AuthForm onSubmit={handleSubmit}>
          <AuthTitle>Register</AuthTitle>
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
            <div>
              <AuthInput
                type="password"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <AuthInput type="submit" value="Register" />{" "}
        </AuthForm>
      </AuthContainer>
    </AuthBackground>
  );
}
export default Register;
