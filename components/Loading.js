import { CircularProgress } from '@mui/material';
import React from 'react';

export default function Loading() {
  return (
    <div className="text-center mt-5">
      <CircularProgress />
    </div>
  );
}
