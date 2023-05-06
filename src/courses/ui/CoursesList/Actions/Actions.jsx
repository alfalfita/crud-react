import React from 'react';
import { Link } from 'react-router-dom';

export const Actions = ({ course }) => {
  const userData = JSON.parse(sessionStorage.getItem('userData'));

  if (course?.instructor == userData?.username) {
    return (
      <div>
        <Link to={'edit/' + course.id}>Editar</Link>
      </div>
    );
  }

  return <></>;
};
