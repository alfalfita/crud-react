import React from 'react';
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { Actions } from './Actions';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { useFetchCourses } from '../../services/courses';

export const CoursesList = () => {
  const { error, data: courses, isFetching } = useFetchCourses();

  if (isFetching) {
    return <>Loading...</>;
  }

  if (error) {
    return <>An error has occurred: ${error.message}</>;
  }

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Course Schedule
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: 'rgba(29, 161, 242, 0.1)' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: 'rgba(29, 161, 242, 1)' }}>Class Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'rgba(29, 161, 242, 1)' }}>Instructor</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'rgba(29, 161, 242, 1)' }}>Weekday</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'rgba(29, 161, 242, 1)' }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'rgba(29, 161, 242, 1)' }}>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses?.map((course) => (
              <TableRow key={course.id}>
                <TableCell component="th" scope="row">
                  <Link to={'detail/' + course.id} state={{ course }}>
                    {' '}
                    {course.name}
                  </Link>
                  <Actions course={course} />
                </TableCell>
                <TableCell>{course.username}</TableCell>
                <TableCell>{course.weekday}</TableCell>
                <TableCell>${course.price}</TableCell>
                <TableCell>{course.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ margin: '2rem 0 2rem 0', display: 'flex', justifyContent: 'end' }}>
        <Button variant="contained" color="primary" href="/app/create">
          + new course
        </Button>
      </Box>
    </>
  );
};
