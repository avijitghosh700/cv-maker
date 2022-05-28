import React from "react";

import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";

import { logout } from "../../../store/auth/authSlice";

import { RiLogoutCircleRFill } from "react-icons/ri";

import './Header.scss';

const Header = () => {
  const auth = getAuth();

  const dispatch = useDispatch();

  const signOutUser = () => {
    signOut(auth).then(() => dispatch(logout()));
    localStorage.clear();
  };

  return (
    <header className="Header shadow px-3 mb-4">
      CV Maker

      <nav className="Header__nav ms-auto">
        <button className="btn btn__logout" onClick={signOutUser}>
          <RiLogoutCircleRFill size={'25px'}/>
        </button>
      </nav>
    </header>
  );
};

export default Header;
