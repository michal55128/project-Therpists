import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComments,
  postComments,
  removeComments,
} from "../../Redux/CommentSlice.js";
import { useNavigate, useParams } from "react-router-dom";
import "../../Css/AddComment.css";
import Stars from "../Stars.js";
import Starss from "../Starss.js";
import { add, format } from "date-fns";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import AddCommentIcon from "@mui/icons-material/AddComment";

import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import "../../Css/Stars.css";
import { fetchPatient } from "../../Redux/PatientSlice.js";
import { fetchTherpist, getDetails } from "../../Redux/TherpistsSlice.js";
import TherpistDetailsById from "../TherpistDetalisById.js";
import CommentsByIdPatient from "./CommentsByIdPatient.js";

const CommentsById = (props) => {
  const comments = useSelector((state) => state.comments.comments);
  const status = useSelector((state) => state.comments.status);
  const patient = useSelector((state) => state.patients.patients);
  const statusPatient = useSelector((state) => state.patients.status);
  const therapist = useSelector((state) => state.therpists.details);
  const statustherpist = useSelector((state) => state.therpists.status);

  const commentsTherapist = useSelector(
    (state) => state.therpists.commentsTherapist
  );

  const [commentsTherpistId, setCommentsTherpistId] = useState([]);
  let { id } = useParams();
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
    // backgroundColor: "#f7f7f7",
  };
  const imageComment = {
    width: "71px",
    height: "77px",
    margin: "8px",
    display: "inline-block",
    verticalAlign: "top",
    backgroundRepeat: "no-repeat",
  };


  useEffect(() => {
    console.log("in useeffect");
    // if (status !== 'fulfilled') {
    // window.location.reload();

    dispatch(getDetails(props.id))
      .then((response) => {
        if (response.payload) {
          console.log(comments);
          setCommentsTherpistId(response.payload.comments);
          console.log(commentsTherpistId);
        }
      })
      .catch(() => {});
    console.log(comments);
  }, [status, dispatch, id, comments]);

  // useEffect(() => {
  //   if (commentsTherpistId) {
  //     const sortedComments = [...commentsTherpistId].sort((a, b) => new Date(b.date) - new Date(a.date));
  //     setCommentsTherpistId(sortedComments);
  //   }
  // }, [commentsTherpistId]);

  const patients = useSelector((state) => state.patients);

  useEffect(() => {
    if (!commentsTherapist || commentsTherapist.length === 0) {
      dispatch(fetchComments());
    }
  }, [dispatch, commentsTherapist]);

  // useEffect(()=>{
  //     if(isReload){
  //         window.location.reload();
  //         setIsReload(false);
  //     }
  // },[])
  return (
    <>
      <div></div>
      <br />
      {/* <TherpistDetailsById id={id} /> */}
      {/* <div style={styleDiv}></div> */}
      <br />
      <h2> (:התגובות שכתבו עלי </h2>
      {commentsTherpistId &&
        commentsTherpistId.map((comment, index) => {
          const formattedDate = format(new Date(comment.date), "dd.MM.yyyy");

          return (
            <>
              <div key={index} style={commentText}>
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
      <div>
        {/* <CommentsByIdPatient id={therapist.id} /> */}
        {/* להוסיף את האפשרות שמטפל בעצמו מגיב על מטפלם אחרים! */}
        <br />
      </div>
    </>
  );
};
export default CommentsById;
