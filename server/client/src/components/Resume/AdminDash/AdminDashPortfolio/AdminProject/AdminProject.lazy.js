import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyAdminProject = lazy(() => import('./AdminProject'));

const AdminProject = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyAdminProject {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default AdminProject;
