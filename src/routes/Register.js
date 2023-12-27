import React, { useState, useRef} from 'react';
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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/pt-br';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/mateteus313">
        React Project - Matheus
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// Definir tema posteriormente
const defaultTheme = createTheme();

function message(type, _message) {
  if (type === "Error") {
    return toast.error(_message, {
      position: "top-center",
      autoClose: 3000,
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

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    birthDate: [],
    phone: [],
    address: "",
    zipCode: [],
    password: ""
  });

  const navigate = useNavigate();
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const timerRef = useRef(null);
  const redirect = () => {
    timerRef.current = setTimeout(() => navigate('/login'), 3500);
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let status = false;

    // Previne que existam campos nulos
    Object.keys(formData).forEach(key => {
      if (formData[key] === '' || formData[key].length === 0) {
        message('Error', `Campo em falta:${key}`);

        return status = false;
      }
      status = true
    })

    if(!formData.email.match(validRegex)) {
      message('Error', 'Campo email em formato incorreto');

      return status = false;
    }

    if (status) {
      Axios.get('http://localhost:3001/api/user', {
        params: { email: formData.email },
      }).then((response) => {
        if (response.data === 'Nao localizado') {
          Axios.post('http://localhost:3001/api/user', {
            data: formData,
          }).then((response) => {
            if(response.data === 'Inserido')         
            message('Success', 'Cadastrado com sucesso!');

            redirect();
          })
        } else {
          message('Error', 'Já existe uma conta com este email cadastrado, faça login!')
        }
      })
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
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrar-se
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="firstName"
                  label="Nome"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
                  <DatePicker
                    label="Nascimento"
                    name="birthDate"
                    onChange={e => {
                      formData.birthDate = `${e.$y}-${e.$M+1}-${e.$D}`
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Telefone"
                  name="phone"
                  autoComplete="phone"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="zipcode"
                  label="CEP"
                  name="zipCode"
                  autoComplete="zipcode"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Endereço"
                  name="address"
                  autoComplete="address"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField sx={{ input: { color: (!formData.email.match(validRegex) && formData.email.length >= 1) ? 'red' : ''}}}
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Desejo receber mensagens a respeito da minha conta por email."
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Ja possui uma conta? Faça login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      <div className='redirect'></div>
    </ThemeProvider>
  );
}