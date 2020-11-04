import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyVisNemi = lazy(() => import('./VisNemi'));

const VisNemi = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyVisNemi {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default VisNemi;
