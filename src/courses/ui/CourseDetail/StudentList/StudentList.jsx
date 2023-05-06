import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Grid, FormControl, Typography, InputLabel, Select, Button, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useCreateStudent, useFetchStudents } from '../../../services/students';
import { FETCH_COURSE_KEY } from '../../../services/courses';

export const StudentList = (props) => {
  const [student, setStudent] = React.useState();
  const { handleSubmit } = useForm({ mode: 'onChange' });
  const { isFetching, error, data: students } = useFetchStudents();
  const queryClient = useQueryClient();
  const { mutateAsync } = useCreateStudent({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FETCH_COURSE_KEY] });
      Swal.fire('Registrado', 'Estudiante registrado con éxito', 'success');
    },
    onError: () => {
      Swal.fire('Error', 'No se pudo registrar al estudiante', 'error');
    },
  });

  const handleChange = (event) => {
    setStudent(event.target.value);
  };

  if (isFetching) {
    return <>Loading...</>;
  }

  if (error) {
    return <>An error has occurred: ${error.message}</>;
  }

  const onSubmit = () => {
    mutateAsync({ courseId: props.id, student });
  };

  return (
    <>
      <Typography variant="h5" sx={{ mb: 4, mt: 8 }}>
        Existing Students
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Choose Student</InputLabel>
            <Select
              defaultValue=""
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Choose Student"
              onChange={handleChange}
            >
              {students?.map((student) => (
                <MenuItem key={student.id} value={student}>
                  {student?.name} - {student?.email}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Grid item xs={12} sx={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Button type="submit" variant="contained">
              Add Student
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
