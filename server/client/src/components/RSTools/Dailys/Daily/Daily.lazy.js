import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyDaily = lazy(() => import('./Daily'));

const Daily = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyDaily {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default Daily;
