import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyActivities = lazy(() => import('./Activities'));

const Activities = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyActivities {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default Activities;
