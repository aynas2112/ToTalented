// Navbar.js

import React, { useState } from 'react';
import { styles } from '../style';
import { logo } from '../assets';
import SearchBar from './SearchBar';
import Modal from 'react-modal';
import { navLinks } from '../constants';
import RegisterAndLogin from './Signup'; // Import your SignUp component
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

const Navbar = () => {
  const [active, setActive] = useState(0);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useNavigate();

  const openSignUp = () => {
    setIsSignUpOpen(true);
  };

  const closeSignUp = () => {
    setIsSignUpOpen(false);
  };

  const handleSignInSuccess = () => {
    setIsLoggedIn(true);
    setTimeout(() => {
      closeSignUp();
    }, 10000); // Close the sign-up modal after 10 seconds

    // Redirect to the home page
    history("/");
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
  };

  const handleCartClick = () => {
    // Handle cart click action
  };

  return (
    <nav className={`${styles.paddingX} w-full flex items-center py-3 fixed top-0 z-20 bg-primary`}>
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <a href="/" className='flex items-center gap-2' onClick={() => {
          setActive("");
          window.scrollTo(0, 0);
        }}>
          <img src={logo} alt="logo" style={{ width: '5%', height: '5%', borderRadius: '50%' }} className='object-contain' />
          <p className='text-primary text-[18px] font-bold cursor-pointer flex pl-4'>Totalented Center Of Learning</p>
          <ul className='list-none hidden sm:flex flex-row gap-2 pl-12'>
            {navLinks.map((link, index) => (
              <li
                key={link.id}
                className={`${
                  active === link.title
                    ? "text-primary"
                    : "text-secondary"
                } hover:text-primary text-[18px] font-medium cursor-pointer`}
                onClick={() => setActive(link.title)}
              >
                <a href={`#${link.id}`} className="flex items-center gap-1">
                  {link.title}
                  {index < navLinks.length - 1 && <span className="text-primary">|</span>}
                </a>
              </li>
            ))}
          </ul>
        </a>
        <div className='flex gap-4'>
          <div className="pl-4 w-[120%]">
            <SearchBar />
          </div>
          {isLoggedIn ? (
            <div>
              {/* Display a message when the user is logged in */}
              <p className="text-white">Logged in successfully!</p>
              {/* Render cart button if user is logged in */}
              <button
                className="text-primary bg-primary text-primay hover:text-secondary px-4 py-2 rounded w-full mr-10"
                onClick={handleCartClick} // Handle cart click action
              >
                Cart
              </button>
              {/* Render logout button if user is logged in */}
              <button
                className="text-primary bg-primary text-primay hover:text-secondary px-4 py-2 rounded w-full mr-10"
                onClick={handleSignOut} // Handle sign out action
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              {/* Render sign up button if user is not logged in */}
              <button
                className="text-primary bg-primary text-primay hover:text-secondary px-4 py-2 rounded w-full mr-10"
                onClick={openSignUp} // Open the sign-up modal
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Use react-modal for SignUp modal */}
      <Modal
        isOpen={isSignUpOpen}
        onRequestClose={closeSignUp}
        contentLabel="Sign Up Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            width: '500px',
            height: '670px',
            margin: 'auto',
            borderRadius: '8px',
            overflow: 'hidden',
          },
        }}
      >
        {/* Pass handleSignInSuccess function as prop to RegisterAndLogin component */}
        <RegisterAndLogin onClose={closeSignUp} onSignInSuccess={handleSignInSuccess} />
      </Modal>
    </nav>
  );
}

export default Navbar;
