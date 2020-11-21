import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyPvmTasks = lazy(() => import('./PvmTasks'));

const PvmTasks = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyPvmTasks {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default PvmTasks;
