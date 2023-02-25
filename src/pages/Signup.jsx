import { Typography, CssBaseline, Box, Paper, Button, Link, InputAdornment, OutlinedInput } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Person, AlternateEmail, Lock, EnhancedEncryption} from '@mui/icons-material'
import React, { useState } from "react";
import { Link as RouterLink, useNavigate} from 'react-router-dom';
import logo from '../assets/aniime.png';
import "./css/Login.css"
import { Helmet } from 'react-helmet'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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

const Signup = () => {
  const paperStyle = {padding: 40, height: 450, width: 400, margin: 'auto'}
  const linkStyle = {"&:hover": {color: "white"}, fontSize: '1.1rem'}

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  let navigate = useNavigate()
  const auth = getAuth(app);


  
  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        alert(`Account successfully created`)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        alert(errorCode)
        // ..
      });
  }

  const confirmPassHandler = (e) => {
    setConfirmPassword(e.target.value)
  }

  // 👇 Checking if passwords match before account creation
  const checkPasswordMatch = () => {
    password == confirmPassword ? signUp() : alert("Passwords do not match")
  }

  return (
    <>
      <CssBaseline/>
      <Helmet>
        <title>Register - Aniime</title>
      </Helmet>
      <ThemeProvider theme={theme}>
        <main className='context'>
          <Paper elevation={2} style={paperStyle} sx={{boxShadow: 20, borderRadius: 3, minWidth: 400, maxHeight: 450, alignItems: 'center'}}>
            <Box
              component="img"
              onClick={() => navigate('/home')}
              sx={{
                width: 140,
                height: 'auto',
                mb: 1,
                cursor: 'pointer'
              }}
              alt="Aniime"
              src={logo}/>
              <OutlinedInput type="text" id="username-field" placeholder="Username" sx={{
                mb:2, 
                height: '45px', 
                width: '320px', 
                fontSize: '1.1rem'}} 
                startAdornment={<InputAdornment position="start"> <Person/> </InputAdornment>}
                />
              <OutlinedInput 
                type="email" 
                id="email-field" 
                placeholder="Email" 
                onChange={(e) => setEmail(e.target.value)} 
                value={email} sx={{mb:2, height: '45px', width: '320px', fontSize: '1.1rem'}} 
                startAdornment={<InputAdornment position="start"> <AlternateEmail/> </InputAdornment>}
                />
              <OutlinedInput 
              type="password" 
              id="pass-field" 
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)} 
              value={password} 
              sx={{mb:2, height: '45px', width: '320px', fontSize: '1.1rem'}} 
              startAdornment={<InputAdornment position="start"> <Lock color="warning" /> </InputAdornment>}/>
              <OutlinedInput type="password" id="confirm-pass-field" placeholder="Confirm password" onChange={confirmPassHandler} sx={{mb:2, height: '45px', width: '320px', fontSize: '1.1rem'}} startAdornment={<InputAdornment position="start"> <EnhancedEncryption color='warning' /> </InputAdornment>}/>
              <Button variant="contained" type='button' onClick={checkPasswordMatch} fullWidth sx={{bgcolor: "#bd284d", mt: 2, fontSize: '1rem'}}>Sign up</Button>
              <Typography fontSize={14} align='center' sx={{mt: 2, fontSize: '1.1rem'}}>Already have an account? <Link to="/" underline='none' component={RouterLink} sx={linkStyle}>Login</Link> </Typography>
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

export default Signup