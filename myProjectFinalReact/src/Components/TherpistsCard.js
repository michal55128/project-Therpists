import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { fetchTherpist } from "../Redux/TherpistsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, unstable_HistoryRouter, useLocation, useNavigate } from "react-router-dom";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Slide,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MailIcon from "@mui/icons-material/Mail";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CommentIcon from "@mui/icons-material/Comment";
import PlaceIcon from "@mui/icons-material/Place";
import AddComment from "./AddComment";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";


const StyledCard = styled(Card)({
  maxWidth: 345,
  marginBottom: 20,
  maxHeight: 400,
  margin: "25px",
});

export default function TherpistCard(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let navigate = useNavigate();
  const details = useSelector((state) => state.therpists.details);
  const status = useSelector((state) => state.therpists.status);
  const dispatch = useDispatch();
  const typeUser = useSelector((state) => state.login.typeUser);


  const [open, setOpen] = React.useState(false);

  const location = useLocation();

  // const history=unstable_HistoryRouter();

  function handleClose() {
    setOpen(false);
    // history.goBack();
    // navigate('/CategoryTherpists')
    // window.location.reload();
    // window.history.back();
    navigate(-0.5);
    // navigate('/CategoryTherpists');
  }

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  return (
    <>

      <div>
        <div className="therapistList">
          {status === "idle" && <CircularProgress disableShrink />}
          <Grid container spacing={2}>
            {props.therapists &&
              props.therapists.map((therapist, i) => (
                <Grid item key={therapist.id} xs={12} sm={6} md={4} lg={3}>
                  {console.log(details)}
                  {console.log(therapist)}

                  <StyledCard>
                    <CardHeader
                      avatar={
                        <Avatar
                          sx={{ bgcolor: "#f2a421", direction: "rtl" }}
                          aria-label="recipe"
                        >
                          <img
                            src={therapist.urlImage}
                            // src={therapist.pic}
                            alt="nn"
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
                    {/* <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {therapist.email}
                    </Typography>
                  </CardContent> */}
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
                      {/* <Typography paragraph onClick={() => navigate('AddComment/' +therapist.id)} style={{ color: '#15a399', fontFamily: 'revert', fontSize: '15px' }}>לתגובות</Typography> */}
                      {/* <Typography paragraph onClick={() => <Link to={'AddComment/' + therapist.id} />} style={{ color: '#15a399', fontFamily: 'revert', fontSize: '15px' }}>לתגובות</Typography> */}
                      {/* <Link to={'AddComment/' + therapist.id} style={{ color: '#15a399', fontFamily: 'revert', fontSize: '15px', textDecoration: 'none' }}>לתגובות </Link> */}
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
                      )}
                    </IconButton>
                  </StyledCard>
                  {/* <AddComment commentsT={therapist.comments} /> */}
                </Grid>
              ))}
          </Grid>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            PaperProps={{
              sx: {
                backgroundColor: "#f2f2f2",
              },
            }}
            // onClose={handleClose}
          >
            <IconButton
              aria-label="close"
              onClick={handleClose}
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
}
