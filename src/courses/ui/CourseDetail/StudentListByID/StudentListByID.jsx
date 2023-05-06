import React from 'react';
import { CardContent, Typography } from '@mui/material';

export const StudentListByID = (props) => {
  return (
    <>
      <Typography variant="h5" sx={{ mb: 1, mt: 4 }}>
        Students
      </Typography>

      <CardContent>
        {props?.students?.map((student) => (
          <div key={student.id}>
            <Typography variant="h7" sx={{ mb: 2 }}>
              {student?.name} - {student?.email}
            </Typography>
            <br />
          </div>
        ))}
      </CardContent>
    </>
  );
};
