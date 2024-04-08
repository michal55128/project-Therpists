import React, { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import { Login, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import MyAccountTherpist from "./MyDetailsTherpist";
import { useDispatch, useSelector } from "react-redux";
import {
  disconnect,
  getByPasswordPatient,
  getByPasswordTherpist,
  logout,
} from "../../Redux/LoginSlice";
import PersonIcon from "@mui/icons-material/Person";

const AreaPersonal = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [sign, setSign] = useState(true);
  const patient = useSelector((state) => state.login.patient);
  const therpist = useSelector((state) => state.login.therpist);
  const typeUser = useSelector((state) => state.login.typeUser);
  const [nameUser, setNameUser] = useState("");
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const cancle = () => {
    navigate("/");
    setSign(true);
    dispatch(logout());
    // debugger;
  };
  const signin = () => {
    debugger;
    navigate("Signin");
    if (typeUser === "therpist" && therpist !== null) {
      setNameUser(therpist.name);
      setSign(false);
    } else if (typeUser === "patient" && patient !== null) {
      setNameUser(patient.nameChild);
      debugger;
      setSign(false);
    } else {
      setSign(true);
    }
  };
  const myAccount = () => {
    navigate("MyAccountPersonalArea");
  };
  const styles = {
    menuItem: {
      "&:hover": {
        color: "#15a399",
        textDecoration: "none",
        boxShadow: "none",
        backgroundColor: "transparent",
      },
      "& .MuiListItemIcon-root": {
        color: "inherit",
      },
    },
  };
  const MyProfile=()=>{
    {typeUser === "therpist" && therpist &&  navigate('/MyProfiletherpist')}
    {typeUser === "patient" && patient &&  navigate('/MyProfilePatient')}
   
  }
  return (
    <React.Fragment>
      <Box
        sx={{
          position: "absolute",
          top: "5%",
          right: 0,
          marginTop: "25px",
          marginRight: "38px",
          zIndex: 999,
        }}
      >
        {" "}
        <Tooltip title="איזור אישי ">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{ width: 35, height: 35, backgroundColor: "#15a399" }}
              aria-label="recipe"
            >
              {typeUser === "therpist" && therpist && therpist.name.charAt(0)}
              {typeUser === "patient" && patient && patient.nameChild.charAt(0)}
              {!therpist && !patient && <PersonIcon />}
            </Avatar>

          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            width: "11%",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => signin()} sx={styles.menuItem}>
          <ListItemIcon>
            <Login fontSize="small" />
          </ListItemIcon>
          {typeUser === "therpist" && therpist && therpist.name}
          {typeUser === "patient" && patient && patient.nameChild}
          {!therpist && !patient && "התחברות"}
        </MenuItem>
        {typeUser && (
          <MenuItem onClick={() => myAccount()} sx={styles.menuItem}>
            החשבון שלי
          </MenuItem>
        )}
        {typeUser && (
          <MenuItem onClick={()=>MyProfile()} sx={styles.menuItem}>
            הפרופיל שלי
          </MenuItem>
        )}
        <Divider />
        <MenuItem onClick={handleClose} sx={styles.menuItem}>
          <ListItemIcon></ListItemIcon>
        </MenuItem>

        {typeUser && (
          <MenuItem onClick={handleClose} sx={styles.menuItem}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            הגדרות
          </MenuItem>
        )}
        {typeUser && (
          <MenuItem onClick={() => cancle()} sx={styles.menuItem}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            התנתקות
          </MenuItem>
        )}
      </Menu>
    </React.Fragment>
  );
};

export default AreaPersonal;
