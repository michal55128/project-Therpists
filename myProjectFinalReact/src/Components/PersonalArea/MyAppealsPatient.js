import styled from "@emotion/styled";
import { Card, CardContent, Typography } from "@mui/material";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import "../../Css/Chat.css";

const MyAppealsPatient = () => {
  const patient = useSelector((state) => state.login.patient);

  const [patientFilter, setPatientFilter] = useState();
  const [nameTherpist, setNameTherpist] = useState([]);
  const allTherpist = useSelector((state) => state.therpists.details);

  useEffect(() => {
    const v = patient.appeals.filter(
      (t) => t.answer === "" || t.answer === "string"
    );

    // const vIds = v.map((item) => item.id);
    // const filteredPatientAppeals = patient.appeals.filter(
    //   (item) => !vIds.includes(item.id)
    // );

    const vIds = v.map((item) => item.id);
    const filteredPatientAppeals = patient.appeals.filter(
      (item) => !vIds.includes(item.id)
    );

    filteredPatientAppeals.sort((a, b) => new Date(b.date) - new Date(a.date));

    setPatientFilter(filteredPatientAppeals);
  }, [patient]);

  const findName = (id) => {
    const therapist = allTherpist.find((ther) => ther.id === id);
    return therapist.name;
  };
  const StyledCard = styled(Card)({
    maxWidth: 580,
    margin: "auto",
    marginBottom: 200,
    borderRadius: 10,
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    minWidth: "720",
  });
  const StyledImage = styled.img`
    width: 15%;
    height: 15%;
    float: right;
    margin-left: auto;
  `;
  return (
    <>
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
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        <p> שם המטפל - {nameT}</p>
                      </Typography>
                      <Typography variant="body2">
                        {app.question} <HelpOutlineIcon></HelpOutlineIcon>
                        <br />
                      </Typography>
                    </CardContent>
                    <Typography variant="body2" color="#f2a421">
                      {app.answer}
                      <br />
                    </Typography>
                  </Card>
                </StyledCard>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default MyAppealsPatient;
