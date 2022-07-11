import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { FirebaseContext } from "../contexts";
import { AuthForm, AuthLabel, AuthInput, AuthButton } from "./AuthForm";

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
      .then((userCredential) => {
        if (!userCredential) {
          alert("Invalid email/password combination.");
          return;
        }
        const user = userCredential.user;
        const uid = user.uid;

        const data = { email, uid };

        // Create user in database
        fetch("/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
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
        <div>
          <AuthLabel>
            Confirm Password
            <AuthInput
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </AuthLabel>
        </div>
      </div>
      <AuthButton type="submit">Log In</AuthButton>
    </AuthForm>
  );
}
export default Register;
