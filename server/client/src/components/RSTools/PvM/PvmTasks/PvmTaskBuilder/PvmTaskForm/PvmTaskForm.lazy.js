import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyPvmTaskForm = lazy(() => import('./PvmTaskForm'));

const PvmTaskForm = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyPvmTaskForm {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default PvmTaskForm;
