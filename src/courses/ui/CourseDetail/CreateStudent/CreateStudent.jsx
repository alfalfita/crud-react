import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Container, Typography, TextField } from '@mui/material';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

import { useCreateStudent } from '../../../services/students';
import { FETCH_COURSE_KEY } from '../../../services/courses';

export const CreateStudent = (props) => {
  const { register, handleSubmit, formState } = useForm({ mode: 'onChange' });
  const errors = formState.errors;
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useCreateStudent({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FETCH_COURSE_KEY] });
      Swal.fire('Registrado', 'Estudiante registrado con éxito', 'success');
    },
    onError: () => {
      Swal.fire('Error', 'No se pudo registrar al estudiante', 'error');
    },
  });

  const onSubmit = (studentFrm) => {
    mutateAsync({ courseId: props.id, student: studentFrm });
  };

  return (
    <>
      <Typography variant="h5" sx={{ mb: 1, mt: 8 }}>
        Add Students to Course
      </Typography>
      <Container maxWidth="md">
        <Typography variant="h6" sx={{ mb: 2 }}>
          New Student
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md">
          <TextField
            {...register('name', { required: true })}
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            error={Boolean(errors.name)}
            helperText={errors.name?.type === 'required' ? 'This field is required' : 'Invalid name'}
          />

          <TextField
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            error={Boolean(errors.email)}
            helperText={errors.email?.type === 'required' ? 'This field is required' : 'Invalid email address'}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth className="mt-4" disabled={isLoading}>
            Add Student
          </Button>
        </form>
      </Container>
    </>
  );
};
