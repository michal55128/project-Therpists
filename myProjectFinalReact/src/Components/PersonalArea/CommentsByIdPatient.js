import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import Starss from "../Starss";
import { useEffect, useState } from "react";
import { removeComments } from "../../Redux/CommentSlice";
import { getByPasswordPatient } from "../../Redux/LoginSlice";

const CommentsByIdPatient = (props) => {
  const patient = useSelector((state) => state.login.patient);
  const [nameTherpist, setNameTherpist] = useState([]);
  const allTherpist = useSelector((state) => state.therpists.details);
  const dispatch = useDispatch();
  const [ok, setOk] = useState(false);
  const [commentSort,setCommentSort]=useState(patient.comments);
  const findTherapistsNames = () => {
    const therapistsNames = [];
    patient.comments.forEach((comment) => {
      const therapistId = comment.therpistId;
      const therapist = allTherpist.find((ther) => ther.id === therapistId);
      if (therapist) {
        therapistsNames.push({ name: therapist.name, date: comment.date });
      }
    });
    return therapistsNames.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const commentText = {
    display: "flex",
    width: "100%",
    padding: "50px 15px 60px",
    borderBottom: "1px solid #ccc",
    alignItems: "center",
    padding: "15px",
    alignContent: "center",
    justifyContent: "flex-start",
    flexWrap: "nowrap",
    flexDirection: "column",
  };
  const imageComment = {
    width: "71px",
    height: "77px",
    margin: "15px",
    display: "inline-block",
    verticalAlign: "top",
    backgroundRepeat: "no-repeat",
  };
  useEffect(() => {
    console.log(nameTherpist);
    setNameTherpist(findTherapistsNames());
  }, []);
  const removeC = async (id) => {
    await dispatch(removeComments(id));
    debugger;
    dispatch(getByPasswordPatient(patient.password));
    setOk(true);
  };
  useEffect(()=>{
    dispatch(getByPasswordPatient(patient.password));

  },[dispatch,patient.comment])
  useEffect(() => {
    if (patient && patient.comments) {
      const sortedComments = [...patient.comments].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setCommentSort(sortedComments);
    }
  }, [patient, dispatch]);
  return (
    <>
      <h2>התגובות שכתבתי</h2>
      <br/>
      {ok && (
        <div
          class="alert alert-warning"
          role="alert"
          style={{
            width: "420px",
            textAlign: "center",
            left: "20%",
            backgroundColor: "#15a39947",
          }}
        >
          !!התגובה נמחקה בהצלחה
        </div>
      )}
      {patient &&
        patient.comments &&
        commentSort.map((val, ind) => {
          const formattedDate = format(new Date(val.date), "dd.MM.yyyy");
          const therapist = nameTherpist.find((therapist) => therapist.date === val.date);
          return (
            <>
              <div
                key={val.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid #ccc",
                  padding: "15px",
                }}
              >
                <img
                  src="/Assets/Images/comment1.png"
                  alt="תמונה של התגובה"
                  style={{
                    width: "71px",
                    height: "77px",
                    marginRight: "200px",
                  }}
                />
                <div style={{ flex: 1 }}>
                <p>שם המטפל - {therapist && therapist.name}</p>

                  <p>{formattedDate}</p>
                  <p>{val.description}</p>
                  <p>
                    <Starss numStars={val.numStars} />
                  </p>
                  <button
                    className="search-button-add"
                    onClick={() => removeC(val.id)}
                  >
                    מחיקה
                  </button>
                </div>
              </div>
            </>
          );
        })}
    </>
  );
};

export default CommentsByIdPatient;
