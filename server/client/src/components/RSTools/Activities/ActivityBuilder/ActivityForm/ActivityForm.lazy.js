import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyActivityForm = lazy(() => import('./ActivityForm'));

const ActivityForm = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyActivityForm {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default ActivityForm;
