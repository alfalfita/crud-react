import React from 'react';
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';

import { SignIn } from './auth/ui/SignIn';
import { SignUp } from './auth/ui/SignUp';
import { CoursesList } from './courses/ui/CoursesList';
import { Layout } from './courses/ui/Layout';
import { CreateCourse } from './courses/ui/CreateCourse';
import { EditCourse } from './courses/ui/EditCourse';
import { CourseDetail } from './courses/ui/CourseDetail';

const authenticatedLoader = async () => {
  return redirect('/login');
};

const router = createBrowserRouter([
  {
    path: '/',
    loader: authenticatedLoader,
  },
  {
    path: '/login',
    element: <SignIn />,
  },
  {
    path: '/register',
    element: <SignUp />,
  },
  {
    path: '/app',
    element: <Layout />,
    // loader: authenticatedLoader,
    children: [
      {
        path: '',
        element: <CoursesList />,
      },
      {
        path: 'create',
        element: <CreateCourse />,
      },
      {
        path: 'edit/:courseId',
        element: <EditCourse />,
      },
      {
        path: 'detail/:courseId',
        element: <CourseDetail />,
      },
    ],
  },
]);

export const Routing = () => {
  return <RouterProvider router={router} />;
};
