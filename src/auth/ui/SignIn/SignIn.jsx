import React from 'react';
import { useForm } from 'react-hook-form';
import { Container, TextField, Button, AppBar, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useLogin } from '../../services/auth';

export const SignIn = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm();
  const errors = formState.errors;
  const { mutateAsync: login, isLoading } = useLogin({
    onSuccess: (res) => {
      const token = res.data.token;
      const userName = res.data.username;

      sessionStorage.setItem(
        'login',
        JSON.stringify({
          isAuth: true,
        }),
      );
      sessionStorage.setItem('username', userName);
      sessionStorage.setItem('token', `Bearer ${token}`);

      navigate('/app');
    },
    onError: (error) => {
      if (error.response?.status == 401) {
        Swal.fire('Error Login', 'Username o password invalidos', 'error');
      } else if (error.response?.status == 403) {
        Swal.fire('Error Login', 'No tiene acceso al recurso o permisos!', 'error');
      }

      Swal.fire('Ups', 'Algo salió mal, vuelve a intentar.', 'error');
    },
  });

  const onSubmit = (data) => {
    if (!data) {
      Swal.fire('Error de validacion', 'Username y password requeridos', 'error');

      return;
    }
    login(data);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#1DA1F2', marginBottom: '2rem' }}>
        <Toolbar>
          <Button color="inherit" href="/register">
            Register new user
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Course Plattform - Instructors
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md">
          <TextField
            {...register('username', { required: true, pattern: /^\S+@\S+$/i })}
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            error={Boolean(errors.username)}
            helperText={errors.username?.type === 'required' ? 'This field is required' : 'Invalid email address'}
          />

          <TextField
            {...register('password', { required: true, minLength: 6 })}
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            error={Boolean(errors.password)}
            helperText={
              errors.password?.type === 'required'
                ? 'This field is required'
                : 'Password must be at least 8 characters long'
            }
          />

          <Button type="submit" variant="contained" color="primary" fullWidth className="mt-4" disabled={isLoading}>
            Login
          </Button>
        </form>
      </Container>
    </>
  );
};
