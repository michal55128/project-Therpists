import { Link } from "react-router-dom";
import '../../Css/MyProfiletherpist.css'
const MyProfiletherpist = () => {

  return (
    <>
      <div className="my-profile-therapist-container">
        <h1>הפרופיל שלי כמטפל</h1>
        <p>
          אין לך הרשאות לכתוב תגובות ופניות למטפלים אחרים מכיוון שאתה מוגדר
          כמטפל על מנת לשנות זאת, עליך להתחבר כמטופל
        </p>
        <div className="buttons-container">
          <Link to="/SignUpPatient" className="register-button">
            הרשמה כמטופל
          </Link>
          <Link to="/SignIn" className="login-button">
            התחברות כמטופל
          </Link>
        </div>
      </div>
    </>
  );
};

export default MyProfiletherpist;
