import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MailIcon from "@mui/icons-material/Mail";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CommentIcon from "@mui/icons-material/Comment";
import PlaceIcon from "@mui/icons-material/Place";
import styled from "@emotion/styled";
import PersonIcon from "@mui/icons-material/Person";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { useNavigate } from 'react-router-dom';
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
// import '../Css/SignIn.css';
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { updatePatient } from "../../Redux/PatientSlice";
import { getByPasswordPatient } from "../../Redux/LoginSlice";

const MyDetailsPatient = () => {
  const patient = useSelector((state) => state.login.patient);
  const [ok, setOk] = useState(true);
  const typeUser = useSelector((state) => state.login.typeUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status2, setStatus2] = useState(null);
  const [messagePassword, setMessagePassword] = useState("");
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [showPassword, setShowPassword] = useState(false);
 
  const [patientUpdate, setPatientUpdate] = useState({
    id:patient.id,
    NameChild: patient.nameChild,
    Address: patient.address,
    IdChild: patient.idChild,
    Email: patient.email,
    Phone: patient.phone,
    Password: patient.password,
  });

  const edit = () => {
    setOk(false);
  };
  const cancle = () => {
    setOk(true);
  };
  const StyledCard = styled(Card)({
    maxWidth: 600,
    marginBottom: 20,
    maxHeight: 380,
    margin: "25px",
    textAlign: "center",
    width: 800,
  });

  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: "#15a399",
      },
      secondary: {
        main: "#15a399",
      },
    },
  });



  const funcName = (e) => {
    setPatientUpdate((prevUser) => ({
      ...prevUser,
      NameChild: e.target.value,
    }));
  };
  const funcPhone = (e) => {
    setPatientUpdate((prevUser) => ({ ...prevUser, Phone: e.target.value }));
  };

  const funcEmail = (e) => {
    setPatientUpdate((prevUser) => ({ ...prevUser, Email: e.target.value }));
  };
  const funcAddress2 = (e) => {
    setPatientUpdate((prevUser) => ({ ...prevUser, Address: e }));
  };
  const funcIdChild = (e) => {
    setPatientUpdate((prevUser) => ({ ...prevUser, IdChild: e.target.value }));
  };

  const updatePatientEdit = async () => {
    debugger;
    const errors = [];

    if (!patientUpdate.Email.endsWith("@gmail.com")) {
      errors.push("Please enter a valid Gmail address.");
    }
    if (patientUpdate.Phone.length < 9) {
      errors.push("Please enter a 10-digit phone number.");
    }
    if (patientUpdate.IdChild.length !== 9) {
      errors.push("Please enter a 10-digit Idchild number.");
    }
    if (!passwordRegex.test(patientUpdate.Password)) {
      errors.push(
        "Password must be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, and one digit."
      );
    }
    if (errors.length > 0) {
      setMessagePassword(errors.join(" "));
    } else {
      setMessagePassword("");
      try {
       await dispatch(updatePatient(patientUpdate));
        dispatch(getByPasswordPatient(patient.password))
        navigate("/");
        dispatch(getByPasswordPatient(patient.password))

      } catch (error) {
        console.error("Error signing up:", error);
        if (error.response) {
          console.log(
            "response: ",
            error.response.data,
            error.response.status,
            error.response.headers
          );
        } else if (error.request) {
          console.log("request : ", error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      }
    }
  };
  return (
    <>

      {ok && patient && (
        <div>
          <h1 style={{ color: "#f2a421", textAlignt: "center" }}>
            {" "}
            :הפרטים שלי במערכת
          </h1>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: "600",
            }}
          >
            <Grid item key="1" xs={12} sm={6} md={4} lg={3}>
              <StyledCard>
                <CardHeader
                  avatar={
                    <Avatar
                      sx={{
                        bgcolor: "#f2a421",
                        direction: "rtl",
                        width: 60,
                        height: 60,
                      }}
                      aria-label="recipe"
                    >
                      {typeUser === "patient" &&
                        patient &&
                        patient.nameChild.charAt(0)}
                      {!patient && <PersonIcon />}
                    </Avatar>
                  }
                  titleTypographyProps={{ variant: "h6" }} 
                  subheaderTypographyProps={{ variant: "h6" }}
                  style={{
                    color: "#15a399",
                    fontFamily: "revert",
                    fontSize: "16px",
                  }}
                  title={"  שם הילד/ה  - " + patient.nameChild}
                  subheader={"כתובת: " + patient.address}
                />

                <CardContent>
                  <Typography
                    paragraph
                    style={{
                      color: "#15a399",
                      fontFamily: "revert",
                      fontSize: "18px",
                    }}
                  >
                    :פרטים נוספים
                  </Typography>
                  <a
                    href={`tel:${patient.phone}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Typography paragraph>
                      {" "}
                      <IconButton
                        aria-label="share"
                        href={`tel:${patient.phone}`}
                      >
                        <LocalPhoneIcon />
                      </IconButton>{" "}
                      {patient.phone}
                    </Typography>
                  </a>
                  <a
                    href={`mailto:${patient.email}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Typography paragraph>
                      <IconButton
                        aria-label="share"
                        href={`mailto:${patient.email}`}
                      >
                        <MailIcon />
                      </IconButton>
                      {patient.email}
                    </Typography>
                  </a>
                  <a
                    aria-label="navigate"
                    component="a"
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      patient.address
                    )}`}
                    target="_blank"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Typography paragraph>
                      <IconButton
                        aria-label="navigate"
                        component="a"
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          patient.address
                        )}`}
                        target="_blank"
                      >
                        <PlaceIcon></PlaceIcon>{" "}
                      </IconButton>{" "}
                      {patient.address}
                    </Typography>
                  </a>
                </CardContent>
                <IconButton aria-label="share"></IconButton>
              </StyledCard>
              <button className="search-button-add" onClick={() => edit()}>
                עריכה
              </button>
            </Grid>
          </Box>
        </div>
      )}
      {!ok && patient && (
        <div>
          <div className="modal-left">
            <ThemeProvider theme={defaultTheme}>
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <Avatar
                  sx={{
                    m: 1,
                    bgcolor: "#15a399",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                </Avatar>
              </div>
              <h1 className="modal-title"> עדכון הפרטים שלי</h1>
              <br />
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <div className="input-block">
                    <label htmlFor="text" className="input-label">
                      כתובת
                    </label>
                    <input
                      required
                      name="Address"
                      id="Address"
                      value={patientUpdate.Address}
                      disabled={ok}
                      style={{ direction: "rtl" }}
                      onChange={(e) => funcAddress2(e.target.value)}
                    />
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div className="input-block">
                    <label htmlFor="text" className="input-label">
                      ת.ז ילד
                    </label>
                    <input
                      required
                      type="text"
                      name="IdChild"
                      id="IdChild"
                      value={patientUpdate.IdChild}
                      style={{ direction: "rtl" }}
                      onChange={funcIdChild}
                    />
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div className="input-block">
                    <label htmlFor="text" className="input-label">
                      שם הילד
                    </label>
                    <input
                      required
                      type="NameChild"
                      name="NameChild"
                      id="FirstName"
                      value={patientUpdate.NameChild}
                      style={{ direction: "rtl" }}
                      onChange={funcName}
                    />
                  </div>
                </Grid>
                <Grid item xs={5}>
                  <div className="input-block">
                    <label htmlFor="email" className="input-label">
                      מייל
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      id="email"
                      value={patientUpdate.Email}
                      onChange={funcEmail}
                    />
                  </div>
                </Grid>
                <Grid item xs={5}>
                  <div className="input-block">
                    <label htmlFor="number" className="input-label">
                      טלפון
                    </label>
                    <input
                      required
                      type="text"
                      name="phone"
                      id="phone"
                      value={patientUpdate.Phone}
                      onChange={()=>funcPhone}
                    />
                  </div>
                </Grid>
              </Grid>
              <br />
              <div className="input-block">
                <Button
                  className="search-button"
                  variant="contained"
                  onClick={() => updatePatientEdit()}
                >
                  שמירת שינויים
                </Button>
                <div>
                  <br />
                </div>
                <input
                  className="btnOk"
                  type="button"
                  value={"ביטול "}
                  onClick={() => cancle()}
                />
              </div>
              {status2 && <div>There is a user with this email address.</div>}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto auto auto auto",
                  margin: "30px",
                }}
              ></div>
              {messagePassword && <div>{messagePassword}</div>}
              <div></div>
            </ThemeProvider>
          </div>
        </div>
      )}
    </>
  );
};

export default MyDetailsPatient;
