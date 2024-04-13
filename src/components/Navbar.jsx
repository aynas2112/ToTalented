import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { styles } from '../style';
import { logo } from '../assets';
import SearchBar from './SearchBar';
import { navLinks } from '../constants';
import { RegistrationContext } from './RegistrationContext';
import { signOut } from "firebase/auth";
import RegisterAndLogin from './Signup';
import { database } from '../firebase';

Modal.setAppElement('#root');

const Navbar = () => {
  const [active, setActive] = useState('');
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const { userData, clearUserData } = useContext(RegistrationContext);
  const location = useLocation();
  const history = useNavigate();

  const openSignUp = () => {
    setIsSignUpOpen(true);
  };

  const closeSignUp = () => {
    setIsSignUpOpen(false);
  };

  const handleSignInSuccess = () => {
    setIsSignUpOpen(false);
    history('/');
  };

  const handleSignOut = () => {
    signOut(database)
      .then(() => {
        clearUserData();
        history('/signin');
      })
      .catch((error) => {
        console.error(error);
        alert("Error occurred while logging out. Please try again.");
      });
  };

  return (
    <nav className={`${styles.paddingX} w-full flex items-center py-3 fixed top-0 z-20 bg-primary`}>
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <a href="/" className='flex items-center gap-2' onClick={() => {
          setActive('');
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
                    ? 'text-primary'
                    : 'text-secondary'
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
          {Object.keys(userData).length === 0 ? (
            <div>
              {/* Render sign up button if user is not logged in */}
              <button
                className="text-primary bg-primary text-primay hover:text-secondary px-4 py-2 rounded w-full mr-10"
                onClick={openSignUp} // Open the sign-up modal
              >
                Sign Up
              </button>
            </div>
          ) : (
            <div>
              {/* Render logout button if user is logged in */}
              <button
                className="text-primary bg-primary text-primay hover:text-secondary px-4 py-2 rounded w-full mr-10"
                onClick={handleSignOut} // Handle sign out action
              >
                Logout
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