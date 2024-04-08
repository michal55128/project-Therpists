import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { postPatient } from '../Redux/PatientSlice';
import { Avatar, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
// import { setUser } from './loginSlice';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../Css/SignUpPatient.css'
import { Visibility, VisibilityOff } from '@mui/icons-material';

const defaultTheme = createTheme({

    palette: {
        primary: {
            main: '#15a399',

        },
        secondary: {
            main: '#15a399',
        }
    }
});
export default function SignUpPatient() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [patient, setPatient] = useState({ NameChild: '', Address: '', IdChild: '', Email: '', Phone: '', Password: '' });
    const [status2, setStatus2] = useState(null);
    const [messagePassword, setMessagePassword] = useState('');
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [showPassword, setShowPassword] = useState(false);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const funcPassword = (e) => {
        setPatient((prevUser) => ({ ...prevUser, Password: e.target.value }));
    };
    const funcName = (e) => {
        setPatient((prevUser) => ({ ...prevUser, NameChild: e.target.value }));
    };
    const funcPhone = (e) => {
        setPatient((prevUser) => ({ ...prevUser, Phone: e.target.value }));
    };

    const funcEmail = (e) => {
        setPatient((prevUser) => ({ ...prevUser, Email: e.target.value }));
    };
    const funcAddress = (e) => {
        setPatient((prevUser) => ({ ...prevUser, Address: e.target.value }));
    };
    const funcIdChild = (e) => {
        setPatient((prevUser) => ({ ...prevUser, IdChild: e.target.value }));
    };

    const signUp = async () => {
        debugger
        const errors = [];

        if (!patient.Email.endsWith('@gmail.com')) {
            errors.push('אנא הזן כתובת Gmail חוקית.');
        }
        if ((patient.Phone).length < 9) {
            errors.push('נא להזין מספר טלפון בן 10 ספרות.');
        }
        if ((patient.IdChild).length !== 9) {
            errors.push('נא להזין מספר ת.ז בן 10 ספרות.');
        }
        if (!passwordRegex.test(patient.Password)) {
            errors.push('הסיסמה חייבת להיות באורך של לפחות 6 תווים ולהכיל לפחות אות קטנה אחת, אות גדולה וספרה אחת.');
        }
        if (errors.length > 0) {
            setMessagePassword(errors.join(''));
        } else {
            setMessagePassword('');
            try {
                dispatch(postPatient(patient));
                navigate('/SignIn');
            } catch (error) {
                console.error('Error signing up:', error);
                if (error.response) {
                    console.log("response: ", error.response.data, error.response.status, error.response.headers);
                } else if (error.request) {
                    console.log("request : ", error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            
            }
        }
    };

    return (
        <div className="modal-left">
            <ThemeProvider theme={defaultTheme}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <Avatar sx={{ m: 1, bgcolor: '#15a399', display: 'flex', justifyContent: 'center' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                </div>
                <h1 className="modal-title"> (: הרשמה לאתר שלנו</h1>
                <br />
                <Grid container spacing={2}>

                    <Grid item xs={4}>
                        <div className="input-block">
                            <label htmlFor="text" className="input-label">כתובת</label>
                            <input required type="Address" name="Address" id="Address" onChange={funcAddress} />
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className="input-block">
                            <label htmlFor="text" className="input-label">ת.ז ילד</label>
                            <input required type="IdChild" name="IdChild" id="IdChild" onChange={funcIdChild} />
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className="input-block">
                            <label htmlFor="text" className="input-label">שם הילד</label>
                            <input required type="NameChild" name="NameChild" id="FirstName" onChange={funcName} />
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className="input-block">
                            <label htmlFor="email" className="input-label">מייל</label>
                            <input required type="email" name="email" id="email" onChange={funcEmail} />
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className="input-block">
                            <label htmlFor="number" className="input-label">טלפון</label>
                            <input required type="text" name="phone" id="phone" onChange={funcPhone} />
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className="input-block">
                            <label htmlFor="password" className="input-label">סיסמה</label>
                            <OutlinedInput className="custom-input"
                            name="password" id="password" onChange={funcPassword} 
                                type={showPassword ? 'text' : 'password'}
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

                        </div>
                    </Grid>
                </Grid>
                <br />
                <div className="input-block">
                    <Button className="search-button" variant="contained" onClick={() => signUp()}>
                        אישור
                    </Button>
                </div>
                {status2 && <div>There is a user with this email address.</div>}
                <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto auto', margin: '30px' }}>
                </div>
                {messagePassword && <div>{messagePassword}</div>}
                <div></div>
            </ThemeProvider>
        </div>

    );
}
