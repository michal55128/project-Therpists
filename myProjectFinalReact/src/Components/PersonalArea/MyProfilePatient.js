import { Link } from "react-router-dom";
import "../../Css/MyProfiletherpist.css";

const MyProfilePatient = () => {
  return (
    <>
      <div className="my-profile-therapist-container">
        <h1>הפרופיל שלי כמטופל</h1>
        <p>
          עלמנת להצטרף למאגר המטפלים הגדול שלנו עליך להרשם תחילה כמטפל ולאחר מכן
          להתחבר לאתר
        </p>
        <div className="buttons-container">
          <Link to="/SignIn" className="login-button">
            התחברות כמטפל
          </Link>
          <Link to="/TherpistDetails" className="register-button">
            הרשמה כמטפל
          </Link>
        </div>
      </div>
      
    </>
  );
};

export default MyProfilePatient;
