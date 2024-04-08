import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import ArrowBackIosSharpIcon from "@mui/icons-material/ArrowBackIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import "../Css/Questions.css";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    {...props}
    expandIcon={
      <ArrowBackIosSharpIcon sx={{ fontSize: "0.9rem", direction: "ltr" }} />
    }
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(-90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid #15a399",
}));

export default function Questions() {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <div className="containerQ">
      <div>
        <img src="/Assets/Images/girl.jpeg" id="imgGirl" />
        <h1> שאלות נפוצות...</h1>
        <br />
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          sx={{ margin: "0.5%", border: "none", borderRadius: "10px" }}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <span class="number"> 1 </span>
            <Typography sx={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.25)" }}>
              {" "}
              נרשמים לאתר{" "}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              ראשית על מנת שתהיו מחוברים לאתר, עלייכם להזין את הפרטים המתבקשים
              ולהרשם.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
          sx={{ margin: "0.5%", border: "none", borderRadius: "10px" }}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <span class="number"> 2 </span>
            <Typography sx={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.25)" }}>
              {" "}
              אני מטפל/ת ומעוניין/ת להצטרף למאגר המטפלים שלכם
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              פשוט! כדי להצטרף לקהילת המטפלים שלנו, אנא מלא/י את טופס ההרשמה
              באתר שלנו. זהו הצעד הראשון להצטרפות לקהילה נהדרת של מטפלים מנוסים.
              אנו מחכים לראותך ולהתחיל את המסע{" "}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
          sx={{ margin: "0.5%", border: "none", borderRadius: "10px" }}
        >
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <span class="number"> 3 </span>
            <Typography sx={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.25)" }}>
              {" "}
              איך מתבצעים דירוגי המטפלים המתמחים בטיפול ילדים ?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              לדירוגי המטפלים המתמחים בטיפול ילדים יש תהליך אימות יעודי. הראשון
              מתבצע דרך קשר ישיר עם ההורים שקיבלו שירות מהמטפל. אנו פונים ישירות
              אל ההורים ומזמינים אותם לשתף חוויות באמצעות ביקורת באתר. ליד כל
              ביקורת יופיעו מספר הכוכבים שלפיהם דירגו. האימות השני מתבצע דרך
              מילוי טופס דירוג על ידי ההורים שקיבלו שירות מהמטפלים. במילוי
              הטופס, הורים מדרגים את המטפלים באופן אוטומטי. ניתן לדרג פעם אחת
              בלבד
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
          sx={{ margin: "0.5%", border: "none", borderRadius: "10px" }}
        >
          <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
            <span class="number"> 4 </span>
            <Typography sx={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.25)" }}>
              איך האתר בנוי מבחינת קטגוריות הטיפול ?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              האתר מחולק לפי קטגוריות ותחומים מרכזיים וקטגוריות פחות מרכזיות
              בלחיצה על התחומים שלנו תוכלו למצוא את התחומים והקטגוריות המצויים
              באתר האתר כאמור מיועד לטיפול בילדים מתקשים בעלי בעיות ומוגבלויות
              שיכולות להפטר במהירות ובקלות ע"י צוות מקצועי של מטפלים מהטובים
              בשוק שאנו מציעים כל שעלייכם לעשות הוא לחפש לפי הקטגוריות המרכזיות
              שמופיעות בעמוד "תחומים וקטגוריות " את הקטגוריה הספציפית ששייכת
              לילדכם ולחפש במאגר המטפלים את המטפל שהכי מתאים לי מכל הבחינות
              מבחינה מקצועית , לפי תגובות מבחינת מיקום ,איזור וכוו ובכך ליצור
              קשר עם המטפל הספציפי שבו אני מעונין
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
          sx={{ margin: "0.5%", border: "none", borderRadius: "10px" }}
        >
          <AccordionSummary aria-controls="panel5d-content" id="panel3d-header">
            <span class="number"> 5 </span>
            <Typography sx={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.25)" }}>
              {" "}
              איפה כל הפרטים שלי נשמרים ?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              באיזור האישי שלך כל הפרטים נשמרים כולל הפניות שפנית למטפל ספציפי
              ההודעות הנכסנות והיוצאות התגובות שכתבת ושאר פרטים בכל שעה תוכל
              לשנות אותם באיזור האישי..
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}
