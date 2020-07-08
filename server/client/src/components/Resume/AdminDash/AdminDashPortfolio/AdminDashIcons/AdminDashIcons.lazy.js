import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyAdminDashIcons = lazy(() => import('./AdminDashIcons'));

const AdminDashIcons = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyAdminDashIcons {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default AdminDashIcons;
