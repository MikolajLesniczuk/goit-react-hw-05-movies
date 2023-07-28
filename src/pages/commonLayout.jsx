import { Navigate } from 'components/navigate';
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const CommonLayout = () => {
  return (
    <div>
      <Navigate />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};
export default CommonLayout;
