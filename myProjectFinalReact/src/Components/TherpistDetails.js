import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTheripstsServer,
  addTherpist,
  getAll,
} from "../Redux/TherpistsSlice";
import Select from "react-select";
import "../Css/TherpistDetails.css";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { fetchCategory, postCategory } from "../Redux/CategorySlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const TherpistDetails = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("in useeffect");
    if (statusCategories !== "pending") {
      console.log(optionsCategories);
      console.log(optionsCategories);
      console.log(statusCategories);
    }
  }, []);

  useEffect(() => {
    console.log("in useeffect");
    console.log(optionsCategories);
    console.log(optionsCategories);
    console.log(statusCategories);
    // }
  }, []);

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

  const handleNewCategoryChange = (e) => {
    console.log(newCategory);
    setNewCategory({
      nameCategory: e.target.value,
    });
  };

  const handleAddNewCategory = () => {
    // debugger
    dispatch(postCategory(newCategory));
    // window.location.reload();
    setMessage(true);
  };

  const [therpist, setTherpist] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    description: "",
    password: "",
    image: "",
    categoriesId: [],
  });
  const HandleConfirmation = () => {
    const isNameValid = /^[A-Za-zא-ת\s]+$/u.test(name) && name.length > 1;
    // const isDescripitionValid =
    //   /^[A-Za-zא-ת\s]+$/u.test(description) && description.length > 1;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPhoneNumberValid = /^\d{10}$/.test(phone);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

    setIsValidPassword(passwordRegex.test(password));

    setIsConfirm(true);
    setIsValidName(isNameValid);
    setIsValidEmail(isEmailValid);
    // setIsDescriptionValid(isDescripitionValid);
    setIsValidPhoneNumber(isPhoneNumberValid);

    if (
      isNameValid &&
      isEmailValid &&
      isPhoneNumberValid &&
    //   isDescripitionValid &&
      isValidPassword &&
      !selectedCategories.length == 0
    ) {
      setTherpist({
        name: name,
        address: address,
        email: email,
        phone: phone,
        description: description,
        password: password,
        image: file.get("Image"),
        categoriesId: selectedCategories,
      });
      setIsCorrect(true);
      debugger;
      // dispatch(addTheripstsServer(therpist))
      // .then((response) => {
      //     console.log("Response from addtherpist:", response.data);
      //     setIsCorrect(true);
      // })
      // .catch((error) => {
      //     console.error("Error adding therpist:", error);
      //     setIsCorrect(false);
      // });
    } else {
      // alert('יש למלא את כל השדות בצורה תקינה');
      setIsCorrect(false);
    }
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
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (isCorrect) {
      console.log(therpist);
      debugger;
      dispatch(addTheripstsServer(therpist))
        .then((response) => {
          console.log("Response from addtherpist:", response.data);
          setIsCorrect(true);
          alert(" התווספת בהצלחה למאגר המטפלים הגדול שלנו");
          navigate("/SignIn");
        })
        .catch((error) => {
          console.error("Error adding therpist:", error);
          setIsCorrect(false);
        });
    }
  }, [isCorrect, dispatch]);

  return (
    <>
      {!isCorrect && (
        <div className="container">
          <form>
            <div className="row">
              <h1> </h1>
              <h3 className="title"> הוספת מטפל חדש</h3>
              <label htmlFor="name">
                <i className="fa fa-user"></i> שם מלא
              </label>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                maxLength="25"
                id="fname"
                name="firstname"
                placeholder="John M. Doe"
                required
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
                }}
                type="text"
                id="email"
                name="email"
                placeholder="john@example.com"
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
                }}
                type="text"
                id="phone"
                name="phone"
                placeholder="050-2345678"
              />
              {!isValidPhoneNumber && isConfirm && (
                <span className="error-message">מספר טלפון לא תקין</span>
              )}
              <label>
                <i className="fa fa-envelope"></i> סיסמה
              </label>
              {/* <input onChange={(e) => {
                                setPassword(e.target.value);
                            }} id="password" name="password" placeholder="050-2345678"

                            /> */}

              <OutlinedInput
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Avm12908mUt"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {!isValidPassword && isConfirm && (
                <span className="error-message">
                  {" "}
                  הסיסמה חייבת להיות באורך של לפחות 6 תווים ולהכיל לפחות אות
                  קטנה אחת, אות גדולה אחת וספרה אחת{" "}
                </span>
              )}
              <label>
                <i className="fa fa-envelope"></i> כתובת
              </label>
              <input
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                type="text"
                id="address"
                name="sddress"
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
                  setDescription(e.target.value);
                }}
                type="text"
                id="descrpition"
                name="description"
                placeholder="מתמחה בנושא הזה עם וותק של 8 שנים"
              />
              {/* {!isDescripitionValid && isConfirm && (
                <span className="error-message"> חובה לכתוב תיאור</span>
              )} */}
              <label> בחר קטגוריה</label>
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
                <input type="text" onChange={handleNewCategoryChange} />
                <button
                  type="button"
                  className="add-image-btn"
                  onClick={handleAddNewCategory}
                >
                  הוסף
                </button>
                {/* <input className="add-image-btn" type="button" value={"הוסף"}  onClick={handleAddNewCategory}/> */}
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
                value={"אישור"}
                onClick={HandleConfirmation}
              />
            </div>
          </form>
        </div>
      )}
      {
        // isCorrect && (
        //     <div>
        //         {/* <h3> התווספת בהצלחה למאגר המטפלים הגדול שלנו</h3> */}
        //         {alert(' התווספת בהצלחה למאגר המטפלים הגדול שלנו')}
        //         {navigate('/CategoryTherpists')}
        //         {window.location.reload()}
        //     </div>
        // )
      }
    </>
  );
};
export default TherpistDetails;