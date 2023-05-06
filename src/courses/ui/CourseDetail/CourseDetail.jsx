import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useParams, useLocation } from 'react-router-dom';

import { CreateStudent } from './CreateStudent';
import { StudentListByID } from './StudentListByID';
import { StudentList } from './StudentList';
import { useFetchCourse } from '../../services/courses';

export const CourseDetail = () => {
  const { courseId } = useParams();
  const { state } = useLocation();

  const {
    isFetching,
    error,
    data: course,
  } = useFetchCourse(courseId, {
    enabled: !!courseId,
  });

  if (isFetching) {
    return <>Loading...</>;
  }

  if (error) {
    return <>An error has occurred: ${error.message}</>;
  }

  return (
    <Card sx={{ maxWidth: 500, margin: 'auto', mb: 4, pb: 4, px: 2 }}>
      <CardContent>
        <Typography variant="p" sx={{ mb: 2 }}>
          <strong>Course:</strong> {course?.name} with {state.name || '--'}
        </Typography>

        <Typography variant="p" sx={{ display: 'block' }}>
          <strong>Day:</strong> {course.weekday || '-'}
        </Typography>
        <Typography variant="p" sx={{ display: 'block' }}>
          <strong>Cost:</strong> {course.price || '-'}
        </Typography>
        <Typography variant="p" sx={{ display: 'block' }}>
          <strong>Time:</strong> {course.time || '-'}
        </Typography>
        <Typography variant="p" sx={{ display: 'block' }}>
          <strong>Description:</strong> {course.description || '-'}
        </Typography>
      </CardContent>

      <StudentListByID id={courseId} students={course.students} />
      <CreateStudent id={courseId} />
      <StudentList id={courseId} />
    </Card>
  );
};
