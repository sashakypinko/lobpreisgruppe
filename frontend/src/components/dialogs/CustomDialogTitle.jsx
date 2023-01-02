import React from 'react';
import { Typography } from '@mui/material';

const CustomDialogTitle = ({ children }) => {
  if (!children) return null;

  return (
    <Typography
      variant="h1"
      component="h2"
      sx={{
        px: 3,
        pt: 2,
        borderBottom: '1px solid #cfcfcf',
        pb: '0.5em',
        mb: '0.5em',
      }}
    >
      {children}
    </Typography>
  );
};

export default CustomDialogTitle;
