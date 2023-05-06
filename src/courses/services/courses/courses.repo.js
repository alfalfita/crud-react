import axios from 'axios';

export const fetchCourses = () => {
  return axios
    .get(`${import.meta.env.VITE_API_BASE_URL}/api/course/listAll`, {
      headers: {
        Authorization: sessionStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.data);
};

export const fetchCourse = (courseId) => {
  return axios
    .get(`${import.meta.env.VITE_API_BASE_URL}/api/course/get/${courseId.queryKey[1]}`, {
      headers: {
        Authorization: sessionStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.data);
};

export const createCourse = (course) => {
  const user = JSON.parse(sessionStorage.getItem('userData'));
  return axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/user/${user.id}/addCourse`, course, {
    headers: {
      Authorization: sessionStorage.getItem('token'),
      'Content-Type': 'application/json',
    },
  });
};

export const deleteCourse = (course) => {
  return axios.put(
    `${import.meta.env.VITE_API_BASE_URL}/api/user/${JSON.parse(sessionStorage.getItem('userData')).id}/removeCourse`,
    course,
    {
      headers: {
        Authorization: sessionStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    },
  );
};

export const editCourse = (course) => {
  return axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/course/update/${course.id}`, course, {
    headers: {
      Authorization: sessionStorage.getItem('token'),
      'Content-Type': 'application/json',
    },
  });
};
