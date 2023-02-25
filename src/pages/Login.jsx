import { Typography, CssBaseline, Box, Paper, TextField, Button, Link, FormControlLabel, InputAdornment,  Switch, IconButton } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import logo from '../assets/aniime.png';
import shanks from '../assets/shanks.png';
import { useState } from "react";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import "./css/Login.css"
import { Helmet } from 'react-helmet'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from '../firebase';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#bd284d'
    }
  },
  typography: {
    fontFamily: 'Source Sans Pro',
  },
  components: {
    MuiInputLabel: {
      defaultProps: {
        sx: {
          fontSize: "1rem",
        },
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        sx: {
          fontSize: "1.2rem",
        },
      },
    },
  }
});

function Login() {
  const paperStyle = {padding: 40, height: 450, width: 400, margin: 'auto'}
  const linkStyle = {"&:hover": {color: "white"}, fontSize: '1.1rem'}
  const auth = getAuth(app);

  const [values, setValues] = useState({
    email:"",
    pass:"",
    showPass: false
  });

  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  let navigate = useNavigate()
  
  const handlePassVisibility = () => {
    setValues({
      ...values,
      showPass: !values.showPass
    });
  };

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
      navigate('/home')

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode)
    });
  }

  return (
    <>
      <CssBaseline/>
      <Helmet>
        <title>Login - Aniime</title>
      </Helmet>
      <ThemeProvider theme={theme}>
        <main className="context">
            <Paper elevation={2} style={paperStyle} sx={{boxShadow: 20, borderRadius: 3, minWidth: 400, maxHeight: 450, alignItems: 'center'}}>
              <Box
                component="img"
                onClick={() => navigate('/home')}
                sx={{
                  cursor: 'pointer',
                  width: 140,
                  height: 'auto',
                  mb: 1
                }}
                alt="Aniime"
                src={logo}
              />
              <TextField type="email" id="email-field" label="@ Email" variant="outlined" size='small' fullWidth sx={{pb: 2, fontSize: '1.5rem'}} value={email} onChange={(e) => setEmail(e.target.value)} />
              <TextField type={values.showPass ? "text" : "password"} id="password-field" label="🔒 Password" variant="outlined" size='small' value={password} fullWidth onChange={(e) => setPassword(e.target.value)} sx={{pb: 1}} InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handlePassVisibility} aria-label='toggle hidden' edge='end'>
                      {values.showPass ? (
                        <VisibilityOff fontSize='small'/>
                      ) : (
                        <Visibility fontSize='small'/>
                      )}
                    </IconButton>
                  </InputAdornment>
                )
              }} />
              <FormControlLabel
              control={<Switch size='small' sx={{mx: 1, fontSize: '1rem'}} />}
              label="Remember me"
              />
              <Button variant="text" sx={{m:0, p:0, fontSize: '1rem'}}>Forgot password?</Button>
              <Button variant="contained" onClick={signIn} fullWidth sx={{bgcolor: "#bd284d", mt: 2, fontSize: '1rem'}}>Sign in</Button>
              <Typography fontSize={14} align='center' sx={{mt: 2, fontSize: '1.1rem'}}>Don't have an account? <Link to="/signup" underline='none' component={RouterLink} sx={linkStyle}>Sign up</Link> </Typography>
              <Box
                component='img'
                align='center'
                sx={{
                  height: '100px',
                  pl: 15,
                }}
                alt='Shanks'
                src={shanks} />
            </Paper>
        </main>

        {/*This is the background*/}    
        <div className="area" >
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>

      </ThemeProvider>
    </>
  )
}

export default Login
