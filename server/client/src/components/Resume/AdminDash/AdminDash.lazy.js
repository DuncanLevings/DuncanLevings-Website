import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyResumeAdminDash = lazy(() => import('./AdminDash'));

const ResumeAdminDash = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyResumeAdminDash {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default ResumeAdminDash;
