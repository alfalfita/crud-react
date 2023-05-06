import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Container, TextField, Button, AppBar, Toolbar } from '@mui/material';
import Swal from 'sweetalert2';
import { useCreateUser } from '../../services/auth';

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { mutateAsync: createUser, isLoading } = useCreateUser({
    onSuccess: () => {
      Swal.fire('Registrado', 'Usuario registrado con éxito', 'success');
      navigate('/login');
    },
    onError: () => {
      Swal.fire('Error', 'No se pudo registrar al usuario', 'error');
    },
  });

  const onSubmit = (data) => {
    createUser(data);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#1DA1F2', marginBottom: '2rem' }}>
        <Toolbar>
          <Button color="inherit" href="/login">
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md">
          <TextField
            {...register('firstName', { required: true })}
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            error={Boolean(errors.firstName)}
            helperText={errors.firstName?.type === 'required' ? 'This field is required' : 'Invalid first name'}
          />

          <TextField
            {...register('lastName', { required: true })}
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            error={Boolean(errors.lastName)}
            helperText={errors.lastName?.type === 'required' ? 'This field is required' : 'Invalid last name'}
          />

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
                : 'Password must be at least 6 characters long'
            }
          />

          <TextField
            {...register('rePwd', { required: true, validate: (value) => value === watch('password') })}
            label="Confirm Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            error={Boolean(errors.rePwd)}
            helperText={errors.rePwd?.type === 'required' ? 'This field is required' : 'Passwords do not match'}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth className="mt-4" disabled={isLoading}>
            Register
          </Button>
        </form>
      </Container>
    </>
  );
};
