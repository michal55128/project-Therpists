import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import '../Css/SignIn.css';
import NavBar from './NavBar';
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fetchPatient } from '../Redux/PatientSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getByPasswordPatient, getByPasswordTherpist, setPatient, setTherpist, setTypeUser } from '../Redux/LoginSlice';
import { IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import '../Css/Therpists.css';

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


export default function SignIn() {

  const nav = useNavigate();
  let refpass = React.useRef();
  let refmail = React.useRef();
  const dispatch = useDispatch();
  const statusPatient = useSelector((state) => state.patients.status);
  const patients = useSelector((state) => state.patients.patients);
  const patientsDetails = useSelector((state) => state.patients.details);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [showPassword, setShowPassword] = useState(false);

  const patient = useSelector((state) => state.login.patient);
  const therpist = useSelector((state) => state.login.therpist);
  const typeUser = useSelector((state) => state.login.typeUser);

  const handleSubmit = (event) => {
    event.preventDefault();
    debugger

    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
   
      debugger
      let pat=dispatch(getByPasswordPatient(data.get('password')))
      // dispatch(setTypeUser('patient'));
      // dispatch(setPatient(pat));
      console.log('suuuuu');
      console.log('type:',typeUser);
      console.log(dispatch(getByPasswordPatient(data.get('password'))));
      nav('/');
      if(pat==null){
    // }
    // else if(dispatch(getByPasswordTherpist(data.get('password')))!==null) {
      debugger
      let the=dispatch(getByPasswordTherpist(data.get('password')))
      // dispatch(setTherpist(the));
      // dispatch(setTypeUser('therpist'));
      console.log("noo");
      console.log('type:',typeUser);
      nav('/');
    }
    
    // }
    // else{
      alert('לא קייםםםם')
      console.log('type:',typeUser);

  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
};
  const fetchData = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
   
    const pat = await dispatch(getByPasswordPatient(data.get('password')));
    if (pat.payload !== null) {
      debugger
      // התחבר מטופל
      console.log("Logged in as a patient");
      nav('/');
    } else {
      const the = await dispatch(getByPasswordTherpist(data.get('password')));
      debugger
      if (the.payload !== null) {
        // התחבר מטפל
        console.log("Logged in as a therapist");
        nav('/');
      } else {
        // לא קיים מטופל או מטפל
        alert('User does not exist');
      }
    }
  };
  
  return (
    <div className='start'>

      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: '#15a399',
              '& form': {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 1,
              },

              '& .MuiTextField-root': {
                margin: 'normal',
                required: true,
                fullWidth: true,
              },

              '& .MuiFormControlLabel-root': {
                mt: 1,
              },


              '& .MuiButton-root': {
                mt: 3,
                mb: 2,
                bgcolor: '#15a399',
                color: '#fff',
              },

              '& .MuiGrid-container': {
                mt: 2,
              },


            }}

          >
            <Avatar sx={{ m: 1, bgcolor: '#15a399' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              התחברות          </Typography>
            {/* <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}> */}
            <Box component="form" onSubmit={fetchData} noValidate sx={{ mt: 1 }}>

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="כתובת מייל"
                name="email"
                autoComplete="email"
                ref={refmail}
                autoFocus
                style={{
                  '& .MuiOutlinedInput-input:focus': {
                    borderColor: '#15a399',
                    MuiTextField: {
                      styleOverrides: {
                        root: {
                          marginBottom: '16px',
                          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: "red",
                          },
                        },
                      },
                    },
                  },
                }}
              />

              <TextField

                margin="normal"
                required
                fullWidth
                name="password"
                label="סיסמה"
                type={showPassword ? 'text' : 'password'}
                // type="password"
                id="password"
                autoComplete="current-password"
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
            
              />
              
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="זכור אותי"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3, mb: 2, bgcolor: '#49cc90',
                  '&:hover': {
                    bgcolor: '#f2a421',
                  },
                }}
              // onClick={signinPatient}
              >
                התחברות
              </Button>
              {/* <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3, mb: 2, bgcolor: '#49cc90',
                  '&:hover': {
                    bgcolor: '#f2a421',
                  },
                }}
                onClick={()=>nav('HomePage')}
              >
                מטפל ? לחץ כאן
              </Button> */}
              <Grid container>
                <Grid item xs>
                  {/* <Link href="SignUp" variant="body2"
                    sx={{
                      color: '#15a399',
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',

                      },
                    }}>
                    Forgot password?
                  </Link> */}
                </Grid>
                <Grid item>
                  <Link href="SignUpPatient" variant="body2"
                    sx={{
                      color: '#15a399',
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                        cursor: 'pointer'
                      },
                    }}>
                    {"איך לך חשבון? ליצירת חשבון חדש"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </Container>
      </ThemeProvider>
    </div>
  );
}















