import {Avatar, Button, CssBaseline, TextField, Link, Grid, Box, LockOutlinedIcon, Typography, Container, createTheme, ThemeProvider} from '../components/Mui.js'
import React, {useState, useEffect} from 'react';
import Axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        React Project - Matheus
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function message(type, _message) {
  if (type === "Error") {
    return toast.error(_message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  } else {
    toast.success(_message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
}

// Definir tema posteriormente
const defaultTheme = createTheme();

export default function LoginForm() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
  useEffect(() => {
    // Checar se o token do usuario ainda é valido
    Axios.get('http://localhost:3001/api/user/logged', {
        params: { 
          user: cookies['user'],
          token: cookies['token']
        }
        }).then((response) => {
          if(response.data) {
            navigate('/central');
          } else {
            removeCookie('user');
            removeCookie('token');
          }
        })
  });

  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(formData.email.match(validRegex)) {
      Axios.post('http://localhost:3001/api/user/login', {
      data: formData,
      }).then((response) => {
        if(response.data === "Invalido") {
          message('Error', 'Usuario ou senha invalidos!');

          e.target[4].disabled = false;
        } else {
          message('Success', 'Logado com sucesso!');

          e.target[4].disabled = true;
          
          setTimeout(() => {
            const token = response.data['token'];
            const user = response.data['userName'];

            setCookie("token", token, { expires: 0});
            setCookie("user", user, { expires: 0});
            
            navigate('/central');
          }, 2000)
        }
      })
    } else {
      message('Error', 'Campo email em formato incorreto!');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              sx={{
                input: {
                  color:
                    !formData.email.match(validRegex) &&
                    formData.email.length >= 1
                      ? "red"
                      : "",
                },
              }}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueceu a senha?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Não tem uma conta? Registre-se"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}