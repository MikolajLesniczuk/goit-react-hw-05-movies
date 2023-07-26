import { Navigate } from 'components/navigate';
import React from 'react';
import { Outlet } from 'react-router-dom';

export const CommonLayout = () => {
  return (
    <div>
      <Navigate />

      <Outlet />
    </div>
  );
};
