import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import styled from "@emotion/styled";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
function MailGoTherpist() {
  const dispatch = useDispatch();

  const therpist = useSelector((state) => state.login.therpist);
  const [therpistFilter, setTherpistFilter] = useState();

  // useEffect(() => {
  //   // setTherpistFilter(
  //   //   therpist.appeals.filter((t) => t.answer != "" || t.answer != "string")
  //   // );
  //   const v = therpist.appeals.filter(
  //     (t) => t.answer === "" || t.answer === "string"
  //   );
  //   // setTherpistFilter(therpist.appeals.map((t)=>t.id!=v.map((k)=>k.id)))
  //   const vIds = v.map((item) => item.id); // מייצר מערך עם ה־id של כל רשומה במערך V
  //   const filteredTherapistAppeals = therpist.appeals.filter((item) => !vIds.includes(item.id));

  //   setTherpistFilter(filteredTherapistAppeals);
  //   console.log(therpistFilter);
  //   console.log(therpist);
  // });

  useEffect(() => {
    const v = therpist.appeals.filter(
      (t) => t.answer === "" || t.answer === "string"
    );
    const vIds = v.map((item) => item.id);
    const filteredTherapistAppeals = therpist.appeals.filter(
      (item) => !vIds.includes(item.id)
    );

    if (filteredTherapistAppeals) {
      filteredTherapistAppeals.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    }

    setTherpistFilter(filteredTherapistAppeals);
  }, [therpist]);

  const StyledCard = styled(Card)({
    margin: "auto",
    marginBottom: 220,
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
    <div>
      {therpistFilter &&
        therpistFilter &&
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
                      {app.question} <HelpOutlineIcon></HelpOutlineIcon>
                      <br />
                    </Typography>
                  </CardContent>
                  <Typography
                    variant="body2"
                    color="#f2a421"
                  >
                    {app.answer}
                    <br />
                  </Typography>
                  <Typography>
                    <br />
                  </Typography>
                </Card>{" "}
              </StyledCard>
            </div>
          );
        })}
    </div>
  );
}

export default MailGoTherpist;
