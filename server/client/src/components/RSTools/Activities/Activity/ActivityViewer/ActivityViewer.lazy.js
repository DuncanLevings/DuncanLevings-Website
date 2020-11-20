import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyActivityViewer = lazy(() => import('./ActivityViewer'));

const ActivityViewer = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyActivityViewer {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default ActivityViewer;
