import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyPvmTaskViewer = lazy(() => import('./PvmTaskViewer'));

const PvmTaskViewer = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyPvmTaskViewer {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default PvmTaskViewer;
