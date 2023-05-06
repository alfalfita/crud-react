import { useMutation, useQuery } from '@tanstack/react-query';

import { createCourse, deleteCourse, editCourse, fetchCourse, fetchCourses } from './courses.repo';

export const useFetchCourses = (opts) => {
  return useQuery({
    queryKey: ['fetchCourses'],
    queryFn: fetchCourses,
    ...opts,
  });
};
export const FETCH_COURSE_KEY = 'fetchCourse';
export const useFetchCourse = (courseId, opts) => {
  return useQuery({
    queryKey: [FETCH_COURSE_KEY, courseId],
    queryFn: fetchCourse,
    ...opts,
  });
};

export const useCreateCourse = (opts) => {
  return useMutation({
    mutationFn: (course) => createCourse(course),
    ...opts,
  });
};

export const useDeleteCourse = (opts) => {
  return useMutation({
    mutationFn: (course) => deleteCourse(course),
    ...opts,
  });
};

export const useEditCourse = (opts) => {
  return useMutation({
    mutationFn: (course) => editCourse(course),
    ...opts,
  });
};
