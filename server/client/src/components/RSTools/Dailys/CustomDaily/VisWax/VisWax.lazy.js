import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyVisWax = lazy(() => import('./VisWax'));

const VisWax = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyVisWax {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default VisWax;
