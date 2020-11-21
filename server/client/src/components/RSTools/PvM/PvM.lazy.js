import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyPvM = lazy(() => import('./PvM'));

const PvM = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyPvM {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default PvM;
