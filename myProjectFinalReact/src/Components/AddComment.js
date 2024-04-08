import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComments,
  postComments,
  removeComments,
} from "../Redux/CommentSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../Css/AddComment.css";
import Stars from "../Components/Stars.js";
import Starss from "./Starss.js";
import { add, format } from "date-fns";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import AddCommentIcon from "@mui/icons-material/AddComment";
import CloseIcon from "@mui/icons-material/Close";

import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import "../Css/Stars.css";
import { fetchPatient } from "../Redux/PatientSlice.js";
import { fetchTherpist } from "../Redux/TherpistsSlice.js";
import TherpistDetailsById from "./TherpistDetalisById.js";
import { getByPasswordPatient } from "../Redux/LoginSlice.js";
import { DialogContentText, IconButton, Slide } from "@mui/material";
const AddComment = (props) => {
  const comments = useSelector((state) => state.comments.comments);
  const status = useSelector((state) => state.comments.status);
  const patient = useSelector((state) => state.patients.patients);
  const statusPatient = useSelector((state) => state.patients.status);
  const therapist = useSelector((state) => state.therpists.details);
  const statustherpist = useSelector((state) => state.therpists.status);
  const patientCurrent = useSelector((state) => state.login.patient);
  const therpistCurrent = useSelector((state) => state.login.therpist);
  const typeUser = useSelector((state) => state.login.typeUser);
  const userId =
    typeUser === "patient" ? patientCurrent?.id : therpistCurrent?.id;
  const nameUser =
    typeUser === "patient" ? patientCurrent?.nameChild : therpistCurrent?.name;

  const commentsTherapist = useSelector(
    (state) => state.therpists.commentsTherapist
  );

  const [commentsTherpistId, setCommentsTherpistId] = useState([]);
  let { id } = useParams();
  console.log("id", id);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAddComment, setIsAddComment] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const [namePatient, setNamePatient] = useState("");
  const [namePhonePatient, setPhonePatient] = useState("");
  const [isOk, setIsOk] = useState(false);
  const [isReload, setIsReload] = useState(true);
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const [open, setOpen] = React.useState(false);



  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  const labels = {
    1: "נחמד",
    2: "בסדר גמור",
    3: "מיוחד ממש",
    4: " ממש מרוצה",
    5: "!מעולה טיפול מושלם",
  };

  const styleDiv = {
    background: "#04070b",
    color: "#fff",
    padding: "60px 0",
    width: "100% !important",
    maxWidth: "100% !important",
    textAlign: "center",
    marginTop: "50px",
  };
  const commentText = {
    display: "flex",
    width: "100%",
    padding: "50px 15px 60px",
    borderBottom: "1px solid #ccc",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "flex-start",
    flexWrap: "nowrap",
    flexDirection: "column",
    backgroundColor: "#f7f7f7",
  };
  const imageComment = {
    width: "71px",
    height: "77px",
    margin: "15px",
    display: "inline-block",
    verticalAlign: "top",
    backgroundRepeat: "no-repeat",
  };

  useEffect(() => {
    console.log("in useeffect");
    if (status != "fulfilled") {
      // window.location.reload();

      dispatch(fetchComments())
        .then((response) => {
          if (response.payload) {
            let res = response.payload.filter(
              (com) => com.therpistId.toString() === id
            );
            console.log(res);
            console.log(comments);
            setCommentsTherpistId(res);
            console.log(commentsTherpistId);
          }
        })
        .catch(() => {
          // alert("לא עובד");
        });
    }
    console.log(comments);
  }, [status, dispatch, id, comments]);

  const patients = useSelector((state) => state.patients);



  const [addComment, setAddComment] = useState({
    description: "",
    therpistId: 0,
    namePatient: nameUser,
    patientId: 0,
    date: new Date().toISOString(),
    numStars: 0,
  });

  const addCommentValues = () => {
    setIsAddComment(true);
  };

  const handleCancelComment = () => {
    setIsAddComment(false);
    setTextAreaValue("");
  };

  const handleTextAreaChange = (event) => {
    setTextAreaValue(event.target.value);
    console.log(event.target.value);
  };

  useEffect(() => {
    if (isOk) {
      console.log(comments);
      dispatch(postComments(addComment))
        .then(async (response) => {
          console.log("Response from addtherpist:", response.data);
          console.log(addComment);
          await dispatch(fetchComments());
          dispatch(getByPasswordPatient(patientCurrent.password));
          setIsAddComment(false);
          setTextAreaValue("");
        })
        .catch((error) => {
          console.error("Error adding comments:", error);
          setIsOk(false);
        });
    }
  }, [isOk, dispatch]);


  useEffect(() => {
    if (!commentsTherapist || commentsTherapist.length === 0) {
      dispatch(fetchComments());
    }
  }, [dispatch, commentsTherapist]);

  const handleConfirmComment = () => {
    console.log("התגובה שהוזנה:", textAreaValue);
    debugger;
    setAddComment({
      description: textAreaValue,
      numStars: value,
      date: new Date().toISOString(),
      namePatient: nameUser,
      therpistId: +id,
      patientId: userId,
    });
    setIsOk(true);
  };
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  function handleClose() {
    setOpen(false);
    window.location.reload();
  }
  return (
    <>
      <div></div>

      <br />
      <TherpistDetailsById id={id} />
      <div style={styleDiv}></div>
      <br />
      <h2>חוות דעת</h2>
      {commentsTherpistId &&
        commentsTherpistId.map((comment, index) => {
          const formattedDate = format(new Date(comment.date), "dd.MM.yyyy");
          return (
            <>
              <div key={comment.id} style={commentText}>
                <img
                  src="/Assets/Images/comment1.png"
                  alt="My Image"
                  style={imageComment}
                  className="imgComment"
                />

                <p>{comment.namePatient}</p>
                <p>{formattedDate}</p>
                {comment.description}
                <br />
                <p>
                  {" "}
                  <Starss numStars={comment.numStars} />
                </p>
                {/* <button onClick={()=> dispatch(removeComments(comment.id))}>remove</button> */}
              </div>
            </>
          );
        })}
      {isAddComment && (
        <div className="formComment">
          <div className="textarea-container">
            <span style={{ color: "#faaf00", fontSize: "1.2rem" }}>
              תאור התגובה:
            </span>
            <textarea value={textAreaValue} onChange={handleTextAreaChange} />
          </div>
          <div>
            <span style={{ color: "black", fontSize: "1.2rem" }}>
              {" "}
              :בחר דרגה
            </span>
            <div className="start">
              <Box
                sx={{
                  width: 200,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Rating
                  name="hover-feedback"
                  value={value}
                  precision={0.5}
                  getLabelText={getLabelText}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                    debugger;
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
                {value !== null && hover !== -1 && (
                  <Box sx={{ ml: 2 }}>{labels[hover]}</Box>
                )}
              </Box>
            </div>
          </div>
          <div className="buttons-container">
            <button className="search-button-add" onClick={handleCancelComment}>
              ביטול
            </button>
            <button
              className="search-button-add"
              onClick={handleConfirmComment}
            >
              אישור
            </button>
          </div>
        </div>
      )}
      {!isAddComment && (
        <button
          className="search-button-add"
          onClick={() => {
            if (typeUser === "therpist") {
              setOpen(true);
            } else {
              addCommentValues();
            }
          }}
        >
          הוסף תגובה
        </button>
      )}
      <div>
        {" "}
        <br />
        <Dialog
          open={open}
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
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "black",
            }}
          >
            <CloseIcon />
          </IconButton>
          <img src="/Assets/Images/oops1.webp"></img>

          <DialogTitle style={{ direction: "rtl", color: "#15a399" }}>
            {"אופסס ... אין לך אפשרות להוסיף תגובה הנך מוגדר כמטפל !   "}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              style={{ direction: "rtl", color: "black" }}
            >
              בכדי להוסיף תגובה עלייך לשנות זאת באיזור האישי ולהרשם למערכת
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
      </div>
    </>
  );
};

export default AddComment;
