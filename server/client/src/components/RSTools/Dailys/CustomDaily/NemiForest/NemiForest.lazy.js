import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyNemiForest = lazy(() => import('./NemiForest'));

const NemiForest = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyNemiForest {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default NemiForest;
