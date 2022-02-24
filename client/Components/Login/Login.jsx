import React, {useState, useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import { Link as RouteLink, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GoogleLogin } from 'react-google-login';
import { useSelector, useDispatch } from 'react-redux';
import { loginThunk } from '../../store/users-slice';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.youtube.com/watch?v=mbv2DhcKAh4">
      WWF: World Wobbegong Federation
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const responseGoogle = (response) => {
  console.log(response);
};

const theme = createTheme();

function login() {
  const dispatch = useDispatch();
  const {loggedIn, username} = useSelector((state) => state.users);

  const [usernameText, setUsernameText] = useState('');
  const [passwordText, setPasswordText] = useState('');

  const navigate = useNavigate();
  useEffect(()=>{
    console.log('navigating!');
    if(loggedIn) {
      navigate('/home');
    }
  },[loggedIn]);

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(loginThunk({
      username: usernameText,
      password: passwordText
    }));
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img style={{height:'250px', width:'250px'}} src={'https://preview.redd.it/rk4v1qcbiqz41.png?width=500&format=png&auto=webp&s=16dc5860b7979f866385d7904fbb4a2be70c50ea'} />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form"  noValidate sx={{ mt: 1 }}
            onSubmit={handleSubmit}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="Username"
              label="Username"
              name="Username"
              autoComplete="Username"
              autoFocus
              onChange={e=>setUsernameText(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e=>setPasswordText(e.target.value)}
            />
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />

              <GoogleLogin
                clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                buttonText="Sign in with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
              />
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <RouteLink to="/signup" style={{color: '#1976d2' }}>
                  {'Don\'t have an account? Sign Up'}
                </RouteLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}


export default login;

