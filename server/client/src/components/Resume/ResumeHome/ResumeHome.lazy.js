import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyResumeHome = lazy(() => import('./ResumeHome'));

const ResumeHome = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyResumeHome {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default ResumeHome;
