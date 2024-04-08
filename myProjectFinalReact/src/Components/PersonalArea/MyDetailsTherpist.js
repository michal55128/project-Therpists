import { color, textAlign } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { fetchTherpist, updateTherpist } from "../../Redux/TherpistsSlice";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MailIcon from "@mui/icons-material/Mail";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CommentIcon from "@mui/icons-material/Comment";
import PlaceIcon from "@mui/icons-material/Place";
import AddComment from "../AddComment";
import Avatar from "@mui/material/Avatar";
import styled from "@emotion/styled";
import { Box } from "@mui/system";
import { getByPasswordTherpist, setTherpist } from "../../Redux/LoginSlice";
import { Button } from "bootstrap";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { postCategory } from "../../Redux/CategorySlice";
import Select from "react-select";

const MyDetailsTherpist = () => {
  const therpist = useSelector((state) => state.login.therpist);
  const typeUser = useSelector((state) => state.login.typeUser);
  const AllCategories = useSelector((state) => state.categories.category);

  const navigate = useNavigate();
  const [ok, setOk] = useState(true);
  const dispatch = useDispatch();

  const [name, setName] = useState(therpist.name);
  const [email, setEmail] = useState(therpist.email);
  const [phone, setPhone] = useState(therpist.phone);
  const [address, setAddress] = useState(therpist.address);
  const [description, setDescription] = useState(therpist.description);

  const [isCorrect, setIsCorrect] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const [isDescripitionValid, setIsDescriptionValid] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const [isConfirm, setIsConfirm] = useState(false);
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newCategory, setNewCategory] = useState({ nameCategory: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const optionsCategories = useSelector((state) => state.categories.category);
  const [statusCategories, setStatusCategories] = useState("idle");
  const [categoryT, setCategoryT] = useState([]);

  const [therpistUpdate, setTherpistUpdate] = useState({
    id:therpist.id,
    name: therpist.name,
    address: therpist.address,
    email:therpist.email,
    phone: therpist.phone,
    description: therpist.description,
    password:therpist.password,
    image: file ? file.get("Image") : "",
    categoriesId: [],
  });
  useEffect(() => {

    // console.log("therpist", therpist);
    // console.log("type", typeUser);

  });

  const handleCategoryChange = (event, value) => {
    console.log("s", selectedCategories);
    console.log("0", value);
    if (value && value.option) {
      selectedCategories.push(value.option.value);
      console.log(selectedCategories);
    } else {
      setSelectedCategories([]);
    }
  };
  const findCategoriesForTherapist = () => {
    const categories = [];
    console.log(AllCategories);
    for (let index = 0; index < AllCategories.length; index++) {
      let len = AllCategories[index].therpists
        ? AllCategories[index].therpists.length
        : 0;
      for (let index1 = 0; index1 < len; index1++) {
        if (AllCategories[index].therpists[index1].id == therpist.id) {
          categories.push(AllCategories[index].nameCategory);
          setCategoryT([...categoryT, AllCategories[index].nameCategory]);
          console.log(categoryT);
        }
      }
    }
    console.log(categories);
    return categories;
  };
  useEffect(() => {
    var t = findCategoriesForTherapist();
    console.log(t);
    setCategoryT(t);
    console.log(categoryT);
  }, []);

  const handleNewCategoryChange = (e) => {
    console.log(newCategory);
    setNewCategory({
      nameCategory: e.target.value,
    });
  };
  const StyledCard = styled(Card)({
    maxWidth: 600,
    marginBottom: 20,
    maxHeight: 380,
    margin: "25px",
    textAlign: "center",
    width: 800,
  });
  const edit = () => {
    setOk(false);
  };
  const cancle = () => {
    setOk(true);
  };
  const saveUpdate = () => {};

  const HandleConfirmation = () => {
    const isNameValid = /^[A-Za-zא-ת\s]+$/u.test(name) && name.length > 1;
    // const isDescripitionValid =
    //   /^[A-Za-zא-ת\s]+$/u.test(description) && description.length > 1;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPhoneNumberValid = /^\d{10}$/.test(phone);


    setIsConfirm(true);
    setIsValidName(isNameValid);
    setIsValidEmail(isEmailValid);
    // setIsDescriptionValid(isDescripitionValid);
    setIsValidPhoneNumber(isPhoneNumberValid);

    if (
      isNameValid &&
      isEmailValid &&
      isPhoneNumberValid 
      // isDescripitionValid 
      // !selectedCategories.length == 0
    )
     {
      debugger
      setTherpistUpdate({
        id:therpist.id,
        name: name,
        address: address,
        email: email,
        phone: phone,
        description: therpistUpdate.description,
        password: therpist.password,
        image: file ? file.get("Image") : "",
      

        categoriesId: selectedCategories,
      });
      setIsCorrect(true);
    } else {
      // alert('יש למלא את כל השדות בצורה תקינה');
      setIsCorrect(false);
    }
  };
  const handleAddNewCategory = () => {
    // debugger
    dispatch(postCategory(newCategory));
    // window.location.reload();
    setMessage(true);
  };

  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];
    const formData = new FormData();
    formData.append("Image", selectedFile);
    setFile(formData);
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
    };

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };
  useEffect(() => {
    if (isCorrect) {
        console.log(therpistUpdate);
        debugger
        dispatch(updateTherpist(therpistUpdate))
            .then((response) => {
                console.log("Response from addtherpist:", response.data);
                dispatch(getByPasswordTherpist(therpist.password))
                setIsCorrect(true);
            })
            .catch((error) => {
                console.error("Error adding therpist:", error);
                setIsCorrect(false);
            });
    }
}, [isCorrect, dispatch]);
useEffect(()=>{
  dispatch(getByPasswordTherpist(therpist.password))

},[dispatch,therpist])
  return (
    <>
      {ok && therpist && (
        <div>
          <h1 style={{ color: "#f2a421", textAlignt: "center" }}>
            {" "}
            :הפרטים שלי במערכת
          </h1>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: "600",
            }}
          >
            <Grid item key="1" xs={12} sm={6} md={4} lg={3}>
              <StyledCard>
                <CardHeader
                  avatar={
                    <Avatar
                      sx={{
                        bgcolor: "#f2a421",
                        direction: "rtl",
                        width: 60,
                        height: 60,
                      }}
                      aria-label="recipe"
                    >
                      <img
                        src={therpist.urlImage}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          fontFamily: "-moz-initial",
                          fontSize: "500px",
                        }}
                      />
                    </Avatar>
                  }
                  style={{
                    color: "#15a399",
                    fontFamily: "revert",
                    fontSize: "16px",
                  }}
                  title={therpist.name}
                  subheader={"כתובת: " + therpist.address}
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontSize={"16px"}
                  >
                    {therpist.description}
                  </Typography>
                </CardContent>

                <CardContent>
                  <Typography
                    paragraph
                    style={{
                      color: "#15a399",
                      fontFamily: "revert",
                      fontSize: "18px",
                    }}
                  >
                    :פרטים נוספים
                  </Typography>
                  <a
                    href={`tel:${therpist.phone}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Typography paragraph>
                      {" "}
                      <IconButton
                        aria-label="share"
                        href={`tel:${therpist.phone}`}
                      >
                        <LocalPhoneIcon />
                      </IconButton>{" "}
                      {therpist.phone}
                    </Typography>
                  </a>
                  <a
                    href={`mailto:${therpist.email}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Typography paragraph>
                      <IconButton
                        aria-label="share"
                        href={`mailto:${therpist.email}`}
                      >
                        <MailIcon />
                      </IconButton>
                      {therpist.email}
                    </Typography>
                  </a>
                  <a
                    aria-label="navigate"
                    component="a"
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      therpist.address
                    )}`}
                    target="_blank"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Typography paragraph>
                      <IconButton
                        aria-label="share"
                        component="a"
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          therpist.address
                        )}`}
                        target="_blank"
                      >
                        <PlaceIcon></PlaceIcon>{" "}
                      </IconButton>{" "}
                      {therpist.address}
                    </Typography>
                  </a>
                </CardContent>
                <IconButton aria-label="share"></IconButton>
              </StyledCard>
              <button className="search-button-add" onClick={() => edit()}>
                עריכה
              </button>
            </Grid>
          </Box>
        </div>
      )}
      {!ok && therpist && (
        <div className="container">
          <form>
            <div
              className="row"
              style={{
                border: "none",
                boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
              }}
            >
              <h1> </h1>
              <h3 className="title"> עריכת הפרטים</h3>
              <label htmlFor="name">
                <i className="fa fa-user"></i> שם מלא
              </label>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                  setTherpistUpdate((therpistUpdate)=>({...therpistUpdate,name:e.target.value}))

                }}
                type="text"
                maxLength="25"
                id="fname"
                name="firstname"
                // placeholder="John M. Doe"
                required
                value={therpistUpdate.name}
                style={{ direction: "rtl" }}
              />
              {!isValidName && isConfirm && (
                <span className="error-message">שם לא תקין</span>
              )}

              <label htmlFor="email">
                <i className="fa fa-envelope"></i> אימייל
              </label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                  setTherpistUpdate((therpistUpdate)=>({...therpistUpdate,email:e.target.value}))

                }}
                type="text"
                id="email"
                name="email"
                value={therpistUpdate.email}
                style={{ direction: "rtl" }}
              />
              {!isValidEmail && isConfirm && (
                <span className="error-message">אימייל לא תקין</span>
              )}
              <label>
                <i className="fa fa-envelope"></i> טלפון
              </label>
              <input
                onChange={(e) => {
                  setPhone(e.target.value);
                  setTherpistUpdate((therpistUpdate)=>({...therpistUpdate,phone:e.target.value}))

                }}
                type="text"
                id="phone"
                name="phone"
                value={therpistUpdate.phone}
                style={{ direction: "rtl" }}
              />
              {!isValidPhoneNumber && isConfirm && (
                <span className="error-message">מספר טלפון לא תקין</span>
              )}
              <label>
                <i className="fa fa-envelope"></i> כתובת
              </label>
              <input
                onChange={(e) => {
                  setAddress(e.target.value);
                  setTherpistUpdate((therpistUpdate)=>({...therpistUpdate,address:e.target.value}))

                }}
                type="text"
                id="address"
                name="address"
                value={therpistUpdate.address}
                style={{ direction: "rtl" }}
                placeholder="בן גוריון 29 , תל אביב"
              />
              {!isValidName && isConfirm && (
                <span className="error-message"> כתובת לא תקינה</span>
              )}
              <label>
                <i className="fa fa-envelope"></i> תיאור מקצועי
              </label>
              <input
                onChange={(e) => {
                  setTherpistUpdate((therpistUpdate)=>({...therpistUpdate,description:e.target.value}))
                }}
                type="text"
                id="descrpition"
                name="description"
                value={therpistUpdate.description}
                style={{ direction: "rtl" }}
                placeholder="מתמחה בנושא הזה עם וותק של 8 שנים"
              />

              <label    style={{
                  fontSize: "18px",
                  color: "#15a399",
                  marginBottom: "10px",
                }}>
                <i className="fa fa-envelope"></i> :הנך רשום בקטגוריות
                <br/>
                {categoryT.map((val, index) => {
                  return <li key={index}>{val}</li>;
                })}
              </label>

              <label>בחר קטגוריה להוספה</label>
              <Select
                isMulti
                name="optionsCategories"
                options={optionsCategories.map((category) => ({
                  value: category.id,
                  label: category.nameCategory,
                }))}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleCategoryChange}
              />
              {message && (
                <p className="error-message">יש לבחור את הקטגוריה שנוספה</p>
              )}
              {selectedCategories.length == 0 && isConfirm && (
                <span className="error-message">חובה לבחור קטגוריה </span>
              )}
              <div>
                <label>הוסף קטגוריה חדשה</label>
                <input type="text" onChange={handleNewCategoryChange} style={{direction:'rtl'}}/>
                <button
                  type="button"
                  className="add-image-btn"
                  onClick={handleAddNewCategory}
                >
                  הוסף
                </button>
              </div>
              <div>
                <label htmlFor="image-upload"> :בחר תמונה</label>
                <br />
                <Input
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                  accept="image/*"
                  sx={{
                    height: "100px",
                    bgcolor: "transparent",
                  }}
                  id="image-upload"
                />
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("image-upload").click()
                  }
                  className="add-image-btn"
                >
                  הוסף תמונה
                </button>
                {selectedImage && (
                  <img
                    className="image-preview"
                    src={selectedImage}
                    alt="Selected"
                    style={{
                      maxWidth: "200px",
                      marginTop: "10px",
                      border: "50%",
                    }}
                  />
                )}
              </div>

              <input
                className="btnOk"
                type="button"
                value={"שמירת שינויים"}
                onClick={HandleConfirmation}
              />
              <input
                className="btnOk"
                type="button"
                value={" ביטול"}
                onClick={() => cancle()}
              />
            </div>
          </form>
        </div>
      )}
{isCorrect&& <> <div
          class="alert alert-warning"
          role="alert"
          style={{
            width: "420px",
            textAlign: "center",
            left: "20%",
            backgroundColor: "#15a39947",
          }}
        >
          !העדכון בוצעה בהצלחה
        </div>
        {navigate('/')}
        </>
        }
    </>
  );
};

export default MyDetailsTherpist;
