import { Tab } from "@mui/material";
import { Box, ThemeProvider, createTheme } from "@mui/system";
import React, { useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import TabPanel from "@mui/lab/TabPanel";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import MailIcon from "@mui/icons-material/Mail";
import MailGo from "./MailGoTherpist";
import { useSelector } from "react-redux";
import MyAppealsPatient from "./MyAppealsPatient";
import MailGoPatient from "./MailGoPatient";
import MyAppealsTherpist from "./MyAppealsTherpist";

function MessegesPatient() {
  const patient = useSelector((state) => state.login.patient);
  const [numMessage, setNumMessage] = useState(0);
  useEffect(() => {
    const v = patient.appeals.filter(
      (t) => t.answer === "" || t.answer === "string"
    );
    const vIds = v.map((item) => item.id);
    const filteredPatientAppeals = patient.appeals.filter(
      (item) => !vIds.includes(item.id)
    );
    setNumMessage(filteredPatientAppeals.length);
    console.log(v);
    console.log(patient);
  });
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "200%",
        typography: "body1",
        left: "0",
        right: "50%",
        marginLeft: "-180%",
      }}
    >
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <TabList
            sx={{ width: "100%" }}
            onChange={handleChange}
            aria-label="lab API tabs example"
          >
            <Tab
              sx={{ width: "50%" }}
              label={
                <p>
                  <h4>הודעות יוצאות</h4>
                  <Badge color="primary">
                    <MailIcon color="action" />
                  </Badge>
                </p>
              }
              value="2"
            />
            <Tab
              sx={{ width: "100%" }}
              label={
                <p>
                  <h4>הודעות נכנסות</h4>
                  <Badge badgeContent={numMessage} color="primary">
                    <MailIcon color="action" />
                  </Badge>
                </p>
              }
              value="1"
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          {/* הודעות נכנסות */}
          <MyAppealsPatient />

        </TabPanel>
        <TabPanel value="2">
          {/* הודעות יוצאות */}
          <MailGoPatient />

        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default MessegesPatient;
