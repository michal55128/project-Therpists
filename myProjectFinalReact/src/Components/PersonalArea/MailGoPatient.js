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
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

function MailGoPatient() {
  const dispatch = useDispatch();

  const patient = useSelector((state) => state.login.patient);
  const [patientFilter, setPatientFilter] = useState();
  const allTherpist = useSelector((state) => state.therpists.details);

  useEffect(() => {
    const filteredPatientAppeals =
      patient &&
      patient.appeals &&
      patient.appeals.filter((t) => t.answer === "" || t.answer === "string");

    if (filteredPatientAppeals) {
      filteredPatientAppeals.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    }

    setPatientFilter(filteredPatientAppeals);
  }, [patient]);

  const StyledCard = styled(Card)({
    margin: "auto",
    marginBottom: 250,
    borderRadius: 10,
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
  });

  const findName = (id) => {
    const therapist = allTherpist.find((ther) => ther.id === id);
    return therapist.name;
  };
  const StyledImage = styled.img`
    width: 15%;
    height: 15%;
    float: right;
    margin-left: auto;
  `;
  return (
    <div>
      {patientFilter &&
        patientFilter &&
        patientFilter.map((app, val) => {
          const formattedDate = format(new Date(app.date), "dd.MM.yyyy");
          const nameT = findName(app.therpistId);
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
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      שם המטפל - {nameT}
                    </Typography>

                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      מאת -{app.namePatient}
                    </Typography>
                    <Typography variant="body2">
                      {app.question} <HelpOutlineIcon></HelpOutlineIcon>
                      <br />
                    </Typography>
                  </CardContent>
                  <Typography variant="body2" color="text.secondary">
                    <QuestionMarkIcon></QuestionMarkIcon>
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

export default MailGoPatient;
