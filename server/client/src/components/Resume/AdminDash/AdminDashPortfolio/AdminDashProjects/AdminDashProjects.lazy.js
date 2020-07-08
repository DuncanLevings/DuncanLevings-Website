import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyAdminDashProjects = lazy(() => import('./AdminDashProjects'));

const AdminDashProjects = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyAdminDashProjects {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default AdminDashProjects;
