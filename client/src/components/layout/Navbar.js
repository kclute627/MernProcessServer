import React, { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import logo from "../../assets/logo-2.png";

import PropTypes from "prop-types";

const Navbar = (props) => {
  const [navState, navStateHandler] = useState({
    opened: false,
  });
  const { opened } = navState;

  let targetElement = null;

  useEffect(()=>{
    targetElement = document.querySelector('#menu')

    if(opened){
      disableBodyScroll(targetElement)
    } else if(!opened){
      enableBodyScroll(targetElement)
    }else{
      clearAllBodyScrollLocks();
    }

  })

  

  const navItems = [
    {
      title: "Find A Process Server",
      link: "/servers",
      auth: "false",
    },
    {
      title: "Log In",
      link: "/login",
      auth: "false",
    },
    {
      title: "Register",
      link: "/register",
      auth: "false",
    },
  ];

  const menuClickHandler = () => {
    navStateHandler({ opened: !opened });
  };



 

  return (
    <Fragment>
      <div className="navbar">
        <div className="navbar__left">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="navbar__right">
          <div className="navbar__right-items">
            {navItems.map((cur, i) => {
              const { title, link, auth } = cur;
              return (
                <Link key={i} to={link}>
                  {title}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="navbar__under"></div>
      </div>
      <div className="mobile__menu">
        <div
          id="menu"
          className="navbar__ham"
          onClick={() => menuClickHandler()}
        >
          <div className={!opened ? "navbar-1" : "navbar-4"}></div>
          <div className={!opened ? "navbar-2" : "none"}></div>
          <div className={!opened ? "navbar-3" : "navbar-5"}></div>
        </div>

        <div className={opened ? "navbar__menu" : "navbar__menu-closed"}>
          <div className="navbar__menu-items">
            {navItems.map((cur, i) => {
              const { title, link, auth } = cur;
              return (
                <Link key={i} to={link} onClick={clearAllBodyScrollLocks()}>
                  {title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
