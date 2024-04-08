import { Tab } from "@mui/material";
import { Box, ThemeProvider, createTheme } from "@mui/system";
import React, { useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import TabPanel from "@mui/lab/TabPanel";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import MailIcon from "@mui/icons-material/Mail";
import { useSelector } from "react-redux";
import MailGoTherpist from "./MailGoTherpist";
import MyAppealsTherpist from "./MyAppealsTherpist";

function MessegesTherpist() {
  const therpist = useSelector((state) => state.login.therpist);
  const [numMessage, setNumMessage] = useState(0);
  useEffect(() => {
    const v = therpist.appeals.filter(
      (t) => t.answer === "" || t.answer === "string"
    );
    setNumMessage(v.length);
    // console.log(v);
    // console.log(therpist);
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
          <MyAppealsTherpist></MyAppealsTherpist>
        </TabPanel>
        <TabPanel value="2">
          {/* הודעות יוצאות */}
          <MailGoTherpist />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default MessegesTherpist;
