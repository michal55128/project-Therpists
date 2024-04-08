import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
    palette: {
        pink1: {
            main: '#741b47ff', // Specify your primary color
        },
        pink2: {
            main: '#A6055D', // Specify your primary color
        },
        pink3: {
            main: '#D911A4', // Specify your secondary color
        },
        brown1: {
            main: '#8C4C3E', // Specify your secondary color
        },
        brown2: {
            main: '#D9863D', // Specify your secondary color
        },
        brown3: {
            main: '#F2B680', // Specify your secondary color
        },
        primary: {
            main: '#f2a421',
            light: '#833761',
            dark: '#740341',
        },
        white: {
            main: 'white'
        }

    },
    components: {
        MuiTypography: {
            styleOverrides: {
                h1: {
                    fontSize: '24px',
                    fontWeight: 'bold',
                    marginBottom: '16px',
                    color: 'white',
                }
            },
        },
        MuiInput:{
            styleOverrides: {
                root: {
                    marginBottom: '16px',
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: "primary",
                        background:"#fad4e738"
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'pink',
                    },
                    height: '50px',
                    backgroundColor: 'transparent',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    marginBottom: '16px',
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: "#4c0200",
                        background:"#fad4e738"
                    },
                },
            },
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    direction: 'rtl',
                  
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    marginBottom: "10px",
                }
            }
        },
        MuiAvatar:{
            styleOverrides:{
                root:{
                    background:'#4c0200'
                }
            }
        },
        MuiFormControl:{
            styleOverrides:{
                root:{
                    width:'100%'
                }
            }
        }
    },
    typography: {
        fontFamily: 'assistant, sans-serif ',
    },
});
export default theme;


