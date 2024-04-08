import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchTherpist } from "../Redux/TherpistsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Slide,
  Typography,
  makeStyles,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MailIcon from "@mui/icons-material/Mail";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CommentIcon from "@mui/icons-material/Comment";
import PlaceIcon from "@mui/icons-material/Place";
import AddComment from "./AddComment";
import Avatar from "@mui/material/Avatar";
import styled from "@emotion/styled";
import { Box } from "@mui/system";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import "../Css/TherpistDetailsById.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { postAppeals } from "../Redux/AppealSlice";
import { getByPasswordPatient } from "../Redux/LoginSlice";

const TherpistDetailsById = (props) => {
  const [therapistDetails, setTherapistDetails] = useState([]);
  const statustherpist = useSelector((state) => state.therpists.status);
  const therpists = useSelector((state) => state.therpists.details);
  const patient = useSelector((state) => state.login.patient);

  const therpistCurrent = useSelector((state) => state.login.therpist);
  const typeUser = useSelector((state) => state.login.typeUser);
  const userId = typeUser === "patient" ? patient?.id : therpistCurrent?.id;
  const nameUser =
    typeUser === "patient" ? patient?.nameChild : therpistCurrent?.name;

  const [openAskMe, setOpenAskMe] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [send, setSend] = useState(false);
  const inputRef = useRef(null);
  const [openDialog, setOpenDialog] = React.useState(false);

  const [appeal, setAppeal] = useState({
    question: question,
    answer: "",
    therpistId: +props.id,
    patientId: patient ? patient.id : "2",
    namePatient: nameUser,
    date: new Date().toISOString(),
  });

  useEffect(() => {
    console.log("in useeffect");
    if (statustherpist !== "fulfilled") {
      // debugger;
      dispatch(fetchTherpist())
        .then((response) => {
          if (response.payload) {
            let res = response.payload.filter(
              (com) => com.id.toString() === props.id
            );
            console.log(res);
            setTherapistDetails(res);
            console.log(therapistDetails);
          }
        })
        .catch(() => {
          // alert("לא עובד");
        });
    } else {
      if (therpists)
        setTherapistDetails(
          therpists.filter((com) => com.id.toString() === props.id)
        );
    }
    // debugger
    // let res = therapist.filter((com) => com.id.toString() === id);
    // console.log(res);
    // setTherapistDetails(res)
    // console.log(therapistDetails);

    console.log("therpistDe", therapistDetails);
  }, [statustherpist, dispatch]);

  const openChat = () => {
    // navigate('/AddQuestion');
    // setOpenAskMe(true);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setQuestion("");
  };
  const sendQuestion = () => {
    debugger;
    console.log(question);
    setAppeal({
      question: question,
      answer: "",
      therpistId: +props.id,
      patientId: patient ? patient.id : "2",
      namePatient: nameUser,
      date: new Date().toISOString(),
    });
    console.log(appeal);
    debugger;
    // if (question)
    // dispatch(postAppeals(appeal));
    // debugger
    // dispatch(getByPasswordPatient(patient.password))
    // dispatch(getByPasswordPatient(patient.password))

    setSend(true);
    // alert("ההודעה נשלחה בהצלחה תקבל עדכון לתשובה במייל");
  };

  useEffect(() => {
    const postData = async () => {
      if (send) {
        await dispatch(postAppeals(appeal));
        dispatch(getByPasswordPatient(patient.password));
      }
    };

    postData();
  }, [send, appeal, dispatch, patient]);

  const StyledCard = styled(Card)({
    maxWidth: 600,
    marginBottom: 20,
    maxHeight: 420,
    margin: "25px",
    textAlign: "center",
    width: 800,
  });
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  function handleCloseDialog() {
    setOpen(false);
    window.location.reload();
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "600",
        }}
      >
        {therapistDetails &&
          therapistDetails.map((ther, ind) => (
            <Grid item key={ther.id} xs={12} sm={6} md={4} lg={3}>
              <StyledCard>
                <CardHeader
                  avatar={
                    <Avatar
                      sx={{ bgcolor: "#f2a421", direction: "rtl" }}
                      aria-label="recipe"
                    >
                      <img
                        src={ther.urlImage}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          fontFamily: "-moz-initial",
                          fontSize: "500px",
                        }}
                      />
                    </Avatar>
                  }
                  style={{
                    color: "#15a399",
                    fontFamily: "revert",
                    fontSize: "16px",
                  }}
                  title={ther.name}
                  subheader={"כתובת: " + ther.address}
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontSize={"16px"}
                  >
                    {ther.description}
                  </Typography>
                </CardContent>

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
                    href={`tel:${ther.phone}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Typography paragraph>
                      {" "}
                      <IconButton aria-label="share" href={`tel:${ther.phone}`}>
                        <LocalPhoneIcon />
                      </IconButton>{" "}
                      {ther.phone}
                    </Typography>
                  </a>
                  <a
                    href={`mailto:${ther.email}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Typography paragraph>
                      <IconButton
                        aria-label="share"
                        href={`mailto:${ther.email}`}
                      >
                        <MailIcon />
                      </IconButton>
                      {ther.email}
                    </Typography>
                  </a>
                  <a
                    aria-label="navigate"
                    component="a"
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      ther.address
                    )}`}
                    target="_blank"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Typography paragraph>
                      <IconButton
                        aria-label="share"
                        // aria-label="navigate"
                        component="a"
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          ther.address
                        )}`}
                        target="_blank"
                        style={{ textDecoration: "none" }}
                      >
                        <PlaceIcon />{" "}
                      </IconButton>{" "}
                      {ther.address}
                    </Typography>
                  </a>
                  <IconButton aria-label="share" onClick={() => openChat()}>
                    {/* <QuestionAnswerIcon /> */}
                    <img
                      src="/Assets/Images/chat.webp"
                      alt=""
                      style={{ width: "50px", height: "50px" }}
                    />
                  </IconButton>
                  <span
                    onClick={() => {
                      if (typeUser === "therpist") {
                        setOpenDialog(true);
                      } else {
                        openChat();
                      }
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {" "}
                    דברו איתי
                  </span>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
      </Box>

      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
              handleClose();
            },
          }}
        >
          {/* <img src="/Assets/Images/chat.webp" style={{width:"40%",height:"40%",textAlign:'center',alignItems:'center'}}></img> */}
          {/* <img src="/Assets/Images/chat4.png"  style={{width:"40%",height:"40%",textAlign:'center',alignItems:'center',left:'50%'}}></img> */}
          <DialogContentText>
            {" "}
            <img
              src="/Assets/Images/chat4.png"
              style={{
                width: "50%",
                height: "40%",
                textAlign: "center",
                alignItems: "center",
                left: "50%",
              }}
              alt="imgChat"
            ></img>
          </DialogContentText>

          <DialogContent>
            <DialogContentText>הכנס את שאלתך Ask Me:) </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="question"
              fullWidth
              variant="standard"
              inputRef={inputRef}
              onChange={() => {
                setQuestion(inputRef.current.value);
                setAppeal({
                  question: inputRef.current.value,
                  answer: "",
                  namePatient: patient.naneChild,
                  therpistId: props.id,
                  patientId: patient.id,
                  categoryId: 1,
                  date: new Date().toISOString(),
                });
              }}
              style={{ direction: "rtl" }}
            />
          </DialogContent>
          <DialogActions style={{ direction: "rtl", color: "#f2a421" }}>
            <Button onClick={handleClose} style={{ color: "#f2a421" }}>
              ביטול
            </Button>
            <Button
              type="submit"
              onClick={() => sendQuestion()}
              style={{ color: "#f2a421" }}
            >
              אישור
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
      {send && (
        <div
          class="alert alert-warning"
          role="alert"
          style={{ width: "500px", textAlign: "center", left: "35%" }}
        >
          ההודעה נשלחה בהצלחה תקבל עדכון לתשובה במייל
        </div>
      )}
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            backgroundColor: "#f2f2f2",
          },
        }}
        keepMounted
      >
        <IconButton
          aria-label="close"
          onClick={handleCloseDialog}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "black",
            backgroundColor: "#f2f2f2",
          }}
        >
          <CloseIcon />
        </IconButton>
        <img src="/Assets/Images/oops1.webp"></img>

        <DialogTitle style={{ direction: "rtl", color: "#15a399" }}>
          {"אופסס ... אין לך אפשרות להוסיף פניה הנך מוגדר כמטפל !   "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            style={{ direction: "rtl", color: "black" }}
          >
            בכדי לפנות למטפל זה עלייך לשנות זאת באיזור האישי ולהרשם למערכת
            כמטופל
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ direction: "rtl" }}>
          <Button
            style={{
              direction: "rtl",
              color: "#f2a421",
            }}
            onClick={() => navigate("/Signin")}
          >
            להתחברות
          </Button>
          <Button
            style={{
              direction: "rtl",
              color: "#f2a421",
            }}
            onClick={() => navigate("/SignUpPatient")}
          >
            להרשמה
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TherpistDetailsById;
