// RegisterAndLogin.js

import React, { useState } from "react";
import { database } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut // Import signOut function
} from "firebase/auth"; // Import auth module as well
import { useNavigate } from "react-router-dom";
import { styles } from "../style"; // Import your style file

function RegisterAndLogin({ onClose, onSignInSuccess }) {
  const [login, setLogin] = useState(false);
  const [successAnimation, setSuccessAnimation] = useState(false);
  const history = useNavigate();

  const handleSubmit = (e, type) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (type === "signup") {
      const confirmPassword = e.target.confirmPassword.value;

      // Check if passwords match
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      createUserWithEmailAndPassword(database, email, password)
        .then((data) => {
          console.log(data, "authData");
          setSuccessAnimation(true);
          setLogin(true); // Change to logout after successful signup

          // Call onSignInSuccess callback if provided
          if (onSignInSuccess) {
            onSignInSuccess();
          }

          // Reset form fields
          e.target.reset();

          // Redirect to home page after a delay
          setTimeout(() => {
            history("/"); // Navigate to home page
          }, 2000);
        })
        .catch((err) => {
          console.error(err);
          alert(err.message || "Unknown error occurred");
          setLogin(false);
        });
    } else {
      signInWithEmailAndPassword(database, email, password)
        .then((data) => {
          console.log(data, "authData");
          setSuccessAnimation(true);
          setLogin(true); // Change to logout after successful login

          // Redirect to home page after a delay
          setTimeout(() => {
            history("/"); // Navigate to home page
          }, 2000);
        })
        .catch((err) => {
          console.error(err);
          alert(err.message || "Unknown error occurred");
        });
    }
  };

  const handleReset = () => {
    history("/reset");
  };

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(database, provider)
      .then((result) => {
        console.log(result, "Google authData");
        setSuccessAnimation(true);
        setLogin(true); // Change to logout after successful Google sign-in

        // Redirect to home page after a delay
        setTimeout(() => {
          history("/"); // Navigate to home page
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
        alert(err.message || "Unknown error occurred");
      });
  };

  const handleLogout = () => {
    signOut(database) // Call signOut function from the imported module
      .then(() => {
        setLogin(false); // Set login state to false
        history("/signin"); // Navigate to the sign-in page
      })
      .catch((error) => {
        console.error(error);
        alert("Error occurred while logging out. Please try again.");
      });
  };

  return (
    <div className={` ${styles.padding} bg-primary h-[250%] -mt-6 -ml-5 -mr-5 text-center`}>
      <div className="row">
        {successAnimation ? (
          <div className="text-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mx-auto animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 14l4 4m0 0l4-4m-4 4V6"
              />
            </svg>
            <p className="text-green-500 font-bold">Success!</p>
          </div>
        ) : (
          <>
            <h1 className={`${styles.heroHeadText} text-center mt-4 mb-8`}>
              {login ? "Logout" : "SignIn"}
            </h1>
            {!login && ( // Show signup form only if not logged in
              <form onSubmit={(e) => handleSubmit(e, "signup")} className="mt-4">
                <input
                  className="block w-full py-2 px-3 border-b border-gray-300 focus:outline-none focus:border-primary"
                  name="email"
                  placeholder="Email"
                />
                <br />
                <input
                  className="block w-full py-2 px-3 border-b border-gray-300 focus:outline-none focus:border-primary"
                  name="password"
                  type="password"
                  placeholder="Password"
                />
                <br />
                <input
                  className="block w-full py-2 px-3 border-b border-gray-300 focus:outline-none focus:border-primary"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                />
                <br />
                <p className={`${styles.cursorPointer} text-primary`} onClick={handleReset}>
                  Forgot Password?
                </p>
                <br />
                <button className="bg-primary text-white py-2 px-4 rounded">SignUp</button>
                <br />
                <button
                  type="button"
                  className="bg-white text-black py-2 px-4 rounded mt-2"
                  onClick={handleGoogleSignIn}
                >
                  Sign Up with Google
                </button>
              </form>
            )}
          </>
        )}
        {login && ( // Show logout button if logged in
          <button className="bg-primary text-white py-2 px-4 rounded" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default RegisterAndLogin;
