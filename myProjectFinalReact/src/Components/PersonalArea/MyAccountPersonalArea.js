import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import MyAccount from "./MyDetailsTherpist";
import Chat from "../Chat";
import "../../Css/Chat.css";
import CommentsById from "./CommentsById";
import { useSelector } from "react-redux";
import MyDetailsPatient from "./MyDetailsPatient";
import MyDetailsTherpist from "./MyDetailsTherpist";
import MyAppealsTherpist from "./MyAppealsTherpist";
import MyAppealsPatient from "./MyAppealsPatient";
import CommentsByIdPatient from "./CommentsByIdPatient";
import MessegesTherpist from "./MessegesTherpist";
import MessegesPatient from "./MessegesPatient";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            backgroundColor: "#ffffff",
            display: "flex",
            justifyContent: " space-evenly",
            alignContent: "center",
            flexWraprap: "wrap",
            p: -8,
            marginTop: " 7%",
            marginLeft: "-89%",

          }}
        >
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function MyAccountPersonalArea() {
  const [therpistUser, setTherpistUser] = React.useState(true);
  const typeUser = useSelector((state) => state.login.typeUser);
  const patientCurrent = useSelector((state) => state.login.patient);
  const therpistCurrent = useSelector((state) => state.login.therpist);

  React.useEffect(() => {
    if (typeUser === "therpist") {
      setTherpistUser(true);
    } else {
      setTherpistUser(false);
    }
  });
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "row-reverse",
        marginRight: "20px",
        textAlign: "center",
        width: "100%",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderLeft: 1,
          borderColor: "divider",

          "& .Mui-selected": {
            color: "#f2a421",
          },
        }}
      >
        <Tab label="הפרטים שלי" {...a11yProps(0)} />
        <Tab label="התגובות שלי" {...a11yProps(1)} />
        <Tab label="הודעות" {...a11yProps(2)} />

      </Tabs>
      <TabPanel value={value} index={0}>
        {typeUser === "therpist" && therpistCurrent && <MyDetailsTherpist />}
        {typeUser === "patient" && patientCurrent && <MyDetailsPatient />}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {typeUser === "therpist" && <CommentsById id={therpistCurrent.id} />}
        {typeUser === "patient" && <CommentsByIdPatient />}

      </TabPanel>
      <TabPanel value={value} index={2}>
        {typeUser === "therpist"&& therpistCurrent && <MessegesTherpist />}
        {typeUser === "patient" && patientCurrent && <MessegesPatient />}
      </TabPanel>
    </Box>
  );
}
