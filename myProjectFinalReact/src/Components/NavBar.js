
import { Link, Outlet } from "react-router-dom";
import Logo from "./Logo";
import React, { useState } from "react";
import '../Css/HomePage.css';
import CategoryAreas from "./CategoryAreas";
import { Avatar, IconButton, Menu, Tooltip } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AreaPersonalTherpist from "./PersonalArea/AreaPersonal";
import { AccountCircle } from "@mui/icons-material";
import AreaPersonal from "./PersonalArea/AreaPersonal";
import '../Css/Therpists.css';

const NavBar = () => {

  const navBarStyle = {
    textAlign: "center",
    padding: "30px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    top: 0,
    left: 0,
    right: 0,
  };

  const linksContainerStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "15px",
  };
  const linksContainerProfile = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
  };
  const hoverLinkStyle = {
    color: "#f2a421",
  };
  const linkStyle = {
    color: "black",
    textDecoration: "none",
    margin: "0 15px",
  };
  const linkStylePer = {
    // margin: "0 25px",
    // right: "0",
    marginLeft: "auto",
  };

  return (
    <div style={navBarStyle}>
      <Logo />
      <div style={linksContainerStyle}>
        <Link to={'About'} className="nav-link link" id="linkColor" style={linkStyle} >אודות </Link>
        {/* <Link to="/additional-diagnostics" className="nav-link link" id="linkColor" style={linkStyle}>איבחונים</Link> */}
        <Link to={'CategoryTherpists'} className="nav-link link" id="linkColor" style={linkStyle}>מטפלים</Link>
        <Link to={'CategoryAreas'} className="nav-link link" id="linkColor" style={linkStyle}>תחומים</Link>
        <Link to={'Questions'} className="nav-link link" id="linkColor" style={linkStyle}>שאלות נפוצות</Link>
        <Link to={'TherpistDetails'} className="nav-link link" id="linkColor" style={linkStyle}>הוספת מטפל</Link>

        <Link to="/" className="nav-link active" id="linkColor" style={linkStyle}>ראשי</Link>
        <AreaPersonal style={linkStylePer} />

        <Outlet />

      </div>


    </div>
  );
}

export default NavBar;
