import React from "react";

import { NavLink, useNavigate } from "react-router-dom";

import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";

import { RiLogoutCircleRFill } from "react-icons/ri";
import { FileTextOutlined } from "@ant-design/icons";

import { RootState } from "../../../store/store";
import { logout } from "../../../store/auth/authSlice";

import "./Header.scss";

const Header = () => {
  const auth = getAuth();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const isPersonalSubmitted = useSelector((store: RootState) => store.personal.isSubmitted);
  const isExperienceSubmitted = useSelector((store: RootState) => store.experience.isSubmitted);
  const isProjectsSubmitted = useSelector((store: RootState) => store.projects.isSubmitted);
  const isSkillsSubmitted = useSelector((store: RootState) => store.skills.isSubmitted);
  const isEducationSubmitted = useSelector((store: RootState) => store.education.isSubmitted);
  const isCertificationsSubmitted = useSelector(
    (store: RootState) => store.certifications.isSubmitted
  );
  const isLanguagesSubmitted = useSelector((store: RootState) => store.languages.isSubmitted);
  const isHobbiesSubmitted = useSelector((store: RootState) => store.hobbies.isSubmitted);

  const isReady: boolean = (isPersonalSubmitted &&
    isExperienceSubmitted &&
    isProjectsSubmitted &&
    isSkillsSubmitted &&
    isEducationSubmitted &&
    isCertificationsSubmitted &&
    isLanguagesSubmitted &&
    isHobbiesSubmitted) as boolean;

  const signOutUser = () => {
    signOut(auth).then(() => dispatch(logout()));
    localStorage.clear();
  };

  return (
    <header className="Header shadow px-3 mb-4">
      CV Maker
      <nav className="Header__nav ms-auto">
        <ul className="Header__navlist list-unstyled">
          {isReady && (
            <li className="Header__navlistitem">
              <NavLink
                to={"/cv-maker"}
                className={({ isActive }) =>
                  isActive
                    ? "Header__navlistlink navigateToCV active"
                    : "Header__navlistlink navigateToCV"
                }
              >
                <FileTextOutlined className="icon" /> Manage CV
              </NavLink>
            </li>
          )}
        </ul>

        <button className="btn btn__logout" onClick={signOutUser}>
          <RiLogoutCircleRFill size={"25px"} />
        </button>
      </nav>
    </header>
  );
};

export default Header;
