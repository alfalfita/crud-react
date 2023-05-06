import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import {
  OutlinedInput,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  TextField,
  Button,
  Grid,
  TextareaAutosize,
} from '@mui/material';
import Swal from 'sweetalert2';
import { useCreateCourse } from '../../services/courses';

export const CreateCourse = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutateAsync } = useCreateCourse({
    onSuccess: () => {
      Swal.fire('Agregado', 'Curso agregado con éxito', 'success');
    },
    onError: () => {
      Swal.fire('Error', 'No se pudo registrar', 'error');
    },
  });

  const onSubmit = (courseForm) => {
    const reqCourse = {
      ...courseForm,
      username: JSON.parse(sessionStorage.getItem('userData')).firstName,
      instructor: JSON.parse(sessionStorage.getItem('userData')).username,
      isOwner: true,
    };

    mutateAsync(reqCourse);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" component="h1" sx={{ mb: 3 }}>
        Create a Course
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                fullWidth
                required
                error={Boolean(errors.firstName)}
                helperText={errors.firstName?.type === 'required' ? 'This field is required' : 'Invalid course name'}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <FormControl fullWidth variant="outlined" sx={{ mb: 3 }} error={Boolean(errors.weekday)}>
            <InputLabel id="weekdayLabel">Day of Week</InputLabel>
            <Select defaultValue="" {...register('weekday')} labelId="weekdayLabel" label="Day of Week">
              <MenuItem value="monday">Monday</MenuItem>
              <MenuItem value="tuesday">Tuesday</MenuItem>
              <MenuItem value="wednesday">Wednesday</MenuItem>
              <MenuItem value="thursday">Thursday</MenuItem>
              <MenuItem value="friday">Friday</MenuItem>
              <MenuItem value="saturday">Saturday</MenuItem>
              <MenuItem value="sunday">Sunday</MenuItem>
            </Select>
            {errors.weekday && (
              <Typography variant="caption" color="red" sx={{ mt: 1 }}>
                {errors.weekday.message}
              </Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              {...register('price')}
              id="outlined-adornment-amount"
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Amounts"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <TextField
            fullWidth
            {...register('time')}
            label="Time"
            variant="outlined"
            type="time"
            sx={{ mb: 3 }}
            inputProps={{
              step: 300,
            }}
            error={Boolean(errors.time)}
          />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextareaAutosize
                {...field}
                aria-label="Description"
                placeholder="description"
                minRows={3}
                maxRows={10}
                style={{ width: '100%' }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Button type="submit" variant="contained">
            Submit
          </Button>
          <Button variant="contained" href="/app">
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
