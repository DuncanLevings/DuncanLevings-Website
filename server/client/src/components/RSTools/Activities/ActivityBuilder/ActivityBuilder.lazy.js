import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyActivityBuilder = lazy(() => import('./ActivityBuilder'));

const ActivityBuilder = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyActivityBuilder {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default ActivityBuilder;
