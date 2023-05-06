import { useMutation, useQuery } from '@tanstack/react-query';
import { createStudent, fetchStudents } from './students.repo';

export const useCreateStudent = (opts) => {
  return useMutation({
    mutationFn: ({ courseId, student }) => createStudent(courseId, student),
    ...opts,
  });
};

export const useFetchStudents = (opts) => {
  return useQuery({
    queryKey: ['fetchStudents'],
    queryFn: fetchStudents,
    ...opts,
  });
};
