import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { Box, style } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAppeals } from "../../Redux/AppealSlice";
import { format, set } from "date-fns";
import styled from "@emotion/styled";
import { Message } from "@mui/icons-material";
import { getByPasswordTherpist } from "../../Redux/LoginSlice";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { useNavigate } from "react-router-dom";

const MyAppealsTherpist = () => {
  const therpist = useSelector((state) => state.login.therpist);
  const inputRef = useRef();
  const navigate=useNavigate();
  const [appeal, setAppeal] = useState({});
  const [answer, setAnswer] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [therpistFilter, setTherpistFilter] = useState();
  const dispatch = useDispatch();
  const [isOk, setIsOk] = useState(false);


  useEffect(() => {
    const v = therpist.appeals.filter(
      (t) => t.answer === "" || t.answer === "string"
    );
    // if (v) {
    //   v.sort((a, b) => new Date(b.date) - new Date(a.date));
    // }

    setTherpistFilter(v);
  }, [therpist]);

  const [expandedCards, setExpandedCards] = useState(
    Array(therpistFilter && therpistFilter.length).fill(false)
  );

  const showAnser = (index) => {
    debugger;
    setExpandedCards((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
    const v = therpist.appeals.filter(
      (t) => t.answer === "" || t.answer === "string"
    );
    setTherpistFilter(v);
    setExpanded(true);
  };
  const sendAnswer = (id, index) => {
    console.log("התגובה שהוזנה:", answer);
    let ther = therpist.appeals.filter((t) => t.id == id);
    debugger;
    setAppeal({
      id: id,
      question: ther[0].question,
      answer: answer,
      therpistId: ther[0].therpistId,
      patientId: ther[0].patientId,
      namePatient: ther[0].namePatient,
      date: new Date().toISOString(),
    });

    setExpanded(!expanded);

    setExpandedCards((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
    setIsOk(true);
    setExpanded(false);
  };

  const cancleAnswer = (index) => {
    setExpandedCards((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
    setExpanded(false);
    setAnswer("");
  };

  useEffect(() => {
    if (isOk) {
      debugger;
      console.log(appeal);
      dispatch(updateAppeals(appeal))
        .then(async (response) => {
          console.log("Response from update:", response.data);
          console.log(appeal);
          await dispatch(getByPasswordTherpist(therpist.password));
            navigate('/');
          //  alert('!ההודעה נשלחה בהצלחה')
           setAppeal({});
          setAnswer("");
        })
        .catch((error) => {
          console.error("Error adding comments:", error);
          setIsOk(false);
        });
        dispatch(getByPasswordTherpist(therpist.password));

    }
  }, [isOk, dispatch]);

  // useEffect(()=>{
  //   dispatch(getByPasswordTherpist(therpist.password))
  
  // },[dispatch,therpist])


  const StyledCard = styled(Card)({
    maxWidth: 400,
    margin: "auto",
    marginBottom: 350,
    borderRadius: 10,
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
  });

  const StyledImage = styled.img`
    width: 15%;
    height: 15%;
    float: right;
    margin-left: auto;
  `;

  return (
    <>
      {therpistFilter &&
        therpistFilter.map((app, val) => {
          const formattedDate = format(new Date(app.date), "dd.MM.yyyy");
          return (
            <div key={val}>
              <StyledCard>
                <Card
                  sx={{
                    minWidth: 580,
                    position: "absolute",
                    backgroundColor: "#fff",
                    color: "rgba(0, 0, 0, 0.87)",
                    borderRadius: "4px",
                    boxShadow:
                      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
                    overflow: "hidden",
                    minWidth: 720,
                    margin: "auto",
                    marginBottom: 200,
                  }}
                >
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {formattedDate}
                    </Typography>
                    <StyledImage
                      src="/Assets/Images/appeal1.png"
                      alt="Appeal Image"
                    />
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      מאת -{app.namePatient}
                    </Typography>
                    <Typography variant="body2">
                      {app.question}
                      <HelpOutlineIcon></HelpOutlineIcon>
                      <br />
                    </Typography>
                    <Typography variant="body2">
                      <QuestionMarkIcon></QuestionMarkIcon>
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {expandedCards[val] && (
                      <>
                        <TextField
                          autoFocus
                          required
                          margin="dense"
                          id="question"
                          fullWidth
                          variant="standard"
                          inputRef={inputRef}
                          value={answer}
                          onChange={() => {
                            setAnswer(inputRef.current.value);
                            let ther = therpist.appeals.filter(
                              (t) => t.id == app.id
                            );
                            setAppeal({
                              id: app.id,
                              question: ther[0].question,
                              answer: inputRef.current.value,
                              therpistId: ther[0].therpistId,
                              patientId: ther[0].patientId,
                              namePatient: ther[0].namePatient,
                              date: new Date().toISOString(),
                            });
                          }}
                          style={{ direction: "rtl" }}
                        />
                      </>
                    )}

                    {!expandedCards[val] && (
                      <Button onClick={() => showAnser(val)} size="small">
                        לענות תשובה
                      </Button>
                    )}
                  </CardActions>
                  {expandedCards[val] && (
                    <div>
                      <br />
                      <Button
                        onClick={() => sendAnswer(app.id, val)}
                        size="small"
                      >
                        שלח{" "}
                      </Button>
                      <Button onClick={() => cancleAnswer(val)} size="small">
                        ביטול{" "}
                      </Button>
                    </div>
                  )}

                </Card>
              </StyledCard>
            </div>
          );
        })}
    </>
  );
};

export default MyAppealsTherpist;
