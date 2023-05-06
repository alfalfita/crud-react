import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
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
import { useDeleteCourse, useEditCourse, useFetchCourse } from '../../services/courses';

export const EditCourse = () => {
  const { register, control, handleSubmit, formState, setValue } = useForm({ mode: 'onChange' });
  const errors = formState.errors;
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { mutateAsync: editCourse, isLoading: isEditing } = useEditCourse({
    onSuccess: (res) => {
      if (res.status == 201) {
        Swal.fire('Curso actualizado', 'Curso editado con éxito', 'success');
        navigate('/app');
      } else if (res.status == 401) {
        // logout();
      }
    },
    onError: () => {
      Swal.fire('Error', 'No se pudo actualizar', 'error');
    },
  });
  const { mutateAsync: deleteCourse, isLoading: isDeleting } = useDeleteCourse({
    onSuccess: (res) => {
      if (res.status == 201) {
        Swal.fire('Curso eliminado', 'Curso eliminado con éxito', 'success');
        navigate('/app');
      } else if (res.status == 401) {
        // logout();
      }
    },
    onError: () => {
      Swal.fire('Error', 'No se pudo eliminar', 'error');
    },
  });
  const {
    isFetching,
    error,
    data: course,
  } = useFetchCourse(courseId, {
    enabled: !!courseId,
  });

  const handlerDelete = () => {
    deleteCourse(course);
  };

  const edit = (course) => {
    const reqCourse = {
      id: courseId,
      ...course,
    };
    editCourse(reqCourse);
  };

  const onSubmit = (courseForm) => {
    edit(courseForm);
  };

  useEffect(() => {
    if (course) {
      console.log(22, course);
      setValue('name', course.name);
      setValue('weekday', course.weekday);
      setValue('weekday', 'monday');
      setValue('price', course.price);
      setValue('time', course.time);
      setValue('description', course.description);
    }
  }, [course, setValue]);

  if (isFetching) {
    return <>Loading...</>;
  }

  if (error) {
    return <>An error has occurred: ${error.message}</>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" component="h1" sx={{ mb: 3 }}>
        Course name: {course.name || '-'}
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
                {...register('name', { required: true })}
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
            <Select {...register('weekday')} labelId="weekdayLabel" label="Day of Week">
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
              step: 300, // 5 min
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
        <Grid item xs={12} sx={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '2rem' }}>
          <Button color="inherit" disabled={isDeleting} onClick={handlerDelete}>
            Delete
          </Button>
          <Button type="submit" variant="contained" disabled={isEditing}>
            Submit
          </Button>
          <Button variant="contained" href="/app" disabled={isEditing}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
