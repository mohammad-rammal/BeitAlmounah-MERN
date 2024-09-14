import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { FaPhoneVolume } from "react-icons/fa6";
import { useTranslate } from "../../translate/LanguageContext";
import olive from "./olive.png";


import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/apiCalls/authApiCall";


const HeaderTop = ({ setToggle, toggle }) => {



  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [dropdown, setDropdown] = useState(false);

  // Logout Handler
  const logoutHandler = () => {
    setDropdown(false);
    dispatch(logoutUser());
  };

  const translate = useTranslate();
  return (

    <div className="header-top">

      <div
        onClick={() => setToggle((prev) => !prev)}
        className="header-top-menu"
      >
        {toggle ? <i className="bi bi-x"></i> : <i className="bi bi-list"></i>}
      </div>
      <div className="header-top-phone">
        <i> <FaPhoneVolume className="header-top-phone-icon" /></i>
        {translate('phone')}
 
      </div>


      <div className="header-top-text1">




        <b className="header-top-text"> {translate('beit_almonah')}</b>
        <img className="header-top-image" src={olive} alt="olive oil"></img>




      </div>


      {user ? (
        <>
          <div className="header-right-user-info">
            <span
              onClick={() => setDropdown(prev => !prev)}
              className="header-right-username"
            >
              {user?.username}
            </span>

            {user.profilePhoto && (
              <img
                src={user.profilePhoto.url}
                alt="user pic"
                className="header-right-user-photo"
              />
            )}

            {dropdown && (
              <div className="header-right-dropdown">
                <Link
                  to={`/profile/${user?._id}`}
                  className="header-dropdown-item"
                  onClick={() => setDropdown(false)}
                >
                  <i className="bi bi-file-person"></i>
                  <span>Profile</span>
                </Link>
                <div
                  onClick={logoutHandler}
                  className="header-dropdown-item"
                >
                  <i className="bi bi-box-arrow-in-left"></i>
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {
            !user && (
              <Link to="/login" className="header-top-link">
                <i className="bi bi-person-fill"></i> {translate('login')}
              </Link>
            )}
        </>
      )}

    </div>
  );
};

export default HeaderTop;
