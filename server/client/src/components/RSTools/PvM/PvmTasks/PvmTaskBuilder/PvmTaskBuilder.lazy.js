import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyPvmTaskBuilder = lazy(() => import('./PvmTaskBuilder'));

const PvmTaskBuilder = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyPvmTaskBuilder {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default PvmTaskBuilder;
