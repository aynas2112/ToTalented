import React, { useState, useContext } from 'react';
import { database } from "../firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { styles } from "../style";
import {RegistrationContext} from './RegistrationContext';

function RegisterAndLogin({ onClose, onSignInSuccess }) {
  const [login, setLogin] = useState(false);
  const [successAnimation, setSuccessAnimation] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const history = useNavigate();
  const { userData, setUserData } = useContext(RegistrationContext);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e, type) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (type === "signup") {
      const confirmPassword = e.target.confirmPassword.value;

      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      createUserWithEmailAndPassword(database, email, password)
        .then((data) => {
          console.log(data, "authData");
          setSuccessAnimation(true);
          setLogin(true);

          setUserData({ email: email, password: password });

          if (onSignInSuccess) {
            onSignInSuccess();
          }

          e.target.reset();

          setTimeout(() => {
            setSuccessAnimation(false); // Reset success animation after 1 second
            history("/");
          }, 1000);
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
          setLogin(true);

          setTimeout(() => {
            setSuccessAnimation(false); // Reset success animation after 1 second
            history("/");
          }, 1000);
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
        setLogin(true);

        setTimeout(() => {
          setSuccessAnimation(false); // Reset success animation after 1 second
          history("/");
        }, 1000);
      })
      .catch((err) => {
        console.error(err);
        alert(err.message || "Unknown error occurred");
      });
  };

  const handleLogout = () => {
    signOut(database)
      .then(() => {
        setLogin(false);
        history("/signin");
      })
      .catch((error) => {
        console.error(error);
        alert("Error occurred while logging out. Please try again.");
      });
  };

  // Conditionally render based on userData presence
  return (
    <>
      {Object.keys(userData).length === 0 && !successAnimation && (
        <div className={` ${styles.padding} bg-primary h-[250%] -mt-6 -ml-5 -mr-5 text-center`}>
          <div className="row">
            <h1 className={`${styles.heroHeadText} text-center mt-4 mb-8`}>
              {login ? "Logout" : "SignIn"}
            </h1>
            {!login && (
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
                <p
                  className={`${styles.cursorPointer} text-primary`}
                  onClick={handleReset}
                >
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
            {login && (
              <button className="bg-primary text-white py-2 px-4 rounded" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default RegisterAndLogin;