import styled from "@emotion/styled";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Slide,
  Typography,
} from "@mui/material";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MailIcon from "@mui/icons-material/Mail";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CommentIcon from "@mui/icons-material/Comment";
import PlaceIcon from "@mui/icons-material/Place";
import IconButton from "@mui/material/IconButton";
// import { Button } from "bootstrap";
import Button from "@mui/material/Button";

const AllTherpistFilter = () => {
  const therapists = useSelector((state) => state.therpists.details);
  const statustherpist = useSelector((state) => state.therpists.status);
  const [therapistDetails, setTherapistDetails] = useState(therapists);
  const dispatch = useDispatch();
  const textRef = useRef("");
  const [message, setMessage] = useState(false);
  const [open, setOpen] = useState(false);
  const typeUser = useSelector((state) => state.login.typeUser);
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };
  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const searchTherpist = () => {
    let valueSearch = textRef.current.value.trim();
    console.log(valueSearch);
    if (valueSearch && therapistDetails) {
      setTherapistDetails(
        therapistDetails.filter(
          (ther) =>
            (ther.name && ther.name.includes(valueSearch)) ||
            (ther.address && ther.address.includes(valueSearch)) ||
            (ther.description && ther.description.includes(valueSearch))
        )
      );

      if (therapistDetails.length === 0) {
        setMessage(true);
        setTherapistDetails(therapists);
      } else {
        setMessage(false);
      }
    } else {
      setTherapistDetails(therapists);
    }
  };

  const StyledCard = styled(Card)({
    maxWidth: 345,
    marginBottom: 20,
    maxHeight: 380,
    margin: "25px",
  });
  useEffect(() => {
    console.log(therapistDetails);
  }, []);
  return (
    <>
      <div>
        <h1></h1>
        <div className="therapistList">
          <div>
            <br />
            <br />
          </div>
          <div className="divAll">
            <button className="search-button" onClick={() => searchTherpist()}>
              חיפוש
            </button>
            <input
              type="text"
              ref={textRef}
              className="input"
              onChange={() => searchTherpist()}
              placeholder="חיפוש לפי שם מטפל, כתובת, תחום ספציפי ..."
            />
          </div>
          <h2
            style={{
              color: "rgb(108, 117, 125)",
              fontFamily: "revert",
              fontSize: "40px",
            }}
          >
            :המטפלים שלנו
          </h2>

          {statustherpist == "idle" && <CircularProgress disableShrink />}
          {message && <div>אין תוצאות תואמות לחיפוש שלך</div>}
          <Grid container spacing={2}>
            {/* {therapistDetails && */}
             {/* therapistDetails.map((therapist, i) => ( */}
                {therapistDetails && Array.isArray(therapistDetails) && therapistDetails.map((therapist, i) => (

                <Grid item key={therapist.id} xs={12} sm={6} md={4} lg={3}>
                  <StyledCard>
                    <CardHeader
                      avatar={
                        <Avatar
                          sx={{ bgcolor: "#f2a421", direction: "rtl" }}
                          aria-label="recipe"
                        >
                          <img
                            src={therapist.urlImage}
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
                      title={therapist.name}
                      subheader={"כתובת: " + therapist.address}
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontSize={"16px"}
                      >
                        {therapist.description}
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
                      <Typography paragraph>
                        <LocalPhoneIcon></LocalPhoneIcon> {therapist.phone}
                      </Typography>
                      <Typography paragraph>
                        <MailIcon></MailIcon> {therapist.email}
                      </Typography>
                      <Typography paragraph>
                        <PlaceIcon></PlaceIcon> {therapist.address}
                      </Typography>
                    </CardContent>
                    <IconButton aria-label="share">
                      {typeUser ? (
                        <Link
                          to={"AddComment/" + therapist.id}
                          style={{
                            color: "#15a399",
                            fontFamily: "revert",
                            fontSize: "15px",
                            textDecoration: "none",
                          }}
                        >
                          לתגובות{" "}
                        </Link>
                      ) : (
                        <>
                          <span
                            onClick={() => setOpen(true)}
                            style={{
                              color: "#15a399",
                              fontFamily: "revert",
                              fontSize: "15px",
                              textDecoration: "none",
                              cursor: "pointer",
                            }}
                          >
                            לתגובות{" "}
                          </span>
                          <div style={{ backgroundColor: "inherit" }}></div>
                        </>
                      )}{" "}
                    </IconButton>
                  </StyledCard>
                </Grid>
              ))}
          </Grid>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            // aria-describedby="alert-dialog-slide-description"
          >
            <img src="/Assets/Images/oops1.webp"></img>

            <DialogTitle style={{ direction: "rtl", color: "#15a399" }}>
              {" אופסס ... אין אפשרות לצפות בתגובות בלי להתחבר לאתר שלנו"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                id="alert-dialog-slide-description"
                style={{ direction: "rtl", color: "black" }}
              >
                להתחברות או להרשמה מחדש לחץ כאן
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
      </div>
    </>
  );
};

export default AllTherpistFilter;
