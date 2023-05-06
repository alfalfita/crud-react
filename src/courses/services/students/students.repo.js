import axios from 'axios';

export const fetchStudents = () => {
  return axios
    .get(`${import.meta.env.VITE_API_BASE_URL}/api/student/listAll`, {
      headers: {
        Authorization: sessionStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.data);
};

export const createStudent = (courseId, student) => {
  return axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/course/${courseId}/addStudent`, student, {
    headers: {
      Authorization: sessionStorage.getItem('token'),
      'Content-Type': 'application/json',
    },
  });
};
