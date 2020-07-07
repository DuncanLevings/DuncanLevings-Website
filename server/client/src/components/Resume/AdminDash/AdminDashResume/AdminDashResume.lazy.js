import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyAdminDashResume = lazy(() => import('./AdminDashResume'));

const AdminDashResume = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyAdminDashResume {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default AdminDashResume;
